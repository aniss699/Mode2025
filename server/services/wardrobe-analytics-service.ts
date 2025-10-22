
import { db } from '../db';
import { wardrobeItems, outfits, users } from '../../shared/schema';
import { eq, sql, and, gte } from 'drizzle-orm';

export interface WardrobeStats {
  totalItems: number;
  totalValue: number;
  averageItemValue: number;
  itemsByCategory: Record<string, number>;
  itemsByColor: Record<string, number>;
  itemsByBrand: Record<string, number>;
  itemsBySeason: Record<string, number>;
  mostUsedItems: Array<{ id: number; name: string; timesUsed: number }>;
  leastUsedItems: Array<{ id: number; name: string; timesUsed: number }>;
  costPerWear: Array<{ id: number; name: string; cost: number }>;
}

export interface EngagementStats {
  totalLikes: number;
  totalComments: number;
  totalViews: number;
  mostLikedOutfit: any;
  engagementRate: number;
  followerGrowth: number;
}

export class WardrobeAnalyticsService {
  
  /**
   * Statistiques complètes de la garde-robe
   */
  async getWardrobeStats(userId: number): Promise<WardrobeStats> {
    const items = await db.select()
      .from(wardrobeItems)
      .where(eq(wardrobeItems.userId, userId));

    const totalValue = items.reduce((sum, item) => {
      const value = parseFloat(item.currentValue || item.purchasePrice || '0');
      return sum + value;
    }, 0);

    const itemsByCategory: Record<string, number> = {};
    const itemsByColor: Record<string, number> = {};
    const itemsByBrand: Record<string, number> = {};
    const itemsBySeason: Record<string, number> = {};

    items.forEach(item => {
      // Catégories
      itemsByCategory[item.category] = (itemsByCategory[item.category] || 0) + 1;

      // Couleurs
      if (item.color && Array.isArray(item.color)) {
        item.color.forEach(c => {
          itemsByColor[c] = (itemsByColor[c] || 0) + 1;
        });
      }

      // Marques
      if (item.brand) {
        itemsByBrand[item.brand] = (itemsByBrand[item.brand] || 0) + 1;
      }

      // Saisons
      if (item.season) {
        itemsBySeason[item.season] = (itemsBySeason[item.season] || 0) + 1;
      }
    });

    // Items les plus/moins utilisés
    const sortedByUsage = [...items].sort((a, b) => 
      (b.usedInOutfitsCount || 0) - (a.usedInOutfitsCount || 0)
    );

    const mostUsedItems = sortedByUsage.slice(0, 5).map(item => ({
      id: item.id,
      name: item.name,
      timesUsed: item.usedInOutfitsCount || 0
    }));

    const leastUsedItems = sortedByUsage.slice(-5).reverse().map(item => ({
      id: item.id,
      name: item.name,
      timesUsed: item.usedInOutfitsCount || 0
    }));

    // Coût par port
    const costPerWear = items
      .filter(item => (item.usedInOutfitsCount || 0) > 0)
      .map(item => {
        const cost = parseFloat(item.purchasePrice || '0') / (item.usedInOutfitsCount || 1);
        return {
          id: item.id,
          name: item.name,
          cost: Math.round(cost * 100) / 100
        };
      })
      .sort((a, b) => a.cost - b.cost)
      .slice(0, 10);

    return {
      totalItems: items.length,
      totalValue: Math.round(totalValue * 100) / 100,
      averageItemValue: items.length > 0 ? Math.round((totalValue / items.length) * 100) / 100 : 0,
      itemsByCategory,
      itemsByColor,
      itemsByBrand,
      itemsBySeason,
      mostUsedItems,
      leastUsedItems,
      costPerWear
    };
  }

  /**
   * Statistiques d'engagement
   */
  async getEngagementStats(userId: number): Promise<EngagementStats> {
    const userOutfits = await db.select()
      .from(outfits)
      .where(eq(outfits.userId, userId));

    const totalLikes = userOutfits.reduce((sum, outfit) => sum + (outfit.likesCount || 0), 0);
    const totalComments = userOutfits.reduce((sum, outfit) => sum + (outfit.commentsCount || 0), 0);
    const totalViews = userOutfits.reduce((sum, outfit) => sum + (outfit.viewsCount || 0), 0);

    const mostLikedOutfit = userOutfits.reduce((max, outfit) => 
      (outfit.likesCount || 0) > (max?.likesCount || 0) ? outfit : max
    , userOutfits[0]);

    const engagementRate = totalViews > 0 
      ? Math.round(((totalLikes + totalComments) / totalViews) * 100 * 100) / 100
      : 0;

    // Croissance followers (30 derniers jours vs 30 jours précédents)
    const user = await db.select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    const currentFollowers = user[0]?.followersCount || 0;
    // TODO: Implémenter le tracking historique des followers
    const followerGrowth = 0;

    return {
      totalLikes,
      totalComments,
      totalViews,
      mostLikedOutfit,
      engagementRate,
      followerGrowth
    };
  }
}

export const wardrobeAnalyticsService = new WardrobeAnalyticsService();


import { db } from '../db';
import { wardrobeItems, outfits } from '../../shared/schema';
import { eq, sql, desc } from 'drizzle-orm';

export interface UserWardrobeStats {
  totalItems: number;
  totalValue: number;
  averageItemValue: number;
  itemsByCategory: { category: string; count: number }[];
  itemsByBrand: { brand: string; count: number }[];
  itemsByColor: { color: string; count: number }[];
  itemsBySeason: { season: string; count: number }[];
  mostUsedItems: any[];
  topColors: string[];
  topBrands: string[];
  costPerWear?: number;
}

export interface UserEngagementStats {
  totalOutfits: number;
  totalLikes: number;
  totalComments: number;
  totalViews: number;
  averageLikesPerOutfit: number;
  topOutfits: any[];
  engagementRate: number;
}

export class UserStatsService {
  async getWardrobeStats(userId: number): Promise<UserWardrobeStats> {
    try {
      // Total items et valeur
      const items = await db
        .select()
        .from(wardrobeItems)
        .where(eq(wardrobeItems.userId, userId));

      const totalItems = items.length;
      const totalValue = items.reduce((sum, item) => {
        const price = parseFloat(item.purchasePrice || '0');
        return sum + price;
      }, 0);

      const averageItemValue = totalItems > 0 ? totalValue / totalItems : 0;

      // Items par catégorie
      const itemsByCategory = await db.execute(sql`
        SELECT category, COUNT(*) as count
        FROM wardrobe_items
        WHERE user_id = ${userId}
        GROUP BY category
        ORDER BY count DESC
      `);

      // Items par marque
      const itemsByBrand = await db.execute(sql`
        SELECT brand, COUNT(*) as count
        FROM wardrobe_items
        WHERE user_id = ${userId} AND brand IS NOT NULL
        GROUP BY brand
        ORDER BY count DESC
        LIMIT 10
      `);

      // Items par couleur
      const itemsByColor = await db.execute(sql`
        SELECT unnest(color) as color, COUNT(*) as count
        FROM wardrobe_items
        WHERE user_id = ${userId} AND color IS NOT NULL
        GROUP BY color
        ORDER BY count DESC
        LIMIT 10
      `);

      // Items par saison
      const itemsBySeason = await db.execute(sql`
        SELECT season, COUNT(*) as count
        FROM wardrobe_items
        WHERE user_id = ${userId} AND season IS NOT NULL
        GROUP BY season
        ORDER BY count DESC
      `);

      // Items les plus utilisés (dans des outfits)
      const mostUsedItems = await db
        .select()
        .from(wardrobeItems)
        .where(eq(wardrobeItems.userId, userId))
        .orderBy(desc(wardrobeItems.usedInOutfitsCount))
        .limit(5);

      const topColors = (itemsByColor.rows || [])
        .slice(0, 5)
        .map((row: any) => row.color);

      const topBrands = (itemsByBrand.rows || [])
        .slice(0, 5)
        .map((row: any) => row.brand);

      return {
        totalItems,
        totalValue,
        averageItemValue,
        itemsByCategory: itemsByCategory.rows as any,
        itemsByBrand: itemsByBrand.rows as any,
        itemsByColor: itemsByColor.rows as any,
        itemsBySeason: itemsBySeason.rows as any,
        mostUsedItems,
        topColors,
        topBrands
      };
    } catch (error) {
      console.error('Erreur calcul stats garde-robe:', error);
      throw error;
    }
  }

  async getEngagementStats(userId: number): Promise<UserEngagementStats> {
    try {
      const userOutfits = await db
        .select()
        .from(outfits)
        .where(eq(outfits.userId, userId));

      const totalOutfits = userOutfits.length;
      const totalLikes = userOutfits.reduce((sum, o) => sum + (o.likesCount || 0), 0);
      const totalComments = userOutfits.reduce((sum, o) => sum + (o.commentsCount || 0), 0);
      const totalViews = userOutfits.reduce((sum, o) => sum + (o.viewsCount || 0), 0);

      const averageLikesPerOutfit = totalOutfits > 0 ? totalLikes / totalOutfits : 0;

      const topOutfits = await db
        .select()
        .from(outfits)
        .where(eq(outfits.userId, userId))
        .orderBy(desc(outfits.likesCount))
        .limit(5);

      const engagementRate = totalViews > 0 ? ((totalLikes + totalComments) / totalViews) * 100 : 0;

      return {
        totalOutfits,
        totalLikes,
        totalComments,
        totalViews,
        averageLikesPerOutfit,
        topOutfits,
        engagementRate
      };
    } catch (error) {
      console.error('Erreur calcul stats engagement:', error);
      throw error;
    }
  }
}

export const userStatsService = new UserStatsService();

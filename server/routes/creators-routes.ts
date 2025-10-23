import { Router } from 'express';
import { db } from '../db';
import { users, looks } from '../../shared/schema';
import { eq, desc, sql } from 'drizzle-orm';

const router = Router();

/**
 * GET /api/creators
 * Récupère la liste des créateurs (utilisateurs actifs avec looks publics)
 */
router.get('/', async (req, res) => {
  try {
    // Récupérer les utilisateurs qui ont des looks publics
    const creators = await db
      .select({
        id: users.id,
        name: users.name,
        username: users.username,
        avatar: users.avatar_url,
        bio: users.bio,
        styleTags: users.style_tags,
        followersCount: users.followers_count,
        postsCount: users.posts_count,
        isVerified: users.is_verified,
        featuredLooks: sql<string[]>`
          ARRAY(
            SELECT photo_url 
            FROM ${looks} 
            WHERE ${looks.user_id} = ${users.id} 
              AND ${looks.is_public} = true 
            ORDER BY ${looks.created_at} DESC 
            LIMIT 3
          )
        `
      })
      .from(users)
      .where(sql`${users.posts_count} > 0`)
      .orderBy(desc(users.followers_count))
      .limit(50);

    // Format response
    const formattedCreators = creators.map(creator => ({
      id: creator.id.toString(),
      name: creator.name,
      username: creator.username || `@${creator.name.toLowerCase().replace(/\s+/g, '')}`,
      avatar: creator.avatar,
      bio: creator.bio || '',
      location: 'France', // Default location as the column doesn't exist
      styleTags: creator.styleTags || [],
      followersCount: creator.followersCount || 0,
      postsCount: creator.postsCount || 0,
      rating: 4.5 + Math.random() * 0.5, // Temporary rating
      isFollowing: false, // TODO: Check actual follow status
      featuredLooks: creator.featuredLooks || [],
      isVerified: creator.isVerified || false
    }));

    res.json(formattedCreators);
  } catch (error) {
    console.error('Error fetching creators:', error);
    res.status(500).json({ error: 'Failed to fetch creators' });
  }
});

/**
 * GET /api/creators/top
 * Récupère les créateurs tendance
 */
router.get('/top', async (req, res) => {
  try {
    const topCreators = await db
      .select({
        id: users.id,
        name: users.name,
        username: users.username,
        avatar: users.avatar_url,
        bio: users.bio,
        followersCount: users.followers_count,
        postsCount: users.posts_count,
        styleTags: users.style_tags
      })
      .from(users)
      .where(sql`${users.followers_count} > 100`)
      .orderBy(desc(users.followers_count))
      .limit(10);

    res.json(topCreators);
  } catch (error) {
    console.error('Error fetching top creators:', error);
    res.status(500).json({ error: 'Failed to fetch top creators' });
  }
});

export default router;

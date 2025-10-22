
import { db } from '../db';
import { followsTable, outfitLikesTable, users } from '../../shared/schema';
import { eq, and } from 'drizzle-orm';

export class SocialService {
  // Follow/Unfollow
  async followUser(followerId: number, followingId: number) {
    if (followerId === followingId) {
      throw new Error('Cannot follow yourself');
    }

    const existing = await db.select()
      .from(followsTable)
      .where(
        and(
          eq(followsTable.followerId, followerId),
          eq(followsTable.followingId, followingId)
        )
      );

    if (existing.length > 0) {
      throw new Error('Already following');
    }

    await db.insert(followsTable).values({
      followerId,
      followingId
    });

    return { success: true };
  }

  async unfollowUser(followerId: number, followingId: number) {
    await db.delete(followsTable)
      .where(
        and(
          eq(followsTable.followerId, followerId),
          eq(followsTable.followingId, followingId)
        )
      );

    return { success: true };
  }

  async isFollowing(followerId: number, followingId: number): Promise<boolean> {
    const result = await db.select()
      .from(followsTable)
      .where(
        and(
          eq(followsTable.followerId, followerId),
          eq(followsTable.followingId, followingId)
        )
      );

    return result.length > 0;
  }

  async getFollowers(userId: number, limit = 50) {
    const followers = await db.select()
      .from(followsTable)
      .innerJoin(users, eq(followsTable.followerId, users.id))
      .where(eq(followsTable.followingId, userId))
      .limit(limit);

    return followers.map(f => f.users);
  }

  async getFollowing(userId: number, limit = 50) {
    const following = await db.select()
      .from(followsTable)
      .innerJoin(users, eq(followsTable.followingId, users.id))
      .where(eq(followsTable.followerId, userId))
      .limit(limit);

    return following.map(f => f.users);
  }
}

export const socialService = new SocialService();

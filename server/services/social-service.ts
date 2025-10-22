
import { db } from '../db';
import { follows, likes, users } from '../../shared/schema';
import { eq, and } from 'drizzle-orm';

export class SocialService {
  // Follow/Unfollow
  async followUser(followerId: number, followingId: number) {
    if (followerId === followingId) {
      throw new Error('Cannot follow yourself');
    }

    const existing = await db.select()
      .from(follows)
      .where(
        and(
          eq(follows.follower_id, followerId),
          eq(follows.following_id, followingId)
        )
      );

    if (existing.length > 0) {
      throw new Error('Already following');
    }

    await db.insert(follows).values({
      follower_id: followerId,
      following_id: followingId
    });

    return { success: true };
  }

  async unfollowUser(followerId: number, followingId: number) {
    await db.delete(follows)
      .where(
        and(
          eq(follows.follower_id, followerId),
          eq(follows.following_id, followingId)
        )
      );

    return { success: true };
  }

  async isFollowing(followerId: number, followingId: number): Promise<boolean> {
    const result = await db.select()
      .from(follows)
      .where(
        and(
          eq(follows.follower_id, followerId),
          eq(follows.following_id, followingId)
        )
      );

    return result.length > 0;
  }

  async getFollowers(userId: number, limit = 50) {
    const followers = await db.select()
      .from(follows)
      .innerJoin(users, eq(follows.follower_id, users.id))
      .where(eq(follows.following_id, userId))
      .limit(limit);

    return followers.map(f => f.users);
  }

  async getFollowing(userId: number, limit = 50) {
    const following = await db.select()
      .from(follows)
      .innerJoin(users, eq(follows.following_id, users.id))
      .where(eq(follows.follower_id, userId))
      .limit(limit);

    return following.map(f => f.users);
  }
}

export const socialService = new SocialService();

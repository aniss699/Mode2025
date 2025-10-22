
-- Créer la table wardrobe_collections
CREATE TABLE IF NOT EXISTS wardrobe_collections (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  cover_image_url TEXT,
  items TEXT[], -- Array of wardrobe_item_ids
  is_public BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Créer la table feed_posts
CREATE TABLE IF NOT EXISTS feed_posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_type TEXT NOT NULL CHECK (post_type IN ('outfit', 'wardrobe_item', 'collection', 'question')),
  outfit_id INTEGER REFERENCES outfits(id) ON DELETE CASCADE,
  wardrobe_item_id INTEGER REFERENCES wardrobe_items(id) ON DELETE CASCADE,
  collection_id INTEGER REFERENCES wardrobe_collections(id) ON DELETE CASCADE,
  caption TEXT,
  tags TEXT[],
  quality_score DECIMAL(3,2) DEFAULT 0,
  engagement_score DECIMAL(5,2) DEFAULT 0,
  freshness_score DECIMAL(3,2) DEFAULT 1,
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  saves_count INTEGER DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Index pour les collections
CREATE INDEX IF NOT EXISTS idx_collections_user ON wardrobe_collections(user_id);
CREATE INDEX IF NOT EXISTS idx_collections_public ON wardrobe_collections(is_public);

-- Index pour feed_posts
CREATE INDEX IF NOT EXISTS idx_feed_posts_user ON feed_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_feed_posts_type ON feed_posts(post_type);
CREATE INDEX IF NOT EXISTS idx_feed_posts_outfit ON feed_posts(outfit_id);
CREATE INDEX IF NOT EXISTS idx_feed_posts_item ON feed_posts(wardrobe_item_id);
CREATE INDEX IF NOT EXISTS idx_feed_posts_collection ON feed_posts(collection_id);
CREATE INDEX IF NOT EXISTS idx_feed_posts_engagement ON feed_posts(engagement_score DESC);

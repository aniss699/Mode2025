
-- Migration Sprint 1-2 : Tables Fashion Social Network
-- Création des tables wardrobe_items, outfits, follows, etc.

-- Table 1: wardrobe_items (items de garde-robe)
CREATE TABLE IF NOT EXISTS wardrobe_items (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Informations vêtement
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- 'top', 'bottom', 'shoes', 'accessory', 'outerwear'
  subcategory TEXT,
  
  -- Détails produit
  brand TEXT,
  color TEXT[],
  size TEXT,
  material TEXT,
  season TEXT, -- 'spring', 'summer', 'fall', 'winter', 'all-season'
  
  -- Images
  image_url TEXT NOT NULL,
  image_urls TEXT[],
  
  -- Provenance & valeur
  purchase_date DATE,
  purchase_price DECIMAL(10,2),
  current_value DECIMAL(10,2),
  purchase_location TEXT,
  
  -- Organisation
  tags TEXT[],
  condition TEXT DEFAULT 'good', -- 'new', 'like-new', 'good', 'fair', 'worn'
  
  -- Visibilité
  is_public BOOLEAN DEFAULT true,
  is_for_sale BOOLEAN DEFAULT false,
  is_for_swap BOOLEAN DEFAULT false,
  
  -- Stats
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  saved_count INTEGER DEFAULT 0,
  used_in_outfits_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Table 2: outfits (compositions de looks)
CREATE TABLE IF NOT EXISTS outfits (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Contenu
  title TEXT NOT NULL,
  description TEXT,
  photo_url TEXT,
  
  -- Composition (JSONB pour flexibilité)
  items JSONB DEFAULT '[]',
  
  -- Contexte
  occasion TEXT, -- 'casual', 'work', 'party', 'date', 'sport'
  season TEXT,
  weather TEXT, -- 'sunny', 'rainy', 'cold', 'hot'
  location TEXT,
  
  -- Organisation
  tags TEXT[],
  color_palette TEXT[],
  
  -- Visibilité & engagement
  is_public BOOLEAN DEFAULT true,
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  saves_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  
  -- Algorithme feed (réutiliser l'existant)
  quality_score DECIMAL(3,2) DEFAULT 0,
  engagement_score DECIMAL(5,2) DEFAULT 0,
  freshness_score DECIMAL(3,2) DEFAULT 1,
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Table 3: outfit_likes
CREATE TABLE IF NOT EXISTS outfit_likes (
  id SERIAL PRIMARY KEY,
  outfit_id INTEGER NOT NULL REFERENCES outfits(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  
  UNIQUE(outfit_id, user_id)
);

-- Table 4: outfit_comments
CREATE TABLE IF NOT EXISTS outfit_comments (
  id SERIAL PRIMARY KEY,
  outfit_id INTEGER NOT NULL REFERENCES outfits(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  parent_comment_id INTEGER REFERENCES outfit_comments(id) ON DELETE CASCADE,
  
  content TEXT NOT NULL,
  
  likes_count INTEGER DEFAULT 0,
  is_edited BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Table 5: follows (relations sociales)
CREATE TABLE IF NOT EXISTS follows (
  id SERIAL PRIMARY KEY,
  follower_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  following_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- Table 6: wardrobe_collections
CREATE TABLE IF NOT EXISTS wardrobe_collections (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  name TEXT NOT NULL,
  description TEXT,
  cover_image_url TEXT,
  
  items JSONB DEFAULT '[]', -- Array of wardrobe_item_ids
  
  is_public BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Mise à jour table users (ajout colonnes fashion)
ALTER TABLE users ADD COLUMN IF NOT EXISTS username TEXT UNIQUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS followers_count INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS following_count INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS wardrobe_items_count INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS posts_count INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS style_tags TEXT[];
ALTER TABLE users ADD COLUMN IF NOT EXISTS favorite_brands TEXT[];
ALTER TABLE users ADD COLUMN IF NOT EXISTS sizes JSONB;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT true;
ALTER TABLE users ADD COLUMN IF NOT EXISTS allow_messages BOOLEAN DEFAULT true;

-- Indexes pour performance
CREATE INDEX IF NOT EXISTS idx_wardrobe_items_user ON wardrobe_items(user_id);
CREATE INDEX IF NOT EXISTS idx_wardrobe_items_category ON wardrobe_items(category);
CREATE INDEX IF NOT EXISTS idx_wardrobe_items_public ON wardrobe_items(is_public) WHERE is_public = true;

CREATE INDEX IF NOT EXISTS idx_outfits_user ON outfits(user_id);
CREATE INDEX IF NOT EXISTS idx_outfits_public ON outfits(is_public) WHERE is_public = true;
CREATE INDEX IF NOT EXISTS idx_outfits_engagement ON outfits(engagement_score DESC);

CREATE INDEX IF NOT EXISTS idx_outfit_likes_outfit ON outfit_likes(outfit_id);
CREATE INDEX IF NOT EXISTS idx_outfit_likes_user ON outfit_likes(user_id);

CREATE INDEX IF NOT EXISTS idx_outfit_comments_outfit ON outfit_comments(outfit_id);
CREATE INDEX IF NOT EXISTS idx_outfit_comments_user ON outfit_comments(user_id);

CREATE INDEX IF NOT EXISTS idx_follows_follower ON follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following ON follows(following_id);

CREATE INDEX IF NOT EXISTS idx_collections_user ON wardrobe_collections(user_id);

-- Triggers pour mise à jour auto des compteurs
CREATE OR REPLACE FUNCTION update_outfit_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE outfits SET likes_count = likes_count + 1 WHERE id = NEW.outfit_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE outfits SET likes_count = likes_count - 1 WHERE id = OLD.outfit_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER outfit_likes_count_trigger
AFTER INSERT OR DELETE ON outfit_likes
FOR EACH ROW EXECUTE FUNCTION update_outfit_likes_count();

CREATE OR REPLACE FUNCTION update_outfit_comments_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE outfits SET comments_count = comments_count + 1 WHERE id = NEW.outfit_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE outfits SET comments_count = comments_count - 1 WHERE id = OLD.outfit_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER outfit_comments_count_trigger
AFTER INSERT OR DELETE ON outfit_comments
FOR EACH ROW EXECUTE FUNCTION update_outfit_comments_count();

CREATE OR REPLACE FUNCTION update_follow_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE users SET following_count = following_count + 1 WHERE id = NEW.follower_id;
    UPDATE users SET followers_count = followers_count + 1 WHERE id = NEW.following_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE users SET following_count = following_count - 1 WHERE id = OLD.follower_id;
    UPDATE users SET followers_count = followers_count - 1 WHERE id = OLD.following_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER follow_counts_trigger
AFTER INSERT OR DELETE ON follows
FOR EACH ROW EXECUTE FUNCTION update_follow_counts();

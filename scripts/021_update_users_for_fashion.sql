
-- Migration pour adapter la table users au nouveau concept mode
-- Date: 2025-01-23

-- Ajouter les nouveaux champs s'ils n'existent pas
ALTER TABLE users ADD COLUMN IF NOT EXISTS username TEXT UNIQUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS style_tags TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE users ADD COLUMN IF NOT EXISTS favorite_colors TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE users ADD COLUMN IF NOT EXISTS favorite_brands TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE users ADD COLUMN IF NOT EXISTS followers_count INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS following_count INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS posts_count INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_private BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false;

-- S'assurer que role a une valeur par défaut
ALTER TABLE users ALTER COLUMN role SET DEFAULT 'CLIENT';

-- Mettre à jour les utilisateurs existants sans role
UPDATE users SET role = 'CLIENT' WHERE role IS NULL OR role = '';

-- Créer un index sur username pour les recherches
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- Log de migration
INSERT INTO migrations_log (migration_name, status, executed_at)
VALUES ('021_update_users_for_fashion', 'success', NOW())
ON CONFLICT (migration_name) DO UPDATE SET executed_at = NOW(), status = 'success';

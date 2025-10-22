
-- Seed data pour le réseau social de mode

-- Ajouter des utilisateurs mode
INSERT INTO users (email, name, password, role, profile_data, created_at) VALUES
('fashionista@test.com', 'Sophie Style', '$2a$10$abcdefghijklmnopqrstuvwxyz', 'CLIENT', 
  '{"bio": "Passionnée de mode vintage et minimaliste", "styleTags": ["vintage", "minimalist", "sustainable"]}', 
  NOW()),
('influencer@test.com', 'Marc Trendy', '$2a$10$abcdefghijklmnopqrstuvwxyz', 'CLIENT', 
  '{"bio": "Fashion influencer 50k followers", "styleTags": ["streetwear", "luxury", "sneakers"]}', 
  NOW()),
('sustainable@test.com', 'Emma Green', '$2a$10$abcdefghijklmnopqrstuvwxyz', 'CLIENT', 
  '{"bio": "Mode éthique et durable", "styleTags": ["sustainable", "ethical", "vintage"]}', 
  NOW())
ON CONFLICT (email) DO NOTHING;

-- Ajouter des items de garde-robe
INSERT INTO wardrobe_items (user_id, name, description, category, brand, color, tags, image_url, is_public, created_at)
SELECT 
  u.id,
  'Jean vintage Levi''s 501',
  'Jean droit coupe classique années 90',
  'bottom',
  'Levi''s',
  ARRAY['bleu', 'denim'],
  ARRAY['vintage', 'casual', 'denim'],
  '/uploads/wardrobe/jeans-vintage.jpg',
  true,
  NOW()
FROM users u WHERE u.email = 'fashionista@test.com'
ON CONFLICT DO NOTHING;

INSERT INTO wardrobe_items (user_id, name, description, category, brand, color, tags, image_url, is_public, created_at)
SELECT 
  u.id,
  'Sneakers Nike Air Force 1',
  'Baskets blanches iconiques',
  'shoes',
  'Nike',
  ARRAY['blanc'],
  ARRAY['streetwear', 'sneakers', 'classic'],
  '/uploads/wardrobe/af1-white.jpg',
  true,
  NOW()
FROM users u WHERE u.email = 'influencer@test.com'
ON CONFLICT DO NOTHING;

-- Ajouter des outfits
INSERT INTO outfits (user_id, title, description, occasion, season, tags, is_public, created_at)
SELECT 
  u.id,
  'Look casual weekend',
  'Tenue confortable pour le weekend',
  'casual',
  'all-season',
  ARRAY['casual', 'weekend', 'minimalist'],
  true,
  NOW()
FROM users u WHERE u.email = 'fashionista@test.com'
ON CONFLICT DO NOTHING;

-- Ajouter des follows
INSERT INTO follows (follower_id, following_id, created_at)
SELECT 
  u1.id,
  u2.id,
  NOW()
FROM users u1
CROSS JOIN users u2
WHERE u1.email = 'fashionista@test.com' 
  AND u2.email = 'influencer@test.com'
ON CONFLICT DO NOTHING;

COMMIT;

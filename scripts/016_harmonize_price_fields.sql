
-- Migration pour harmoniser tous les champs de prix vers 'price'
BEGIN;

-- 0. Créer migrations_log si n'existe pas
CREATE TABLE IF NOT EXISTS migrations_log (
  id SERIAL PRIMARY KEY,
  migration_name VARCHAR(255) UNIQUE NOT NULL,
  executed_at TIMESTAMP DEFAULT NOW(),
  description TEXT,
  status VARCHAR(50) DEFAULT 'completed'
);

-- 1. Missions table (si budget_value_cents existe)
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'missions' AND column_name = 'budget_value_cents') THEN
    ALTER TABLE missions RENAME COLUMN budget_value_cents TO price;
    
    -- Convertir les centimes en euros si nécessaire
    UPDATE missions SET price = ROUND(price / 100) WHERE price > 10000;
  END IF;
END $$;

-- 2. Announcements table
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'announcements' AND column_name = 'budget_value_cents') THEN
    ALTER TABLE announcements RENAME COLUMN budget_value_cents TO price;
    UPDATE announcements SET price = ROUND(price / 100) WHERE price > 10000;
  END IF;
  
  -- Supprimer budget_display si existe
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'announcements' AND column_name = 'budget_display') THEN
    ALTER TABLE announcements DROP COLUMN budget_display;
  END IF;
END $$;

-- 3. Supprimer les contraintes obsolètes
ALTER TABLE missions DROP CONSTRAINT IF EXISTS budget_minimum;
ALTER TABLE missions DROP CONSTRAINT IF EXISTS budget_range_valid;

-- 4. Ajouter contrainte simple sur price
ALTER TABLE missions ADD CONSTRAINT price_minimum CHECK (price >= 10);

-- 5. Logger la migration
INSERT INTO migrations_log (migration_name, executed_at, description) 
VALUES ('016_harmonize_price_fields', NOW(), 'Harmonisation de tous les champs prix vers price')
ON CONFLICT (migration_name) DO NOTHING;

COMMIT;

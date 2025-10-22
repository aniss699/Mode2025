
-- Migration pour s'assurer que la colonne price existe dans bids
BEGIN;

-- Créer migrations_log si nécessaire
CREATE TABLE IF NOT EXISTS migrations_log (
  id SERIAL PRIMARY KEY,
  migration_name VARCHAR(255) UNIQUE NOT NULL,
  executed_at TIMESTAMP DEFAULT NOW(),
  description TEXT,
  status VARCHAR(50) DEFAULT 'completed'
);

-- Vérifier et renommer amount en price si nécessaire
DO $$ 
BEGIN
  -- Si amount existe et price n'existe pas, renommer
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bids' AND column_name = 'amount'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bids' AND column_name = 'price'
  ) THEN
    ALTER TABLE bids RENAME COLUMN amount TO price;
    RAISE NOTICE 'Colonne amount renommée en price';
  END IF;

  -- Si price n'existe pas du tout, la créer
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bids' AND column_name = 'price'
  ) THEN
    ALTER TABLE bids ADD COLUMN price DECIMAL(10, 2) NOT NULL DEFAULT 0;
    RAISE NOTICE 'Colonne price créée';
  END IF;
END $$;

-- Logger la migration
INSERT INTO migrations_log (migration_name, executed_at, description) 
VALUES ('017_fix_bids_price_column', NOW(), 'Correction de la colonne price dans bids')
ON CONFLICT (migration_name) DO NOTHING;

COMMIT;

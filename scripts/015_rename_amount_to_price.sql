
-- Migration pour harmoniser la terminologie : amount -> price
BEGIN;

-- Renommer la colonne dans la table bids
ALTER TABLE bids RENAME COLUMN amount TO price;

-- Enregistrer la migration
INSERT INTO migrations_log (migration_name, applied_at, description)
VALUES (
  '015_rename_amount_to_price',
  NOW(),
  'Harmonisation de la terminologie : renommage de amount en price dans la table bids'
);

COMMIT;

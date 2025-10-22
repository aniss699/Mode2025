
-- Migration: Ajouter team_requirements pour stocker les exigences d'équipe
-- Date: 2025-10-09

-- Ajouter la colonne team_requirements si elle n'existe pas
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'missions' 
        AND column_name = 'team_requirements'
    ) THEN
        ALTER TABLE missions 
        ADD COLUMN team_requirements JSONB;
        
        RAISE NOTICE 'Colonne team_requirements ajoutée avec succès';
    ELSE
        RAISE NOTICE 'Colonne team_requirements existe déjà';
    END IF;
END $$;

-- Créer un index pour améliorer les performances des requêtes sur team_requirements
CREATE INDEX IF NOT EXISTS idx_missions_team_requirements 
ON missions USING GIN (team_requirements);

-- Log de la migration
INSERT INTO migrations_log (migration_name, executed_at)
VALUES ('013_add_team_requirements', NOW())
ON CONFLICT (migration_name) DO NOTHING;

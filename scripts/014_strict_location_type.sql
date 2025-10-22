
-- Définir un type composite strict pour location_data
CREATE TYPE location_type AS (
  raw TEXT,
  city TEXT,
  postal_code TEXT,
  country TEXT,
  remote_allowed BOOLEAN
);

-- Fonction de validation pour location_data
CREATE OR REPLACE FUNCTION validate_location_data(data JSONB)
RETURNS BOOLEAN AS $$
BEGIN
  -- Vérifier que toutes les clés requises sont présentes
  RETURN (
    data ? 'country' AND
    data ? 'remote_allowed' AND
    (data->>'country') IS NOT NULL
  );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Contrainte CHECK sur missions.location_data
ALTER TABLE missions DROP CONSTRAINT IF EXISTS location_data_valid;
ALTER TABLE missions ADD CONSTRAINT location_data_valid 
  CHECK (location_data IS NULL OR validate_location_data(location_data));

COMMENT ON CONSTRAINT location_data_valid ON missions IS 'Valide la structure de location_data';

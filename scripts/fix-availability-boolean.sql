
-- Migration pour convertir availability de string à boolean dans profile_data

-- Mise à jour de tous les utilisateurs avec availability = 'true' (string) vers true (boolean)
UPDATE users
SET profile_data = jsonb_set(
  COALESCE(profile_data, '{}'::jsonb),
  '{availability}',
  'true'::jsonb
)
WHERE profile_data->>'availability' = 'true';

-- Mise à jour de tous les utilisateurs avec availability = 'false' (string) vers false (boolean)
UPDATE users
SET profile_data = jsonb_set(
  COALESCE(profile_data, '{}'::jsonb),
  '{availability}',
  'false'::jsonb
)
WHERE profile_data->>'availability' = 'false';

-- Vérification
SELECT 
  id,
  email,
  role,
  jsonb_typeof(profile_data->'availability') as availability_type,
  profile_data->'availability' as availability_value
FROM users
WHERE profile_data IS NOT NULL
  AND profile_data ? 'availability'
ORDER BY id;


-- Añadir columna para features_config si no existe
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_name = 'features_config' AND column_name = 'enable_test_data_generator'
  ) THEN
    ALTER TABLE features_config ADD COLUMN enable_test_data_generator boolean DEFAULT false;
  END IF;
END $$;

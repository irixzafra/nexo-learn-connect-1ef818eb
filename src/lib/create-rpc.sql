
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

-- Añadir columna para habilitar/deshabilitar completamente el sistema de onboarding
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_name = 'features_config' AND column_name = 'enable_onboarding_system'
  ) THEN
    ALTER TABLE features_config ADD COLUMN enable_onboarding_system boolean DEFAULT true;
  END IF;
END $$;

-- Add additional notification fields to user_preferences
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_name = 'user_preferences' AND column_name = 'mobile_notifications'
  ) THEN
    ALTER TABLE user_preferences ADD COLUMN mobile_notifications boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_name = 'user_preferences' AND column_name = 'course_update_notifications'
  ) THEN
    ALTER TABLE user_preferences ADD COLUMN course_update_notifications boolean DEFAULT true;
  END IF;

  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_name = 'user_preferences' AND column_name = 'achievement_notifications'
  ) THEN
    ALTER TABLE user_preferences ADD COLUMN achievement_notifications boolean DEFAULT true;
  END IF;

  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_name = 'user_preferences' AND column_name = 'comment_notifications'
  ) THEN
    ALTER TABLE user_preferences ADD COLUMN comment_notifications boolean DEFAULT true;
  END IF;

  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_name = 'user_preferences' AND column_name = 'forum_notifications'
  ) THEN
    ALTER TABLE user_preferences ADD COLUMN forum_notifications boolean DEFAULT true;
  END IF;

  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_name = 'user_preferences' AND column_name = 'event_notifications'
  ) THEN
    ALTER TABLE user_preferences ADD COLUMN event_notifications boolean DEFAULT true;
  END IF;

  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_name = 'user_preferences' AND column_name = 'promotional_notifications'
  ) THEN
    ALTER TABLE user_preferences ADD COLUMN promotional_notifications boolean DEFAULT false;
  END IF;
END $$;

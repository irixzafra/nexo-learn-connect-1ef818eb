
-- Create get_user_role_distribution RPC function
CREATE OR REPLACE FUNCTION get_user_role_distribution()
RETURNS TABLE(role TEXT, count BIGINT) SECURITY INVOKER AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.role::TEXT, 
    COUNT(u.id)::BIGINT
  FROM 
    users u
  GROUP BY 
    u.role
  ORDER BY 
    COUNT(u.id) DESC;
END;
$$ LANGUAGE plpgsql;

-- Create get_user_registrations_by_day RPC function
CREATE OR REPLACE FUNCTION get_user_registrations_by_day(days_back INT DEFAULT 30)
RETURNS TABLE(date TEXT, count BIGINT) SECURITY INVOKER AS $$
BEGIN
  RETURN QUERY
  SELECT 
    TO_CHAR(DATE_TRUNC('day', p.created_at), 'YYYY-MM-DD') as date,
    COUNT(p.id)::BIGINT as count
  FROM 
    profiles p
  WHERE 
    p.created_at >= CURRENT_DATE - days_back
  GROUP BY 
    DATE_TRUNC('day', p.created_at)
  ORDER BY 
    date ASC;
END;
$$ LANGUAGE plpgsql;

-- Create get_dashboard_stats RPC function
CREATE OR REPLACE FUNCTION get_dashboard_stats()
RETURNS JSON SECURITY INVOKER AS $$
DECLARE
  total_users_count INT;
  new_users_count INT;
  active_courses_count INT;
  total_enrollments_count INT;
  result JSON;
BEGIN
  -- Count total users
  SELECT COUNT(*) INTO total_users_count FROM profiles;
  
  -- Count new users in last 7 days
  SELECT COUNT(*) INTO new_users_count 
  FROM profiles 
  WHERE created_at >= CURRENT_DATE - 7;
  
  -- Count active courses
  SELECT COUNT(*) INTO active_courses_count 
  FROM courses 
  WHERE status = 'published';
  
  -- Count total enrollments
  SELECT COUNT(*) INTO total_enrollments_count 
  FROM enrollments;
  
  -- Build JSON result
  result := json_build_object(
    'total_users', total_users_count,
    'new_users_last_7_days', new_users_count,
    'active_courses', active_courses_count,
    'total_enrollments', total_enrollments_count
  );
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;

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

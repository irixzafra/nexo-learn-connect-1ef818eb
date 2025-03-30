
-- Este script crea usuarios de prueba para desarrollo y testing
-- Para ejecutarlo, ve a SQL Editor en el dashboard de Supabase

-- Función para crear un usuario de prueba
CREATE OR REPLACE FUNCTION create_test_user(
  p_email TEXT,
  p_password TEXT,
  p_full_name TEXT,
  p_role TEXT
) RETURNS UUID AS $$
DECLARE
  v_user_id UUID;
  v_existing_user UUID;
BEGIN
  -- Verificar si el usuario ya existe
  SELECT id INTO v_existing_user FROM auth.users WHERE email = p_email;
  
  IF v_existing_user IS NULL THEN
    -- Crear nuevo usuario en auth.users
    INSERT INTO auth.users (
      email,
      encrypted_password,
      email_confirmed_at,
      raw_user_meta_data,
      created_at
    ) VALUES (
      p_email,
      -- Usar hash de contraseña para 'password123'
      crypt(p_password, gen_salt('bf')),
      now(),
      jsonb_build_object(
        'full_name', p_full_name,
        'role', p_role
      ),
      now()
    ) RETURNING id INTO v_user_id;
    
    -- Actualizar role en profiles si es necesario
    UPDATE public.profiles
    SET role = p_role
    WHERE id = v_user_id;
    
    RETURN v_user_id;
  ELSE
    -- Actualizar usuario existente
    UPDATE auth.users
    SET 
      raw_user_meta_data = jsonb_build_object(
        'full_name', p_full_name,
        'role', p_role
      ),
      updated_at = now()
    WHERE id = v_existing_user;
    
    -- Actualizar role en profiles
    UPDATE public.profiles
    SET role = p_role
    WHERE id = v_existing_user;
    
    RETURN v_existing_user;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Crear usuarios de prueba
SELECT create_test_user('ana.martinez@example.com', 'password123', 'Ana Martínez', 'student');
SELECT create_test_user('carlos.lopez@example.com', 'password123', 'Carlos López', 'student');
SELECT create_test_user('maria.garcia@example.com', 'password123', 'María García', 'instructor');
SELECT create_test_user('juan.perez@example.com', 'password123', 'Juan Pérez', 'student');
SELECT create_test_user('elena.fernandez@example.com', 'password123', 'Elena Fernández', 'admin');

-- Inscribir estudiantes a un curso de ejemplo (asume que existe un ID de curso)
DO $$
DECLARE
  v_course_id UUID := '102a9fc2-e1a7-4fe6-b198-58b5b1bee3b0'; -- ID del curso de ejemplo
  v_user_id UUID;
BEGIN
  -- Inscribir a Ana
  SELECT id INTO v_user_id FROM profiles WHERE email = 'ana.martinez@example.com';
  IF v_user_id IS NOT NULL THEN
    INSERT INTO enrollments (user_id, course_id, enrolled_at)
    VALUES (v_user_id, v_course_id, now() - interval '30 days')
    ON CONFLICT (user_id, course_id) DO NOTHING;
  END IF;
  
  -- Inscribir a Carlos
  SELECT id INTO v_user_id FROM profiles WHERE email = 'carlos.lopez@example.com';
  IF v_user_id IS NOT NULL THEN
    INSERT INTO enrollments (user_id, course_id, enrolled_at)
    VALUES (v_user_id, v_course_id, now() - interval '25 days')
    ON CONFLICT (user_id, course_id) DO NOTHING;
  END IF;
  
  -- Inscribir a Juan
  SELECT id INTO v_user_id FROM profiles WHERE email = 'juan.perez@example.com';
  IF v_user_id IS NOT NULL THEN
    INSERT INTO enrollments (user_id, course_id, enrolled_at)
    VALUES (v_user_id, v_course_id, now() - interval '15 days')
    ON CONFLICT (user_id, course_id) DO NOTHING;
  END IF;
END $$;

-- Limpiar la función temporal
DROP FUNCTION create_test_user;

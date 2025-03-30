
-- Create the features_config table to store user feature preferences
CREATE TABLE IF NOT EXISTS public.features_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    auto_start_onboarding BOOLEAN DEFAULT TRUE,
    show_onboarding_trigger BOOLEAN DEFAULT TRUE,
    enable_notifications BOOLEAN DEFAULT TRUE,
    enable_test_data_generator BOOLEAN DEFAULT FALSE,
    enable_onboarding_system BOOLEAN DEFAULT TRUE,
    enable_role_management BOOLEAN DEFAULT TRUE,
    enable_role_switcher BOOLEAN DEFAULT TRUE,
    enable_multi_language BOOLEAN DEFAULT FALSE,
    enable_leaderboard BOOLEAN DEFAULT FALSE,
    enable_theme_switcher BOOLEAN DEFAULT TRUE,
    enable_category_management BOOLEAN DEFAULT FALSE,
    enable_content_reordering BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),

    -- Add a unique constraint to ensure each user only has one config entry
    CONSTRAINT features_config_user_id_key UNIQUE (user_id)
);

-- Set up RLS (Row Level Security) so users can only access their own configuration
ALTER TABLE public.features_config ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own configuration
CREATE POLICY "Users can read their own config" ON public.features_config
    FOR SELECT USING (auth.uid() = user_id);

-- Policy for users to insert their own configuration
CREATE POLICY "Users can insert their own config" ON public.features_config
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own configuration
CREATE POLICY "Users can update their own config" ON public.features_config
    FOR UPDATE USING (auth.uid() = user_id);

-- Add comments to the table and columns
COMMENT ON TABLE public.features_config IS 'Table to store user feature configuration preferences';
COMMENT ON COLUMN public.features_config.user_id IS 'Reference to the user this configuration belongs to';

-- Grant necessary permissions
GRANT ALL ON public.features_config TO authenticated;
GRANT ALL ON public.features_config TO service_role;

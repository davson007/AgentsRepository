-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Update personas table to handle versions and new fields
ALTER TABLE ai_personas 
  ADD COLUMN IF NOT EXISTS picture TEXT,
  ADD COLUMN IF NOT EXISTS notes TEXT,
  ADD COLUMN IF NOT EXISTS version TEXT DEFAULT 'v1.0',
  ADD COLUMN IF NOT EXISTS versions JSONB DEFAULT '[]'::jsonb,
  ALTER COLUMN id SET DEFAULT uuid_generate_v4(),
  ALTER COLUMN id SET DATA TYPE UUID USING (CASE 
    WHEN id ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' 
    THEN id::UUID 
    ELSE uuid_generate_v4() 
  END);

-- Update existing records to have initial version data
UPDATE ai_personas
SET 
  version = COALESCE(version, 'v1.0'),
  versions = CASE 
    WHEN versions IS NULL OR jsonb_array_length(versions) = 0 
    THEN jsonb_build_array(jsonb_build_object(
      'version', COALESCE(version, 'v1.0'),
      'data', jsonb_build_object(
        'name', name,
        'version', COALESCE(version, 'v1.0'),
        'picture', picture,
        'description', description,
        'mainObjective', main_objective,
        'systemPrompt', system_prompt,
        'userPromptTemplate', user_prompt_template,
        'notes', notes
      )
    ))
    ELSE versions
  END
WHERE id IS NOT NULL;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_personas_version ON ai_personas(version);
CREATE INDEX IF NOT EXISTS idx_personas_updated_at ON ai_personas(updated_at DESC);

-- Add constraints
ALTER TABLE ai_personas 
  ALTER COLUMN id SET NOT NULL,
  ALTER COLUMN name SET NOT NULL,
  ALTER COLUMN version SET NOT NULL,
  ALTER COLUMN versions SET NOT NULL;
-- Drop existing table if it exists
DROP TABLE IF EXISTS ai_personas CASCADE;

-- Create ai_personas table with proper structure
CREATE TABLE ai_personas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    name TEXT NOT NULL,
    description TEXT,
    main_objective TEXT,
    system_prompt TEXT,
    user_prompt_template TEXT,
    picture TEXT,
    notes TEXT,
    version TEXT DEFAULT 'v1.0',
    versions JSONB DEFAULT '[]'::jsonb
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_ai_personas_updated_at
    BEFORE UPDATE ON ai_personas
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes
CREATE INDEX idx_personas_version ON ai_personas(version);
CREATE INDEX idx_personas_updated_at ON ai_personas(updated_at DESC);

-- Enable RLS
ALTER TABLE ai_personas ENABLE ROW LEVEL SECURITY;

-- Create RLS policy that allows all operations
DROP POLICY IF EXISTS "Enable all access for all users" ON ai_personas;
CREATE POLICY "Enable all access for all users" ON ai_personas
    FOR ALL
    TO PUBLIC
    USING (true)
    WITH CHECK (true);

-- Insert initial data
INSERT INTO ai_personas (
    name,
    description,
    main_objective,
    system_prompt,
    user_prompt_template,
    version,
    versions
) VALUES (
    'Assistant',
    'General purpose AI assistant',
    'To assist users with various tasks and provide helpful information',
    'You are a helpful AI assistant designed to support users with their tasks.',
    'How can I help you with {task}?',
    'v1.0',
    '[{
        "version": "v1.0",
        "data": {
            "name": "Assistant",
            "version": "v1.0",
            "description": "General purpose AI assistant",
            "mainObjective": "To assist users with various tasks and provide helpful information",
            "systemPrompt": "You are a helpful AI assistant designed to support users with their tasks.",
            "userPromptTemplate": "How can I help you with {task}?",
            "notes": ""
        }
    }]'::jsonb
);
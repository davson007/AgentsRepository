-- Insert initial personas
INSERT INTO ai_personas (
  name,
  description,
  main_objective,
  system_prompt,
  user_prompt_template,
  picture,
  notes,
  version,
  versions
) VALUES (
  'Assistant',
  'General purpose AI assistant',
  'To assist users with various tasks and provide helpful information',
  'You are a helpful AI assistant designed to support users with their tasks.',
  'How can I help you with {task}?',
  NULL,
  'Initial version of the general-purpose assistant',
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
      "notes": "Initial version of the general-purpose assistant"
    }
  }]'::jsonb
);
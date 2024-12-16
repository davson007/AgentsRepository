import { Bot, Cpu, Wrench, Key } from 'lucide-react';

// Generate proper UUIDs for mock data
const UUID1 = 'c47b85c3-6c6e-4eee-9d75-4b6467b1f573';
const UUID2 = 'd83f5c8a-9d3e-4d5b-b4e1-9c2a3b4c5d6e';

export const mockData = {
  personas: [
    { 
      id: UUID1, 
      name: 'Assistant', 
      description: 'General purpose AI assistant',
      version: 'v1.0',
      icon: Bot,
      versions: [{
        version: 'v1.0',
        data: {
          name: 'Assistant',
          version: 'v1.0',
          description: 'General purpose AI assistant',
          mainObjective: 'To assist users with various tasks',
          systemPrompt: '',
          userPromptTemplate: '',
          notes: ''
        }
      }]
    },
    { 
      id: UUID2, 
      name: 'Coder', 
      description: 'Specialized in code generation',
      version: 'v1.0',
      icon: Bot,
      versions: [{
        version: 'v1.0',
        data: {
          name: 'Coder',
          version: 'v1.0',
          description: 'Specialized in code generation',
          mainObjective: 'To assist with coding tasks',
          systemPrompt: '',
          userPromptTemplate: '',
          notes: ''
        }
      }]
    }
  ],
  agents: [
    { id: 'agent-1', name: 'Data Processor', description: 'Processes and analyzes data', icon: Cpu },
    { id: 'agent-2', name: 'Content Generator', description: 'Generates various types of content', icon: Cpu },
  ],
  tools: [
    { id: 'tool-1', name: 'File Reader', description: 'Reads file contents', icon: Wrench },
    { id: 'tool-2', name: 'API Caller', description: 'Makes API requests', icon: Wrench },
  ],
  credentials: [
    { id: 'cred-1', name: 'OpenAI API', description: 'OpenAI API credentials', icon: Key },
    { id: 'cred-2', name: 'GitHub API', description: 'GitHub API credentials', icon: Key },
  ],
};
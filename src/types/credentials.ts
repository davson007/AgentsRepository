export interface Credential {
  id: string;
  name: string;
  url: string;
  description: string;
  service: string;
  key: string;
  notes: string;
  picture?: string;
  version: string;
  versions?: CredentialVersion[];
  expires_at?: string;
  is_active: boolean;
  is_favorite?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CredentialVersion {
  version: string;
  data: {
    name: string;
    url: string;
    version: string;
    description: string;
    service: string;
    key: string;
    notes: string;
    picture?: string;
    is_active: boolean;
    expires_at?: string;
  };
}

export type UserRole = 'visitor' | 'member' | 'subscriber' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  age: number;
  gender: 'man' | 'woman' | 'other';
  city: string;
  bio?: string;
  interests?: string[];
  looking_for: 'man' | 'woman' | 'both';
  photos?: string[];
  is_premium: boolean;
  created_at: string;
  updated_at: string;
}

export interface MysteryProfile {
  id: string;
  anonymous_name: string;
  age: number;
  city: string;
  bio_snippet: string;
  compatibility_score: number;
  interests_preview: string[];
}

export interface Match {
  id: string;
  user1_id: string;
  user2_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  revealed: boolean;
  created_at: string;
  matched_at?: string;
}

export interface DateProposal {
  id: string;
  match_id: string;
  proposer_id: string;
  scheduled_at: string;
  location: string;
  activity: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  created_at: string;
}

export interface PlatformSettings {
  id: string;
  maintenance_mode: boolean;
  allow_registrations: boolean;
  subscription_price: number;
  max_free_matches: number;
  features_json: Record<string, boolean>;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image?: string;
  author_id: string;
  published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface City {
  id: string;
  name: string;
  slug: string;
  region: string;
  description?: string;
  active_users_count: number;
  seo_content?: string;
}

export interface Report {
  id: string;
  reporter_id: string;
  reported_user_id: string;
  reason: string;
  description?: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  created_at: string;
}

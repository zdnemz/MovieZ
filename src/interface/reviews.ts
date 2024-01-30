interface AuthorDetails {
  avatar_path: string | null;
  name: string;
  rating: number;
  username: string;
}

interface ReviewType {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  rating?: number;
  updated_at: string;
  url: string;
}

export type { ReviewType };

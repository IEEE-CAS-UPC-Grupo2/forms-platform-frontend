import { Pagination } from "./pagination";

export interface Newsletter {
  id: string;
  title: string;
  description: string;
  image: string;
  state: string;
  publishDate: string;
  labels: string[];
  isFeatured: boolean;
}

export interface CreateNewsletter {
  title: string;
  description: string;
  image: string;
  state: string;
  publishDate: string;
  labels: string[];
  isFeatured: boolean;
}

export interface UpdateNewsletter {
  title?: string;
  description?: string;
  image?: string;
  state?: string;
  publishDate?: string;
  labels?: string[];
  isFeatured?: boolean;
}

export interface NewslettersPagination {
  results: Newsletter[];
  pagination: Pagination;
}

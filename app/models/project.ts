import { Pagination } from "./pagination";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  state: string;
  publishDate: string;
  labels: string[];
  isFeatured: boolean;
}

export interface CreateProject {
  title: string;
  description: string;
  image: string;
  state: string;
  publishDate: string;
  labels: string[];
  isFeatured: boolean;
}

export interface UpdateProject {
  title?: string;
  description?: string;
  image?: string;
  state?: string;
  publishDate?: string;
  labels?: string[];
  isFeatured?: boolean;
}

export interface ProjectPagination {
  results: Project[];
  pagination: Pagination;
}

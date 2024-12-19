import { Pagination } from "./pagination";

export interface ContactUs {
  id: string;
  names: string;
  lastNames: string;
  email: string;
  cellphone: string;
  message: string;
  state: string;
  publishDate: string;
}

export interface ContactUsPagination {
  results: ContactUs[];
  pagination: Pagination;
}

import { Subsection } from "./subsection";

export interface SectionUpdateOrder {
  orderX: number;
  orderY: number;
}

export interface Section {
  id: string;
  name: string;
  state: string;
  order: number;
  path: string;
  hasDropdown: boolean;
  subsections: Subsection[];
}
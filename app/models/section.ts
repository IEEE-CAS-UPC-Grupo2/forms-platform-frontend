import { SubsectionEmbedded } from "./subsection";

export interface UpdateSectionOrder {
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
  subsections: SubsectionEmbedded[];
}
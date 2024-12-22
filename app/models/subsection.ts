export interface SubsectionEmbedded {
  id: string;
  title: string;
  order: number;
  path: string;
  state: string;
}

export interface Subsection extends SubsectionEmbedded {
  image: string;
  description: string;
  content: object;
}

export interface UpdateSubsectionHeader {
  title?: string;
  description?: string;
  image?: string;
  state?: string;
}

export interface UpdateSubsectionContent {
  content?: object;
}

export interface UpdateSubsection
  extends UpdateSubsectionHeader, UpdateSubsectionContent {}

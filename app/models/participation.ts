export type Participation = {
  idEvent: number;
  dni: string;
  name: string;
  email: string;
  studyCenter: string;
  career: string;
  ieeeMembershipCode?: string;
  hasCertificate: boolean;
  hasAttended: boolean;
};

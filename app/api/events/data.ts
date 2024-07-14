import { format } from "date-fns";

export type Event = {
  idEvent: number;
  idAdministrator: number;
  eventTitle: string;
  eventDescription: string;
  imageUrl: string;
  modality: string;
  institutionInCharge: string;
  vacancy: number;
  addressEvent: string;
  speaker: string;
  eventDateTime: string;
  eventDuration: number;
};

export const formatEventDateTime = (dateTime: string): string => {
  const date = new Date(dateTime);
  return format(date, "yyyy/MM/dd HH:mm:ss");
};

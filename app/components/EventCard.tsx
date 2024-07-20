"use client";

import Image from "next/image";
import { formatEventDate } from "../utils/formatDate";
import { useRouter } from "next/navigation";

interface EventCardProps {
  title: string;
  date: string;
  imageSrc: string;
  eventId: number;
}

export const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  imageSrc,
  eventId,
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/event/${eventId}`);
  };

  return (
    <div className="w-[300px] hover:opacity-90" onClick={handleCardClick}>
      <Image
        src={imageSrc}
        alt={title}
        width={360}
        height={200}
        className="h-[180px] w-[300px] rounded-xl shadow-md shadow-cas-black/20"
      />
      <div className="px-2 pt-2">
        <p>{title}</p>
        <small>{formatEventDate(date)}</small>
      </div>
    </div>
  );
};

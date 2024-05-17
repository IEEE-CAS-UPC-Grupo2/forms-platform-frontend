import Image from "next/image";

interface EventCardProps {
  title: string;
  date: string;
  imageSrc: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  imageSrc,
}) => {
  return (
    <div className="bg-cas-gray-mid w-80">
      <Image src={imageSrc} alt={title} width={320} height={180} />
      <p className="text-lg font-bold">{title}</p>
      <small>{date}</small>
    </div>
  );
};

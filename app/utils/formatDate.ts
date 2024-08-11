export const formatEventDate = (dateString: string): string => {
  const date = new Date(dateString);

  const dayName = date.toLocaleDateString("es-ES", { weekday: "short" });
  const day = date.getDate();
  const monthName = date.toLocaleDateString("es-ES", { month: "short" });

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${dayName}, ${day} ${monthName}, ${hours}:${minutes} ${ampm}`;
};

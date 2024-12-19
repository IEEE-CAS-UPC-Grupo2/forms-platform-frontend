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

export const formatToApiDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString();
};

export const formatFromApiDate = (apiDateString: string | undefined) => {
  if (!apiDateString) return "";

  const date = new Date(apiDateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

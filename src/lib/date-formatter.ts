export const formatDate = (temp: string) => {
  const date = new Date(temp);

  // Format date part (e.g., 06 Nov, 2023)
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };
  const formattedDate = date.toLocaleDateString("en-US", dateOptions);

  // Format time part (e.g., 11:38)
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

  // Combine both date and time
  const finalFormattedDate = `${formattedDate} ${formattedTime}`;

  console.log(finalFormattedDate); // Output: "14 Aug, 2024 12:10"
  return finalFormattedDate;
};

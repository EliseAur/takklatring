export function formatProjectDate(dateString) {
  if (!dateString || dateString.length !== 8) return "";

  const year = dateString.slice(0, 4);
  const month = dateString.slice(4, 6);

  const monthNames = [
    "Januar",
    "Februar",
    "Mars",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  return `${monthNames[Number(month) - 1]} ${year}`;
}

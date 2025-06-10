const todayDate = () => {
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${year}-${month}-${day}`;
};

function formatDateTime(inputDateString) {
  const inputDate = new Date(inputDateString);

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false // Use 24-hour format
  };

  const formattedDateTime = new Intl.DateTimeFormat("fr-FR", options).format(
    inputDate
  );

  return formattedDateTime.charAt(0).toUpperCase() + formattedDateTime.slice(1);
}

function formatDate(inputDateString) {
  const inputDate = new Date(inputDateString);

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false // Use 24-hour format
  };

  const formattedDateTime = new Intl.DateTimeFormat("fr-FR", options).format(
    inputDate
  );

  return formattedDateTime.charAt(0).toUpperCase();
}

const reverseDateFormat = (dateStr) => {
  const [year, month, day] = dateStr.split('-');
  return `${day}-${month}-${year}`;
};

export { todayDate, formatDateTime, reverseDateFormat };

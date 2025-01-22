function manipulateDateAndTime(date: number) {
  const dateObject = new Date(date);
  const userFriendlyDateTime = `${dateObject.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })} at ${dateObject.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  return userFriendlyDateTime;
}

export { manipulateDateAndTime };

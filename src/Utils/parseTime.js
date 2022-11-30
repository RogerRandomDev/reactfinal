const parseTime = (dateString) => {
  if (dateString) {
    let date = new Date(dateString);
    let dateHours =
      date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    let dateType = date.getHours() > 12 ? 'PM' : 'AM';
    return `${dateHours}:${date.getMinutes()} ${dateType}`;
  }
  return 'unknown';
};

export default parseTime;

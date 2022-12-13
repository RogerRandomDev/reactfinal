const parseTime = (dateString) => {
  if (dateString) {
    let date = new Date(dateString);
    let dateHours =
      date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    let dateType = date.getHours() >= 12 ? 'PM' : 'AM';
    let dateMinutes =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'June',
      'July',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ];

    let dateToday = new Date().getDate() - date.getDate();
    let oldDate = `${monthNames[date.getMonth()]} ${date.getDate()}`;
    return `${
      dateToday === 0 ? '' : oldDate
    } ${dateHours}:${dateMinutes} ${dateType}`;
  }
  return 'unknown';
};

export default parseTime;

const getDate = (isoDate: any): string => {
  let date = new Date(isoDate);

  let day: number | string = date.getUTCDate();
  let month: number | string = date.getUTCMonth() + 1;
  let year: number | string = date.getUTCFullYear();

  // Đảm bảo ngày và tháng có 2 chữ số
  if (day < 10) {
    day = "0" + day;
  }

  if (month < 10) {
    month = "0" + month;
  }

  let formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
};

export default getDate;

const dateFormater = (value: string) => {
  const indexOfT = value.indexOf("T");
  const dateWithoutTime = value.substring(0, indexOfT);

  return dateWithoutTime;
};

export default dateFormater;

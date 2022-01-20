export const dateCompiler = (dateStr: string = ''): string => {
  const timeObj = new Date(dateStr);
  return `${timeObj.getFullYear()}/${
    timeObj.getMonth() + 1
  }/${timeObj.getDate()} - ${timeObj.getHours()}:${timeObj.getMinutes()}`;
};

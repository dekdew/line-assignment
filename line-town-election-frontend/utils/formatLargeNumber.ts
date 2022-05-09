const formatter = Intl.NumberFormat("en", { notation: "compact" });

const formatLargeNumber = (number: number) => {
  return formatter.format(number);
};

export default formatLargeNumber;

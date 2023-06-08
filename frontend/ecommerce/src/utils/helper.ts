export const roundNumber = (value: number) => {
  if (value > 1000) {
    const roundedValue = Math.round(value / 100) / 10;
    return `${roundedValue}k`;
  } else {
    return value.toString();
  }
};

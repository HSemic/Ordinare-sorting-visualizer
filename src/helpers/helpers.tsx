export const normalise = (value: number, MIN: number, MAX: number) => {
  const vl = ((value - MIN) * 100) / (MAX - MIN);
  return vl;
};

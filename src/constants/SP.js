const SP = [
  5, 9, 12, 18, 24, 30, 36, 42, 48, 54, 60, 65, 70, 75, 80, 85, 90, 95, 100,
  110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 220, 240, 260, 280, 300,
  350, 400, 450, 500, 600, 700, 800, 900, 1000, 1200, 1400, 1600, 1800, 2000,
];

const calculateSP = (number) => {
  let result = 0;
  for (let i = 0; i < SP.length; i++) {
    const element = SP[i];
    if (element <= number) {
      result = i + 1;
    }
  }
  return result;
};

module.exports = calculateSP;

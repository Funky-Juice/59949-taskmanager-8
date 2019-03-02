
export const getRandomValFromArr = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const getRandomDate = (daysQty) => {
  const a = Date.now();
  const b = Math.floor(Math.random() * daysQty) * 24 * 60 * 60 * 1000;

  return Math.random() < 0.5 ? (a - b) : (a + b);
};

export const getRandomLengthArr = (arr, qty) => {
  let newArr = [];

  for (let i = 0; i < arr.length; i++) {
    newArr.push(getRandomValFromArr(arr));
  }
  const maxQty = Math.floor(Math.random() * qty + 1);

  return [...new Set(newArr)].slice(0, maxQty);
};

export const getObjectFromArr = (arr) => {
  const newObj = {};

  for (let i = 0; i < arr.length; i++) {
    newObj[arr[i]] = Math.random() >= 0.5;
  }
  return newObj;
};

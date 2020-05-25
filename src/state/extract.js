import difference from "lodash.difference";

const duplicates = (array) => {
  for (var i = 1; i <= 9; i++) {
    let filtered = array.filter((value) => value === i);
    if (filtered.length > 1) {
      return true;
    }
  }
  return false;
};
const remains = (array) => {
  return difference([1, 2, 3, 4, 5, 6, 7, 8, 9], array);
};
export default (data) => {
  return data.map((line) => {
    let arr = [];
    line.map((inner) => {
      inner.value.subscribe((val) => {
        arr.push(val);
      });
    });
    return {
      full: arr,
      duplicate: duplicates(arr),
      remains: remains(arr),
    };
  });
};

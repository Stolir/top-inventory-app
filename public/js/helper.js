function normalizeIntArray(array) {
  if (!Array.isArray(array)) throw new Error("Value must be an array.");

  return array.map((item) => {
    const num = Number(item); // convert string to number
    if (!Number.isInteger(num)) {
      throw new Error(`Invalid value: ${item}. Must be an integer.`);
    }
    return num;
  });
}

module.exports = { normalizeIntArray };

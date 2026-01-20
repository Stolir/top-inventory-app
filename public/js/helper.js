function normalizeTags(tags) {
  if (!Array.isArray(tags)) throw new Error("Tags must be an array.");

  return tags.map((tag) => {
    const num = Number(tag); // convert string to number
    if (!Number.isInteger(num)) {
      throw new Error(`Invalid tag value: ${tag}. Must be an integer.`);
    }
    return num;
  });
}

module.exports = { normalizeTags };

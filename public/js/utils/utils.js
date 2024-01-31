export const kebabCase = (str) =>
  str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
export const resetView = (i = 0) => (i = 1);
export const resetIndex = (i = 0) => (i = 1); // creates function to reset task index if needed

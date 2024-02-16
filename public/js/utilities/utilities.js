export const kebabCase = (str) =>
  str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase()
    .replaceAll('\'','')
    .replaceAll('+','_')
    .replaceAll('/','-')
    .replaceAll(':','-'); // function for applying kebab-case to a string
export const resetView = (i = 0) => (i = 1); // function for reseting the view index on demand
export const resetIndex = (i = 0) => (i = 1); // creates function to reset task index if needed
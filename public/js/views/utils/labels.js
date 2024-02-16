// Define a mapping from priority numbers to labels
const priorities = {
  3: 'Low',
  2: 'Med',
  1: 'High'
};

// Define a function to create a label for a given priority
const label = (priority) => {
  // Get the label name from the priorities mapping, defaulting to 'Low' if the priority is not found
  const labelName = priorities[priority] || 'Low';
  
  // Determine the color of the label based on the label name
  const color = labelName === 'Low' ? 'blue' : labelName === 'Med' ? 'orange' : 'red';
  
  // Return the HTML for the label
  return `<a href="#" class="btn btn-lite btn-${color}">${labelName}</a>`;
};

// Export the label function as the default export
export default label;
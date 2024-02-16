import app from '../app.js';
export const validateInput = (input, taskName) => {
    if (input.name === "name" && input.value !== taskName && app.tasks.some(task => task.name === input.value)) {
      setInvalidInput(input, "Please enter a unique task name");
      return false;
    }
    if (input.required && input.value === "") {
      setInvalidInput(input, `Please provide a ${input.name}`);
      return input.name !== "group" && input.name !== "category";
    }
    return true;
  };
  
  const setInvalidInput = (input, message) => {
    input.style.border = "1px solid red";
    input.value = "";
    input.placeholder = message;
  };
  
  const validateInputs = (inputs, taskName) => inputs.every((input) => validateInput(input, taskName));
  
  export const processInputs = (inputs, oldTask, updatedTask) => {
    if (validateInputs(inputs, oldTask ? oldTask.name : "")) {
      if (oldTask) {
        app.controller.updateTask(oldTask, updatedTask);
      } else {
        app.controller.addTask(updatedTask);
      }
    }
  };
  
  export default processInputs;
import app from '../app.js';
// const validateInput = (input) => {
//   if (
//     input.value !== task.name && input.name === "name" &&
//     app.tasks.filter((task) => task.name === input.value).length
//   ) {
//     input.style.border = "1px solid red";
//     input.value = "";
//     input.placeholder = "Please enter a unique task name";
//     return false;
//   }
//   if (input.required && input.value === "") {
//     input.style.border = "1px solid red";
//     input.placeholder = `Please provide a ${input.name}`;

//     if (input.name === "group" || input.name === "category") return;
//     return false;
//   }
// };
// const validateInputs = () =>
//   formInputs.map((input) => validateInput(input));
// if (validateInputs().includes(false)) return;
// else {
//   if (oldTask) app.controller.updateTask(oldTask, updatedTask);
//   else app.controller.addTask(updatedTask);
// }


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
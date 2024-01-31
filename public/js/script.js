import app from "./model/model.js";

// Initialize application with a title of Daily Task App
app.init('Daily Task App')

/**************************LOGGING EXAMPLES BELOW************************** */
console.log(app)
// (async function () {
//   // logs a successful creation of a task into the application
//   console.log(
//     app.controller.createTask(
//       "demonstrating the power of JavaScript Classes",
//       "Group Example I",
//       "Category",
//       "Daily",
//       [],
//       []
//     )
//   );
//   // demonstrates how to read a task after it has been created (select by the id)
//   console.log(app.controller.readTask(1));
//   // demonstrates how to update a task afer it has been created
//   console.log(
//     app.controller.updateTask(1, [
//       "harnessing the true versatility of that vanilla JS offers.",
//       "Team 4 Tasks",
//       "FrontEnd",
//       "Daily",
//       [],
//       [],
//     ])
//   );
//   // demonstrates how to delete a task using its id
//   console.log(app.controller.deleteTask(1));
//   // demonstrates how to seed the "database" with json file
//   // console.log(app.seed());
//   // demonstrates the successful retrieval of all tasks using the readAllTasks method on app
//   console.log(app.controller.readAllTasks());
//   // demonstrates the resetState function
//   console.log(app.resetState());
//   // demonstrates the init function which runs the resetState then seed function and generates sidebar also!
//   await app.init();
//   // demonstrates the use of returnByGroup for returning tasks within a particular group
//   console.log(app.controller.returnByGroup("STUDYING"));
//   // demonstrates the use of returnByCategory for returning tasks within a particular category
//   console.log(app.controller.returnByCategory("Node Js Course"));
//   // demonstrates the use of returnUniqueGroupNames
//   console.log(app.controller.returnUniqueGroupNames());
//   // demonstrates the use of returnUniqueCategoryNames
//   console.log(app.controller.returnUniqueCategoryNames());
//   // demonstrates the use of returnByUniqueGroups to get an array of separate array of task objects for each group
//   console.log(app.controller.returnUniqueGroupTasks());
//   // demonstrates the use of returnByUniqueCategories to get an array of separate array of task objects for each category
//   console.log(app.controller.returnUniqueCategoryTasks());
//   // demonstrates the use of createEle method to render html on demand
//   // new View(
//   //   "li",
//   //   "createEle Example",
//   //   document.body
//   // );

//   // demonstrate the ability to delete on demand
//   //app.views[0].delete();
//   //console.log(app.view.views);
//   // app.controller.init()
//   console.log(app.view);
//   //console.log(app.view.createView('div','content folks', document.body))
//   //setTimeout(console.log(app.view.views[0]), 10);
//   console.log(app.view.init("My Daily Checklist")); // Initialize application passing in a title of My Daily Checklist
// })();

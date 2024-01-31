// Object constructor to create new tasks:
import { app } from "../model.js";
let i = 1;
export default class Task {
  constructor(name, group, category, frequency, days, calendar) {
    this.id = `task_${i}`; // creates a task id for each task created
    i++; // increments task index
    this.name = name;
    this.group = group;
    this.category = category;
    this.frequency = frequency;
    this.days = days;
    this.calendar = calendar;
    this.complete = false;
    app.tasks.push(this);
  }
  read() {
    this.complete = false;
    return this;
  }
  // Method to update a task:
  update(name, group, category, frequency, days, calendar) {
    this.name = name;
    this.group = group;
    this.category = category;
    this.frequency = frequency;
    this.days = days;
    this.calendar = calendar;
    this.complete = false;
    return this;
  }
  // method to delete a task:
  delete() {
    let index = app.tasks.indexOf(this);
    if (index > -1) app.tasks.splice(index, 1);
    return app.tasks;
  }
}

import app from "../app.js";
//Object constructor to create new tasks:
export default class Task {
  constructor(name, group, category, frequency, days, calander, complete) {
    this.name = name;
    this.group = group;
    this.category = category;
    this.frequency = frequency;
    this.days = days;
    this.calander = calander;
    this.complete = complete || false;
    app.tasks.push(this);
  }
  read() {
    this.complete = false;
    return this;
  }
  //Function to create new tasks:
  update(updatedTask) {
    const { name, group, category, frequency, days, calander, complete } =
      updatedTask;
    this.name = name || this.name;
    this.group = group || this.group;
    this.category = category || this.category;
    this.frequency = frequency || this.frequency;
    this.days = days || this.days;
    this.calander = calander || this.calander;
    this.complete = complete || this.complete;
    return this;
  }

  archive() {
    app.tasks = app.tasks.filter((task) => task !== this);
    app.archive.push(this);
    // to disable auto-save after archive (delete) comment next line
    app.controller.saveData(false);
  }

  toggleComplete() {
    this.complete = !this.complete;
    // to disable auto-save after toggle complete comment next line
    app.controller.saveData(false);
    return this.complete;
  }
}

import app from "../app.js";
//Object constructor to create new tasks:
export default class Task {
    constructor(name, group, category, frequency, days, description, date, scheduledTime, priority, complete) {
      this.name = name;
      this.group = group;
      this.category = category;
      this.frequency = frequency;
      this.days = days;
      this.description = description || " ";
      this.date = date
      this.scheduledTime = scheduledTime
      this.priority = priority
      this.complete = complete
      app.tasks.push(this);
    }
    read() {
      this.complete = false;
      return this;
    }
    //Function to create new tasks:
    update(updatedTask) {
      const { name, group, category, frequency, days, description, date, scheduledTime, priority, complete } = updatedTask;
      this.name = name || this.name;
      this.group = group || this.group;
      this.category = category || this.category;
      this.frequency = frequency || this.frequency;
      this.days = days || this.days;
      this.description = description || this.description;
      this.date = date || this.date;
      this.scheduledTime = scheduledTime || this.scheduledTime;
      this.priority = priority || this.priority;
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

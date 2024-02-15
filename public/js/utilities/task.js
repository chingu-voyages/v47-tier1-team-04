import app from "../app.js";
//Object constructor to create new tasks:
export default class Task {
  constructor({
    name,
    group,
    category,
    frequency,
    days,
    description,
    date,
    scheduledTime,
    priority,
    complete,
  }) {
    this.name = name;
    this.group = group || "Ungrouped";//Line used when user doesn't add "group name" to newly added task
    this.category = category || "Uncategorized";//Line used when user doesn't add "category name" to newly added task
    this.frequency = frequency;
    this.days = days;
    this.description = description;
    this.date = date;
    this.scheduledTime = scheduledTime;
    this.priority = priority || '3';//1=high, 2=medium, 3=low
    this.complete = complete;//Brings in any completed data from localStorage or seed data
    app.tasks.push(this);//This line pushes our task to our task array, model keeps track of these tasks
  }
  read() {
    this.complete = false;
    return this;
  }
  //Function to create new tasks:
  update({
    name,
    group,
    category,
    frequency,
    days,
    description,
    date,
    scheduledTime,
    priority,
    complete,
  }) {
    this.name = name
    this.group = group || "Ungrouped";
    this.category = category || "Uncategorized";
    this.frequency = frequency || this.frequency;
    this.days = days || this.days;
    this.description = description || this.description;
    this.date = date || this.date;
    this.scheduledTime = scheduledTime || this.scheduledTime;
    this.priority = priority || "3";
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

  cyclePriority() {
    if(this.priority == 3){
      this.priority = 1
    } else {
      this.priority++;
    }
  }
}

import app from "../app.js";

// Object constructor to create new tasks:
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
    this.group = group || "Ungrouped"; // Line used when user doesn't add "group name" to newly added task
    this.category = category || "Uncategorized"; // Line used when user doesn't add "category name" to newly added task
    this.frequency = frequency;
    this.days = days;
    this.description = description;
    this.date = date;
    this.scheduledTime = scheduledTime;
    this.priority = priority || "3"; // 1=high, 2=medium, 3=low
    this.complete = complete; // Brings in any completed data from localStorage or seed data
    app.tasks.push(this); // This line pushes our task to our task array, model keeps track of these tasks
  }

  // Function to update existing tasks:
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
    this.name = name || 'New Task';
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

  // Archive the task:
  archive() {
    app.tasks = app.tasks.filter((task) => task !== this);
    app.archive.push(this);
    // to disable auto-save after archive (delete) comment next line
    app.controller.saveData(false);
  }

  // Toggle the complete status of the task:
  toggleComplete() {
    this.complete = !this.complete;
    // to disable auto-save after toggle complete comment next line
    app.controller.saveData(false);
  }

  // Set the task as complete:
  setComplete() {
    this.complete = true;
    app.controller.saveData(false);
  }

  // Set the task as incomplete:
  setIncomplete() {
    this.complete = false;
    app.controller.saveData(false);
  }

  // Cycle through the priority levels of the task:
  cyclePriority() {
    this.complete = false;
    if (this.priority == 3) {
      this.priority = 1;
    } else {
      this.priority++;
    }
  }
  
}

// Object constructor to create new tasks:
let id = 0;
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
    complete
  }) {
    if (!frequency) frequency = "Once"; // Line used when user doesn't add "frequency" to newly added task
    if (!date) date = new Date().toISOString().split('T')[0]; // Line used when user doesn't add "date" to newly added task
    if (!scheduledTime) scheduledTime = "00:00"; // Line used when user doesn't add "scheduled time" to newly added task
    if (!priority) priority = 3; // Line used when user doesn't add "priority" to newly added task
    if (!complete) complete = false; // Line used when user doesn't add "complete" to newly added task
    this.id = id++;
    this.name = name || 'New Task'; // Line used when user doesn't add "task name" to newly added task
    this.group = group || "Ungrouped"; // Line used when user doesn't add "group name" to newly added task
    this.category = category || "Uncategorized"; // Line used when user doesn't add "category name" to newly added task
    this.frequency = frequency;
    this.days = days;
    this.description = description;
    this.date = date;
    this.scheduledTime = scheduledTime;
    this.priority = priority
    this.complete = complete; // Brings in any completed data from localStorage or seed data
  }

  // Function to update existing tasks:
  update({
    name,
    group,
    category,
    frequency,
    description,
    date,
    days,
    scheduledTime,
    priority,
    complete,
  }) {
    if (!frequency) frequency = "Once"; // Line used when user doesn't add "frequency" to newly added task
    if (!date) date = new Date().toISOString().split('T')[0]; // Line used when user doesn't add "date" to newly added task
    if (!scheduledTime) scheduledTime = "00:00"; // Line used when user doesn't add "scheduled time" to newly added task
    if (!priority) priority = 3; // Line used when user doesn't add "priority" to newly added task
    if (!complete) complete = false; // Line used when user doesn't add "complete" to newly added task
    this.name = name || this.name;
    this.group = group || this.group;
    this.category = category || this.category;
    this.frequency = frequency || this.frequency;
    this.days = days || this.days;
    this.description = description || this.description;
    this.date = date || this.date;
    this.scheduledTime = scheduledTime || this.scheduledTime;
    this.priority = priority || this.priority || 3;
    this.complete = complete || this.complete;
    return this;
  }

  archive() {
    this.archived = true;
  }

  // Toggle the complete status of the task:
  toggleComplete() {
    this.complete = !this.complete;
  }

  // Set the task as complete:
  setComplete() {
    this.complete = true;
  }

  // Set the task as incomplete:
  setIncomplete() {
    this.complete = false;
  }

  // Cycle through the priority levels of the task:
  cyclePriority() {
    this.complete = false;
    if (this.priority === 3) {
      this.priority = 1;
    } else {
      this.priority++;
    }
  }
  
}

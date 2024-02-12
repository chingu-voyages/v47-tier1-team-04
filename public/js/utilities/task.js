import app from '../app.js';
//Object constructor to create new tasks:
export default class Task {
    constructor(name, group, category, frequency, days, description, date, scheduledTime, complete) {
      this.name = name;
      this.group = group;
      this.category = category;
      this.frequency = frequency;
      this.days = days;
      this.description = description;
      this.date = date || `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, "0")}-${new Date().getDate()}`;
      this.scheduledTime = scheduledTime || new Date().toLocaleTimeString();
      this.complete = complete || false;
      app.tasks.push(this);
    }
    read() {
      this.complete = false;
      return this;
    }
    //Function to create new tasks:
    update(updatedTask) {
      const { name, group, category, frequency, days, description, date, scheduledTime, complete } = updatedTask;
      this.name = name || this.name;
      this.group = group || this.group;
      this.category = category || this.category;
      this.frequency = frequency || this.frequency;
      this.days = days || this.days;
      this.description = description || this.description;
      this.date = date || this.date;
      this.scheduledTime = scheduledTime || this.scheduledTime;
      this.complete = complete || this.complete;
      return this;
    }

    toggleComplete() {
      this.complete = !this.complete;
      
      // to enable auto-save uncomment next line  
      // app.controller.saveData();
      return this.complete;
    }

  }
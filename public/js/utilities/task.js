import app from '../app.js';
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
      const {name, group, category, frequency, days, calander, complete} = updatedTask;
      this.name = name || this.name;
      this.group = group || this.group;
      this.category = category || this.category;
      this.frequency = frequency || this.frequency;
      this.days = days || this.days;
      this.calander = calander || this.calander;
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
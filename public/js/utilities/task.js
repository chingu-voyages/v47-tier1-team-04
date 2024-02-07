import app from '../app.js';
//Object constructor to create new tasks:
export default class Task {
    constructor(name, group, category, frequency, days, calander) {
      this.name = name;
      this.group = group;
      this.category = category;
      this.frequency = frequency;
      this.days = days;
      this.calander = calander;
      this.complete = false;
      app.tasks.push(this);
    }
    read() {
      this.complete = false;
      return this;
    }
    //Function to create new tasks:
    update(name, group, category, frequency, days, calander) {
      this.name = name;
      this.group = group;
      this.category = category;
      this.frequency = frequency;
      this.days = days;
      this.calander = calander;
      this.complete = false;
      return this;
    }
  }
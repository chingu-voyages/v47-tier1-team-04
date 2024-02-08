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
    update(name, group, category, frequency, days, calander, complete) {
      this.name = name;
      this.group = group;
      this.category = category;
      this.frequency = frequency;
      this.days = days;
      this.calander = calander;
      this.complete = complete;
      return this;
    }

    toggleComplete() {
      this.complete = !this.complete;
      let savedUserData = JSON.parse(localStorage.getItem('savedUserData'));

      for (let i = 0; i < savedUserData.length; i++){
        if (savedUserData[i].name == this.name){
          savedUserData[i].complete = this.complete;
        }
      }

      localStorage.setItem('savedUserData', JSON.stringify(savedUserData));
      return this.complete;
    }

  }
import { app } from "../model/model.js";
import { kebabCase } from "../utils/utils.js";
let i = 1; // sets view index to 1;
export default class View {
  constructor(ele, content, anchor, id, classList) {
    const element = document.createElement(ele);
    element.innerHTML = content;
    if (id) {
      element.id = id;
      this.id = id;
    } else {
      element.id = `view_${i}`;
      this.id = i;
      i++;
    }
    if (classList) element.classList = classList;
    anchor.append(element);
    this.element = element;
    return this;
  }
  createView(ele, content, anchor, id, classList) {
    app.views.push(this);
    return new View(ele, content, anchor, id, classList);
  }
  init(title) {
    this.renderAside(title);
    this.renderNavbar();
  }
  renderAside(title) {
    const aside = this.createView(
      "aside",
      `<div class="avatar-area">
          <div class="avatar">
            <img
              src="./img/Friendly Ones Avatar and Backdrop.png"
              alt="avatar pict"
            />
          </div>
          <div class="gear-icon">
            <img src="./img/solar_settings-linear.svg" alt="gear icon" />
          </div>
        </div>
        <h2>${title}</h2>
        <div id="daily-checklist">
        </div>
        </div>`,
      document.getElementById("app"),
      "aside-el",
      "aside"
    );
    app.controller.returnUniqueGroupNames().map((group) => {
      app.view.createView(
        "div",
        `
            <h3>${group} <i class="fa-solid fa-circle-chevron-down"></i></h3>
              <ul id="${kebabCase(group)}">
              </ul>
            `,
        document.getElementById("daily-checklist"),
        null,
        "activity"
      );
      app.controller
        .returnUniqueCategoriesByGroup(group)
        .map((category) =>
          app.view.createView(
            "li",
            category,
            document.getElementById(kebabCase(group))
          )
        );
    });
    return aside;
  }
  renderNavbar() {
    return this.createView(
      "nav",
      `
      <div class="navbar-top">
          <i class="fa-solid fa-bars menu-btn fa-2x" id="menu-btn"></i>
          <div id="date" class="date">Today:</div>
          <div class="btn-undo">
            <button class="btn undo">
              <img src="./img/ci_undo.svg" alt="undo button" />
              undo
            </button>
            <button class="btn undo">
              <img src="./img/ci_redo.svg" alt="redo button" />
              undo
            </button>
            <a href="#" class="btn btn-save">Save</a>
          </div>
        </div>
        <div class="navbtn">
          <a href="#" class="btn-day">Today</a>
          <a href="#" class="btn-month">Month</a>
          <a href="#" class="btn-year">Year</a>
        </div>`,
      document.getElementById("app"),
      "navbar",
      "navbar"
    );
  }
  deleteEle(id) {
    return document.getElementById(id).remove();
  }
  delete() {
    let index = this.views.indexOf(this);
    if (index > -1) {
      this.element.remove();
      this.views.splice(index, 1);
    }
    return this.views;
  }
}

import { Component } from "react";
import "./styles/css/main.css";
import Aside from "./components/Aside";
import NavBar from "./components/NavBar";
import Content from "./components/Content";
import Footer from "./components/Footer";
import AddTaskButton from "./components/AddTaskButton";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [{ group: "Ungrouped", category: "Uncategorized", name: "" }],
      groups: [],
      categories: [],
      darkMode: false,
    };
  }
  toggleDarkMode = () => {
    console.log(this.state);
    this.setState({ darkMode: !this.state.darkMode });
    if (this.state.darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };
  setGroups = (tasks) =>
    this.setState({
      groups: [...new Set(tasks.map((task) => task.group))],
    });
  setCategories = (tasks) =>
    this.setState({
      categories: [...new Set(tasks.map((task) => task.category))],
    });
  async seed() {
    const response = await fetch("./data/data.model.json");
    const data = await response.json();
    this.setState({ tasks: data });
    this.setGroups(data);
    this.setCategories(data);
  }
  async loadData() {
    let storage, parsedStorage, state; // Defining some temp variables
    if (localStorage) {
      storage = localStorage.getItem("savedUserData"); // Checks if we have local storage and gets it if we do
      if (storage && JSON.parse(storage).state && JSON.parse(storage).state) {
        state = JSON.parse(storage).state;
        this.state = state; // If we have state, we set it to the app state
      }
      if (this.state.darkMode) document.body.classList.add("dark-mode");
    }
    if (storage) parsedStorage = JSON.parse(storage).tasks; // Getting the saved data from local storage
    // This is a ternary statement that maps over storage and creates a new task or calls this.seed if there is no local data stored
    parsedStorage ? this.setState({ tasks: parsedStorage }) : await this.seed();
  }
  componentDidMount() {
    this.loadData();
  }
  render() {
    return (
      <div className="container">
        <Aside groups={this.state.groups} />
        <NavBar toggleDarkMode={this.toggleDarkMode} />
        <Content tasks={this.state.tasks} />
        <Footer />
        <AddTaskButton />
      </div>
    );
  }
}

export default App;

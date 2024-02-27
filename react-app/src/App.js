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
  componentDidMount() {
    this.seed();

    console.log(this.state);
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

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
      darkMode: false,
    };
  }
  toggleDarkMode = () => {
    this.setState({ darkMode: !this.state.darkMode });
    if (this.state.darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };
  render() {
    return (
      <div className="container">
        <Aside />
        <NavBar toggleDarkMode={this.toggleDarkMode} />
        <Content />
        <Footer />
        <AddTaskButton />
      </div>
    );
  }
}

export default App;

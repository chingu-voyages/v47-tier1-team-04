import "./styles/css/main.css";
import Aside from "./components/aside";
import NavBar from "./components/NavBar";
import Content from "./components/content";
import Footer from "./components/Footer";
import AddTaskButton from "./components/AddTaskButton";

function App() {
  return (
    <div className="App">
      <Aside />
      <NavBar />
      <Content />
      <Footer />
      <AddTaskButton />
    </div>
  );
}

export default App;

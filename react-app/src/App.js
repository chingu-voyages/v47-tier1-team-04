import { useState, useEffect } from "react";
import "./styles/css/main.css";
import Aside from "./components/Aside";
import NavBar from "./components/NavBar";
import Content from "./components/Content";
import Footer from "./components/Footer";
import AddTaskButton from "./components/AddTaskButton";

const App = () => {
  const [tasks, setTasks] = useState([
    { group: "Ungrouped", category: "Uncategorized", name: "" },
  ]);
  const [groups, setGroups] = useState([]);
  const [categories, setCategories] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    if (!darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    setDarkMode(!darkMode);
  };

  const updateGroups = (tasks) => {
    setGroups([...new Set(tasks.map((task) => task.group))]);
  };

  const updateCategories = (tasks) => {
    setCategories([...new Set(tasks.map((task) => task.category))]);
  };

  const seed = async () => {
    const response = await fetch("./assets/data/data.model.json");
    const data = await response.json();
    setTasks(data);
    updateGroups(data);
    updateCategories(data);
  };

  const loadData = async () => {
    if (localStorage && localStorage.savedUserData) {
      const storage = localStorage.getItem("savedUserData");
      if (storage) {
        const state = JSON.parse(storage);
        setTasks(state.tasks);
        setDarkMode(state.darkMode);
        updateGroups(state.tasks);
        updateCategories(state.tasks);
        if (state.darkMode) document.body.classList.add("dark-mode");
      }
    }
    const parsedStorage = JSON.parse(
      localStorage.getItem("savedUserData")
    ).tasks;
    parsedStorage ? setTasks(parsedStorage) : await seed();
  };

  const saveData = () => {
    alert("saved data");
    localStorage.setItem("savedUserData", JSON.stringify({ tasks, darkMode }));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
      <Aside groups={groups} categories={categories} />
      <NavBar toggleDarkMode={toggleDarkMode} saveApp={saveData} />
      <Content tasks={tasks} />
      <Footer />
      <AddTaskButton />
    </div>
  );
};

export default App;

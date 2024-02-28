import { useState, useEffect } from "react";
import "./styles/css/main.css";
import Aside from "./components/Aside";
import NavBar from "./components/NavBar";
import Content from "./components/Content";
import Footer from "./components/Footer";
import AddTaskButton from "./components/AddTaskButton";

const App = () => {
  const [title, setTitle] = useState("Daily Checklist");
  const [avatar, setAvatar] = useState('');
  const [tasks, setTasks] = useState([{ group: "", category: "", name: "" }]);
  const [groups, setGroups] = useState([]);
  const [categories, setCategories] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const state = { title, avatar, tasks, darkMode };
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
      if (JSON.parse(storage)) {
        const state = JSON.parse(storage);
        if (state.tasks) {
          setTasks(state.tasks);
          setTitle(state.title);
          setAvatar(state.avatar);
          updateGroups(state.tasks);
          updateCategories(state.tasks);
        }
        setDarkMode(state.darkMode);

        if (state.darkMode) document.body.classList.add("dark-mode");
      }
    }

    const parsedStorage = localStorage.savedUserData
      ? JSON.parse(localStorage.getItem("savedUserData")).tasks
      : null;

    parsedStorage ? setTasks(parsedStorage) : await seed();
  };

  const saveData = () => {
    localStorage.setItem("savedUserData", JSON.stringify(state));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
      <Aside
        title={title}
        setTitle={setTitle}
        groups={groups}
        categories={categories}
        avatar={avatar}
        setAvatar={setAvatar}
      />
      <NavBar toggleDarkMode={toggleDarkMode} saveApp={saveData} />
      <Content tasks={tasks} />
      <Footer />
      <AddTaskButton />
    </div>
  );
};

export default App;

import { useState, useEffect } from "react";
import Aside from "./components/Aside";
import NavBar from "./components/NavBar";
import Content from "./components/Content/Content";
import Footer from "./components/Footer";
import AddTaskButton from "./components/AddTaskButton";

const App = () => {
  const [title, setTitle] = useState("Daily Checklist");
  const [avatar, setAvatar] = useState('');
  const [tasks, setTasks] = useState([{ group: "", category: "", name: "" }]);
  const [groups, setGroups] = useState([]);
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

  const seed = async () => {
    const response = await fetch("./assets/data/data.model.json");
    const data = await response.json();
    setTasks(data);
    updateGroups(data);
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

      <Aside groups={groups} tasks={tasks} title={title} setTitle={setTitle} avatar={avatar} setAvatar={setAvatar} />
      <NavBar toggleDarkMode={toggleDarkMode} saveApp={saveData} />
      <Content tasks={tasks} />
      <Footer />
      <AddTaskButton />
    </div>
  );
};

export default App;

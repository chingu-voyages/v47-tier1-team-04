import { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import Task from "./utils/task";
import Aside from "./components/Aside/Aside";
import NavBar from "./components/NavBar/NavBar";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import AddTaskButton from "./components/Buttons/AddTaskButton";

const App = () => {
  const [title, setTitle] = useState("Daily Checklist");
  const [avatar, setAvatar] = useState("");
  const [tasks, setTasks] = useState([]);
  const [archive, setArchive] = useState([]);
  const [groups, setGroups] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const state = { title, avatar, tasks, darkMode };
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  useEffect(
    () => setGroups([...new Set(tasks.map((task) => task.group))]),
    [tasks]
  );
  const toggleDarkMode = () => {
    if (!darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    setDarkMode(!darkMode);
  };

  const updateGroups = () => {
    setGroups([...new Set(tasks.map((task) => task.group))]);
  };

  const seed = async () => {
    const response = await fetch("./assets/data/data.model.json");
    const data = await response.json();
    const tasks = data.map((task) => new Task(task));
    setTasks(tasks);
    updateGroups();
  };

  const loadData = async () => {
    if (localStorage && localStorage.savedUserData) {
      const storage = localStorage.getItem("savedUserData");
      if (JSON.parse(storage)) {
        const state = JSON.parse(storage);
        if (state.tasks) {
          const tasks = state.tasks.map((task) => new Task(task));
          setTasks(tasks);
          setTitle(state.title);
          setAvatar(state.avatar);
          updateGroups(tasks);
        }
        setDarkMode(state.darkMode);

        if (state.darkMode) document.body.classList.add("dark-mode");
      }
    }

    const parsedStorage = localStorage.savedUserData
      ? JSON.parse(localStorage.getItem("savedUserData")).tasks
      : null;

    parsedStorage
      ? setTasks(parsedStorage.map((newTask) => new Task(newTask)))
      : await seed();
  };

  const saveData = () => {
    if (state !== null && state !== undefined && state.tasks.length > 0)
      localStorage.setItem("savedUserData", JSON.stringify(state));
  };

  const addTask = (task) => {
    const updatedTasks = [...tasks, new Task(task)];
    setTasks(updatedTasks);
    updateGroups();
  };
  const cyclePriority = (task) => {
    console.log("cyclePriority", task);
    const updatedTasks = tasks.map((t) => {
      if (t.id === task.id) {
        t.cyclePriority();
      }
      return t;
    });
    setTasks(updatedTasks);
    updateGroups();
  };
  const archiveTask = (task) => {
    const updatedTasks = tasks.filter((t) => t.id !== task.id);
    task.archive();
    setTasks(updatedTasks);
    setArchive([...archive, task]);
    updateGroups();
  };
  const updateTask = (oldTask, newTask) => oldTask.update(newTask);
  const toggleCompleteTask = (task) => {
    const updatedTasks = tasks.map((t) => {
      if (t.id === task.id) {
        t.toggleComplete();
      }
      return t;
    });
    setTasks(updatedTasks);
    updateGroups();
  };
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    updateGroups();
  }, [tasks]);

  useEffect(() => saveData(), [groups]);
  return (
    <div className="container">
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="description" content="V47 Chingu Voyage" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="keywords"
          content="HTML, CSS, JavaScript, chingu, git, github, calendar, to-do app, task tracker"
        />
        <meta
          name="author"
          content="V47 Chingu Voyage Team 4 - Amanda Libbey, Emmett Pennington, Jayanti Neu, Mikey Nichols, Stacy Riley, Tasneem Wakil"
        />
        <meta name="robots" content="index, follow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <title>{title}</title>
      </Helmet>
      <Aside
        groups={groups}
        tasks={tasks}
        title={title}
        setTitle={setTitle}
        avatar={avatar}
        setAvatar={setAvatar}
        saveData={saveData}
      />
      <NavBar toggleDarkMode={toggleDarkMode} saveApp={saveData} />
      <Content
        cyclePriority={cyclePriority}
        saveData={saveData}
        tasks={tasks}
        groups={groups}
        archiveTask={archiveTask}
        updateTask={updateTask}
        updateGroups={updateGroups}
        toggleCompleteTask={toggleCompleteTask}
        addTask={addTask}
        forceUpdate={forceUpdate}
      />
      <Footer darkMode={darkMode} />
      <AddTaskButton
        updateGroups={updateGroups}
        tasks={tasks}
        addTask={addTask}
        saveData={saveData}
      />
    </div>
  );
};

export default App;

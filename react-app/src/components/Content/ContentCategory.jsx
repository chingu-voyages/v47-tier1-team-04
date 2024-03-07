import { useState, useRef, useEffect, useCallback } from "react";
import ContentTask from "./ContentTask";
import Task from "../../utils/task";

import ellipse from "../../images/Ellipse8.svg";
import formatString from "../../utils/formatString";
import pencil from "../../images/mynaui_pencil.svg";
import trash from "../../images/ph_trash.svg";
function QuickTask({
  category,
  group,
  addTask,
  toggleCompleteTask,
  cyclePriority,
  archiveTask,
  updateGroups,
  forceUpdate,
}) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const renderEditModal = () => setShowEditModal(true);
  const renderViewModal = () => setShowViewModal(true);
  const [task, setTask] = useState({});
  const quickTaskRef = useRef(null);

  const handleChange = (e) => {
    setTask({ name: e.target.value });
  };
  const handleAddTask = (quickTaskName) => {
    addTask(new Task({ name: quickTaskName, category, group, priority: 3 }));
  };
  useEffect(() => {}, [task]);
  useEffect(() => {
    quickTaskRef.current.focus();
    quickTaskRef.current.addEventListener("blur", (e) => {
      if (e.target.innerText !== "") {
        e.target.contentEditable = false;
        handleAddTask(e.target.innerText);
        forceUpdate();
      }
    });
    quickTaskRef.current.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        if (e.target.innerText !== "") {
          e.target.contentEditable = false;
          handleAddTask(e.target.innerText);
          forceUpdate();
        }
      }
    });
  }, [quickTaskRef]);

  return (
    <div className="content-description">
      <div className="task-name" onClick={() => toggleCompleteTask(task)}>
        <i className="fa-regular checkbox fa-square" />
        <p
          className="inline-block"
          contentEditable="true"
          suppressContentEditableWarning={true}
          ref={quickTaskRef}
          onChange={(e) => handleChange(e)}
        >
          &nbsp;{" "}
        </p>
      </div>
      <div className="task-icons">
        <i
          className={`fa fa-circle task-priority-3`}
          aria-hidden="true"
          onClick={() => cyclePriority(task)}
        />
        <i
          className="fa-solid fa-circle-info fa-2x detail"
          onClick={() => renderViewModal()}
        />
        <img
          src={pencil}
          alt="edit pencil"
          className="icon-update"
          onClick={() => renderEditModal()}
        />
        <img
          src={trash}
          alt="delete trash can"
          className="icon-edit"
          onClick={() => archiveTask(task)}
        />
      </div>
    </div>
  );
}
function ContentCategory({
  group,
  category,
  updateGroups,
  saveData,
  archiveTask,
  updateTask,
  tasks,
  cyclePriority,
  toggleCompleteTask,
  addTask,
  forceUpdate,
}) {
  const [showQuickTask, setShowQuickTask] = useState(false);
  const [categoryTasks, setCategoryTasks] = useState(
    tasks.filter((task) => task.group === group && task.category === category)
  );
  const [editCategory, setEditCategory] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const categoryRef = useRef(null);
  useEffect(() => {
    const catRef = categoryRef.current;

 
    catRef.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        if (e.target.innerText !== "") {
          categoryTasks.forEach((task) => {
            const oldTask = task;
            const newTask = { ...task, category: e.target.innerText };
            updateTask(oldTask, newTask);
            e.target.innerText = newTask.category;
              setEditCategory(false);
            forceUpdate();
            saveData();
          });
        }
      }
    });

    catRef.addEventListener("blur", (e) => {
      if (e.target.innerText !== "") {
        categoryTasks.forEach((task) => {
          const oldTask = task;
          const newTask = { ...task, category: e.target.innerText };
          updateTask(oldTask, newTask);
          e.target.innerText = newTask.category;
    
          setEditCategory(false);
          forceUpdate();
          saveData();
        });
      }
    });
  }, [categoryRef]);
  const renderEditModal = () => setShowEditModal(true);
  const renderViewModal = () => setShowViewModal(true);
  const [categoryTask, setCategoryTask] = useState(categoryTasks[0]);
  const quickTaskRef = useRef(null);
  if (!categoryTasks.every((task) => task.archived))
    return (
      <div
        className="content-main"
        id={`category_${formatString(categoryTask.category)}`}
      >
        <img src={ellipse} alt="ellipse checkbox" className="ellipse" />
        <div className="content-inner">
          <div className="content-task">
            <h3
              className="activity"
              suppressContentEditableWarning={editCategory}
              ref={categoryRef}
              contentEditable={editCategory}
              focus={editCategory}
            >
              {categoryTask.category}
            </h3>
            <i
              className="fa fa-solid fa-edit"
              onClick={() => setEditCategory(true)}
            />
            <i
              className="fa-solid fa-plus add-task"
              onClick={() => setShowQuickTask(true)}
            />
          </div>
          {categoryTasks.map((task, index) => {
            if (!task.archived)
              return (
                <ContentTask
                  saveData={saveData}
                  key={index}
                  task={task}
                  archiveTask={archiveTask}
                  updateTask={updateTask}
                  addTask={addTask}
                  tasks={tasks}
                  updateGroups={updateGroups}
                  cyclePriority={cyclePriority}
                  toggleCompleteTask={toggleCompleteTask}
                />
              );
          })}
          {showQuickTask && (
            <QuickTask
              ref={quickTaskRef}
              category={category}
              group={group}
              addTask={addTask}
              cyclePriority={cyclePriority}
              renderViewModal={renderViewModal}
              renderEditModal={renderEditModal}
              archiveTask={archiveTask}
              toggleCompleteTask={toggleCompleteTask}
              updateGroups={updateGroups}
              forceUpdate={forceUpdate}
            />
          )}
        </div>
      </div>
    );
}

export default ContentCategory;

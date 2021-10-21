import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Task from "../components/Task/Task";
import s from "./TasksPage.module.css";
import Popup from "../components/Popup/Popup";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../store/reducers/tasksReducer";
import { deleteSelectedTasks } from "../store/reducers/tasksReducer";
import { ACTIVE_PAGE, COMPLETED_PAGE } from "../consts/consts";
import { selectAllTasks } from "../helpers/helpers";
function TasksPage({ userId }) {
  const dispatch = useDispatch();
  const [selectedPage, setSelectedPage] = useState(ACTIVE_PAGE);
  const [isSort, setIsSort] = useState(false);
  const [tasksToDelete, setTasksToDelete] = useState({
    indices: [],
    identifiers: [],
    page: selectedPage,
  });
  const { activeTasks, completedTasks } = useSelector((store) => store.tasks);
  useEffect(() => {
    dispatch(getTasks(userId));
  }, [userId, dispatch]);
  const [popupVisible, setPopupVisible] = useState(false);
  const tasksToShow =
    selectedPage === ACTIVE_PAGE ? activeTasks : completedTasks;
  useEffect(() => {
    setTasksToDelete({ indices: [], identifiers: [], page: selectedPage });
  }, [tasksToShow]);
  const unselectAllTasks = () => {
    if (ACTIVE_PAGE) {
      setTasksToDelete({ indices: [], identifiers: [], page: selectedPage });
    }
  };
    
  return (
    <div>
      <div class='d-flex align-items-center mt-3 justify-content-center'>
        <select
          onChange={(e) => {
            setSelectedPage(e.target.value);
          }}
          class='form-select form-select-sm  col-2'
          aria-label='.form-select example col-2'>
          <option value={ACTIVE_PAGE} selected>
            All active
          </option>
          <option value={COMPLETED_PAGE}>All completed</option>
        </select>
        <select
          onChange={(e) => {
            setIsSort(!isSort);
          }}
          class='form-select form-select-sm  col-2 offset-1'
          aria-label='.form-select example col-2'>
          <option value='' selected>
            Sort by default
          </option>
          <option value=''>Sort by title</option>
        </select>
        <div class='col-6  btns-container d-flex justify-content-center'>
          <button
            onClick={() => setPopupVisible(!popupVisible)}
            type='button'
            id='create-task'
            class='btn btn-success'>
            Create Task
          </button>
          <button
            onClick={() => {
              dispatch(
                deleteSelectedTasks(userId, tasksToDelete, selectedPage)
              );
              setTasksToDelete({
                indices: [],
                identifiers: [],
                page: selectedPage,
              });
            }}
            disabled={!tasksToDelete.indices.length}
            type='button'
            class='btn btn-danger col-3'>
            Delete selected tasks
          </button>
          <button
            onClick={() => {
              selectAllTasks(selectedPage, tasksToShow, tasksToDelete, setTasksToDelete);
            }}
            type='button'
            class='btn btn-danger col-3'>
            Check all {selectedPage} tasks
          </button>
          <button
            disabled={!tasksToDelete.indices.length}
            onClick={() => {
              unselectAllTasks()
            }}
            type='button'
            class='btn btn-secondary col-3'>
            Uncheck all {selectedPage} tasks
          </button>
        </div>
      </div>
      <Popup popupVisible={popupVisible} setPopupVisible={setPopupVisible} />
      <h3 class='mb-3 mt-5'>Все {selectedPage} таски</h3>
      <div class='d-flex justify-content-between col-12 flex-row flex-wrap'>
        {tasksToShow && isSort
          ? tasksToShow
              .slice()
              .sort(function (a, b) {
                if (a.title > b.title) {
                  return 1;
                }
                if (a.title < b.title) {
                  return -1;
                }
                return 0;
              })
              .map((task, i) => {
                return (
                  <Task
                    selected={tasksToDelete.indices.includes(i)}
                    tasksToDelete={tasksToDelete}
                    setTasksToDelete={setTasksToDelete}
                    uId={task.uId}
                    title={task.title}
                    index={i}
                  />
                );
              })
          : tasksToShow.map((task, i) => {
              return (
                <Task
                  selected={tasksToDelete.indices.includes(i)}
                  tasksToDelete={tasksToDelete}
                  setTasksToDelete={setTasksToDelete}
                  uId={task.uId}
                  title={task.title}
                  index={i}
                />
              );
            })}
      </div>
      <div className={s.button__actions}></div>
    </div>
  );
}

TasksPage.propTypes = {};

export default TasksPage;
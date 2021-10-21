import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { setCurrentTask } from "../../store/reducers/tasksReducer";

const CurrentTaskInfopage = () => {
  const location = useLocation();
  const uId = +location.pathname.split("/")[3];
  const dispatch = useDispatch(); 
  useEffect(() => {
    dispatch(setCurrentTask(uId));
  }, []);
  const { title, priority, dueDate, description, status } = useSelector(
    (store) => store.tasks.currentTask
  );
  return (
    <div class='card'>
      <div class='card-body'>
        <h5 class='card-title'>Task Name : {title}</h5>
        <h6 class='card-subtitle mb-2 text-muted'>
          Description : {description}
        </h6>
        <p class='card-text'>
          Cтатус таска : {status ? "Выполнен" : "В активном состоянии"}
        </p>
        <p class='card-text'>Due Date : {Date(dueDate).toLocaleString()}</p>
        <p class='card-text'>Priority : {priority?.priority}</p>
      </div>
    </div>
  );
};

export default CurrentTaskInfopage;

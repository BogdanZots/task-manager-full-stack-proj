/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import s from "./Task.module.css";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../store/reducers/tasksReducer";
import { setCurrentTask } from "../../store/reducers/tasksReducer";
function Task({
  setTasksToDelete,
  tasksToDelete,
  selectedToDelete,
  title,
  uId,
  selected,
  userId,
  index,
}) {
  const dispatch = useDispatch();
  return (
    <div class='d-flex d-flex justify-content-start align-items-center card task col-3'>
      <div class='col-12 .task-container  d-flex flex-column align-items-center card-body '>
        <div class='col-8 d-flex justify-content-center mb-3'>
          <Link to={`/tasks/current-task-info/${uId}`}>
            <h5 class='card-title'>{title}</h5>
          </Link>
          <div class='col-1 mb-3 form-check-special'>
            <div class='form-check d-flex justify-content-start'>
              <input
                class='form-check-input'
                type='checkbox'
                id='gridCheck'
                checked={selected}
                onChange={(e) => {
                  if (tasksToDelete.indices.includes(index)) {
                    const unselectedIndices = tasksToDelete.indices.filter(taskIndex=>taskIndex !== index)
                    const unselectedIdentifiers = tasksToDelete.identifiers.filter(taskId=>taskId !== uId)
                     setTasksToDelete({
                      indices: unselectedIndices,
                      identifiers: unselectedIdentifiers,
                    }); 
                    return
                  }
                  setTasksToDelete({
                    indices: [...tasksToDelete.indices, index],
                    identifiers: [...tasksToDelete.identifiers, uId],
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div class='task__btns d-flex justify-content-center col-4'>
          <Link to={`/tasks/task-edit/${uId}`}>
            <button
              type='button'
              className={s.btn__edit}
              class='btn btn-primary'>
              Edit
            </button>
          </Link>
          <button
            onClick={() => dispatch(deleteTask(uId))}
            type='button'
            class='btn btn-danger'>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

Task.propTypes = {};

export default Task;

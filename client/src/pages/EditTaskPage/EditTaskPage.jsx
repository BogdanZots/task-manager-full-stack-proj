import React, { useState } from "react";
import { useEffect } from "react";
import CustomDatePicker from "../../components/DatePicker/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { setCurrentTask } from "../../store/reducers/tasksReducer";
import { changeCurrentTask } from "../../store/reducers/tasksReducer";
import { checkInputFields } from "../../helpers/helpers";
const EditTaskPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const taskId = +location.pathname.split("/")[3];
  const { uId } = useSelector((store) => store.user);

  const { title, description, dueDate, priority, status } = useSelector(
    (store) => store.tasks.currentTask
  );
  useEffect(() => {
    dispatch(setCurrentTask(taskId));
    setTitle(title);
    setDesc(description);
    setDueDate(dueDate);
    setPriority(priority?.priority);
    setStatus(status);
  }, [title, description, taskId, dueDate , priority?.priority]);
  const [editTitle, setTitle] = useState(title);
  const [editDescription, setDesc] = useState(description);
  const [editDueDate, setDueDate] = useState(dueDate);
  const [editPriority, setPriority] = useState(priority);
  const [editStatus, setStatus] = useState(status);
  const editedTaskData = {
    title: editTitle,
    description: editDescription,
    dueDate: editDueDate,
    userId: uId,
    status: editStatus,
    priority: { priority: +editPriority, user: uId },
  };
  return (
    <>
      <form class='d-flex flex-column align-items-center justify-content-center col-12 row g-3'>
        <div class='col-md-2'>
          <label for='Title' class='form-label'>
            Title
          </label>
          <input
            type='text'
            class='form-control'
            id='Title'
            value={editTitle}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div class='col-md-2'>
          <label for='Title' class='form-label'>
            Description
          </label>
          <input
            type='text'
            class='form-control'
            id='Title'
            value={editDescription}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div class='col-md-2'>
          <label for='Title' class='form-label'>
            Priority
          </label>
          <input
            type='text'
            class='form-control'
            id='Title'
            value={editPriority}
            onChange={(e) => setPriority(e.target.value)}
          />
        </div>
        <div class='col-2 mb-3'>
          <div class='form-check d-flex justify-content-start'>
            <input
              checked={editStatus}
              class='form-check-input'
              type='checkbox'
              id='gridCheck'
              onChange={(e) => setStatus(!editStatus)}
            />
            <label class='form-check-label col-12' for='gridCheck'>
              Change status
            </label>
          </div>
        </div>
        <div class='col-md-2'>
          <CustomDatePicker dueDate={editDueDate} setDueDate={setDueDate} />
        </div>
        <div class='col-2 d-flex justify-content-start'>
          <button
            disabled={
              !checkInputFields(
                editTitle,
                editDescription,
                editDueDate,
                +editPriority
              )
            }
            type='d-flex'
            class='btn btn-secondary'
            onClick={(e) => {
              e.preventDefault();
              dispatch(changeCurrentTask(taskId, editedTaskData));
            }}>
            Save changes
          </button>
        </div>
      </form>
    </>
  );
};

export default EditTaskPage;

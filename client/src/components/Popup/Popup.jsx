import React, { useState } from "react";
import { useEffect } from "react";
import s from "./Popup.module.css";
import CustomDatePicker from "../DatePicker/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../store/reducers/tasksReducer";
import { checkInputFields } from "../../helpers/helpers";
const Popup = ({ popupVisible, setPopupVisible }) => {
  const { uId } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState(null);
  const newTaskData = {
    title,
    description,
    dueDate,
    userId: uId,
    status: false,
    priority: { priority: +priority, user: uId },
  };
  return (
    <>
      {popupVisible ? (
        <div
          class='modal'
          id='modalForm'
          tabindex='-1'
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'>
          <div class='modal-dialog'>
            <div class='modal-content'>
              <div class='modal-header'>
                <h5 class='modal-title' id='exampleModalLabel'>
                  Описание новой задачи
                </h5>
                <button
                  onClick={() => setPopupVisible(false)}
                  type='button'
                  class='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'></button>
              </div>
              <div class='modal-body'>
                <form>
                  <div class='mb-3'>
                    <label class='form-label'>Title</label>
                    <textarea
                      title={title}
                      onChange={(e) => setTitle(e.target.value)}
                      type='text'
                      class='form-control'
                      placeholder='Title'
                    />
                  </div>
                  <div class='mb-3'>
                    <label class='form-label'>Describe task</label>
                    <textarea
                      description={description}
                      onChange={(e) => setDesc(e.target.value)}
                      type='text'
                      class='form-control'
                      placeholder='Describe'
                    />
                  </div>
                </form>
                <CustomDatePicker dueDate={dueDate} setDueDate={setDueDate} />
                <div class='col-6 d-flex justify-content-start flex-column align-start'>
                  <label class='form-label'>Впишите приоритетность</label>
                  <input
                    priority={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    type='text'
                    class='form-control'
                    placeholder='Priority'
                  />
                </div>
                <div class='col-12 d-flex justify-content-center'>
                  <button
                    disabled={
                      !checkInputFields(title, description, dueDate, +priority)
                    }
                    onClick={(e) => {
                      setTitle("");
                      setDesc("");
                      setDueDate("");
                      setPriority("");
                      setPopupVisible(false);
                      dispatch(addTask(newTaskData));
                    }}
                    type='button'
                    class='btn btn-primary mt-3 col-5'>
                    Create new Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Popup;

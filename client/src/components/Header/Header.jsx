import React from "react";
import PropTypes from "prop-types";
import { login, logout } from "../../store/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import s from "./Header.module.css";


function Header(props) {
  const dispatch = useDispatch();

  const { firstName, lastName, isAuth, message } = useSelector(
    (store) => store.user
  );
  return (
    <header class='p-3 bg-dark text-white'>
      <div class='container'>
        <div class='d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start'>
          <a
            href='/'
            class='d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none'>
            <svg
              class='bi me-2'
              width='40'
              height='32'
              role='img'
              aria-label='Bootstrap'></svg>
          </a>

          <ul class='nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0'>
            <li>
              <Link to='/home' class='nav-link px-2 text-secondary'>
                Home
              </Link>
            </li>
          </ul>
          <div class='text-end'>
            {isAuth ? (
              <div>
                <span class={s.user}>
                  User is authorized : {firstName} {lastName}
                </span>
                <button
                  onClick={() => dispatch(logout())}
                  type='button'
                  class='btn btn-warning ml-2'>
                  Log out
                </button>
              </div>
            ) : (
              <div>
                {message ? <span className={s.message}>{message}</span> : ""}
                <button
                  type='button'
                  class='btn btn-outline-light me-2'
                >
                  <Link to='/login'>Login</Link>
                </button>
                <button type='button' class='btn btn-warning'>
                  <Link to='/sign-up'>Sign-up</Link>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {};

export default Header;

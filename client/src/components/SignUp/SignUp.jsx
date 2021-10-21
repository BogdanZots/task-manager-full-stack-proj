/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { passwordValidator } from "../../helpers/helpers";
import { registration } from "../../store/reducers/userReducer";

const SignUp = () => {
  const [password, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch();
  return (
    <main class='form-signin text-center d-flex justify-content-center'>
      <form class='col-6'>
        <h1 class='h3 mb-3 fw-normal'>Please sign up</h1>

        <div class='form-floating'>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            class='form-control'
            id='floatingInput'
            placeholder='name@example.com'
          />
          <label for='floatingInput'>Email address</label>
        </div>
        <div class='form-floating'>
          <input
            value={firstName}
            onChange={(e) => setName(e.target.value)}
            type='text'
            class='form-control'
            id='floatingInput'
            placeholder='your first name'
          />
          <label for='floatingInput'>your first name</label>
        </div>
        <div class='form-floating'>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type='text'
            class='form-control'
            id='floatingInput'
            placeholder='your last name'
          />
          <label for='floatingInput'>your last name</label>
        </div>
        <div class='form-floating'>
          <input
            onChange={(e) => setPass(e.target.value)}
            value={password}
            type='password'
            class='form-control'
            id='floatingPassword'
            placeholder='Password'
          />
          <label for='floatingPassword'>Password</label>
        </div>
        <button
          disabled={!passwordValidator(firstName, lastName, email, password)}
          class='w-100 btn btn-lg btn-primary'
          type='submit'
          onClick={(e) => {
            e.preventDefault();
            dispatch(registration(email, password, firstName, lastName));
            setPass("");
            setEmail("");
            setName("");
            setLastName("");
          }}>
          Sign up
        </button>
      </form>
    </main>
  );
};

export default SignUp;

/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState} from "react";
import { useDispatch } from "react-redux";
import { loginValidator } from "../../helpers/helpers";
import { login } from "../../store/reducers/userReducer";

const Login = () => {
  const [password, setPass] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  return (
    <main class='form-signin text-center d-flex justify-content-center mt-5 align-items-center'>
      <form class='col-3'>
        <h1 class='h3 mb-3 fw-normal'>Please sign in</h1>

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
          disabled={!loginValidator(email, password)}
          class='w-100 btn btn-lg btn-primary'
          type='submit'
          onClick={(e) => {
            e.preventDefault();
            dispatch(login(email, password));
            setEmail("");
            setPass("");
          }}>
          Sign in
        </button>
      </form>
    </main>
  );
};

export default Login;

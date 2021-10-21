import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/reducers/userReducer";
import { registration } from "../store/reducers/userReducer";
const LoginForm = () => {
  const dispatch = useDispatch();
  const [password, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setName] = useState("");
  const [lastName, setSurname] = useState("");
  /*   const {ifn} */
  return (
    <div>
      <input
        onChange={(e) => setPass(e.target.value)}
        value={password}
        placeholder='pass'
      />
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder='email'
      />
         <input
        onChange={(e) => setName(e.target.value)}
        value={firstName}
        placeholder='name'
      />
         <input
        onChange={(e) => setSurname(e.target.value)}
        value={lastName}
        placeholder='surname'
      />
      <button onClick={() => dispatch(login(email, password))}>Login</button>
      <button onClick={() => dispatch(registration(email, password , firstName , lastName))}>
        Registration
      </button>
    </div>
  );
};

export default LoginForm;

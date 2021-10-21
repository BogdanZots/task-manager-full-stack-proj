/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-expressions */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header/Header";
import { checkAuth } from "./store/reducers/userReducer";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import TasksPage from "./pages/TasksPage";
import EditTaskPage from "./pages/EditTaskPage/EditTaskPage";
import CurrentTaskInfopage from "./pages/CurrentTaskInfoPage/CurrentTaskInfoPage";
import { authContext } from "./context/context";

function App() {
  const { isAuth , uId } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      return dispatch(checkAuth());
    }
  }, [isAuth]);

  function ProvideAuth({ children }) {
    return <authContext.Provider>{children}</authContext.Provider>;
  }
  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isAuth ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }

  return (
    <div className='App'>
      <>
        <ProvideAuth>
          <BrowserRouter>
            <Header />
            <Switch>
              <PrivateRoute path='/home'>
                <TasksPage userId={uId} />
              </PrivateRoute>
              <Route path='/tasks/current-task-info/:id'>
                <CurrentTaskInfopage />
              </Route>
              <Route path='/tasks/task-edit/:id'>
                <EditTaskPage />
              </Route>
              <Route path='/sign-up' render={() => <SignUp />} />
              <Route path='/login' render={() => <Login />} />
            </Switch>
          </BrowserRouter>
        </ProvideAuth>
      </>
    </div>
  );
}

export default App;

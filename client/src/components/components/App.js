import React from 'react';
import '../css/index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//importing components
import Header from './Header';
import Courses from './Courses';
import CreateCourse from './CreateCourse';
import UpdateCourse from './UpdateCourse';
import CourseDetail from './CourseDetail';
import UserSignUp from './UserSignUp';
import UserSignIn from './UserSignIn';
import NotFound from './NotFound';
import UnhandledError from './UnhandledError';
import Forbidden from './Forbidden';
import UserSignOut from './UserSignOut';
import PrivateRoute from './PrivateRoute';

//importing for userauth
import withContext from './Context';
//connects user sign up with context api
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const HeaderWithContext = withContext(Header);
const UserSignOutWithContext = withContext(UserSignOut);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const CoursesWithContext = withContext(Courses);

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <HeaderWithContext />
        <Switch>
          <Route exact path="/" component={CoursesWithContext} />
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/signin" component={UserSignInWithContext} />
          <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
          <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
          <Route path="/courses/:id" component={CourseDetailWithContext} />
          <Route path="/error" component={UnhandledError} />
          <Route path="/forbidden" component={Forbidden} />
          <Route path="/signout" component={UserSignOutWithContext} />
          <Route path="/notfound" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
import "./App.css";
import Navi from "./layouts/navi/Navi";
import "semantic-ui-css/semantic.min.css";
import Dashboard from "./layouts/Dashboard";
import { Container } from "semantic-ui-react";
import { Route } from "react-router";
import LoginCandidateForm from "./pages/auth/login/LoginCandidateForm";
import LoginEmployerForm from "./pages/auth/login/LoginEmployerForm";
import LoginHrForm from "./pages/auth/login/LoginHrForm";
import SignupCandidateForm from "./pages/auth/signup/SignupCandidateForm";
import SignupEmployerForm from "./pages/auth/signup/SignupEmployerForm";
import SignupHrForm from "./pages/auth/signup/SignupHrForm";
import HomeSignupDashboard from "./layouts/home/HomeSignupDashboard";
import HomeNavi from "./layouts/home/HomeNavi";
import HomeLoginDashboard from "./layouts/home/HomeLoginDashboard";
import SuccessfulSignup from "./pages/auth/signup/SuccessfulSignup";
import axios from "axios";

function App() {

  const pathname = window.location.pathname;
  let pathLogin = "/auth/login";
  let pathLoginCand = "/auth/login/candidate";
  let pathLoginEmp = "/auth/login/employer";
  let pathLoginHr = "/auth/login/hr";
  let pathSignup = "/auth/signup";
  let pathSignupCand = "/auth/signup/candidate";
  let pathSignupEmp = "/auth/signup/employer";
  let pathSignupHr = "/auth/signup/hr";
  let pathSignupSuccess = "/auth/signup/success";

  //axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('Authorization');
  //axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

  /*axios.interceptors.request.use(
    config => {
      console.log("interceptor started");
      config.defaults.headers = { 
        'Authorization': window.localStorage.getItem('Authorization'),
        'Accept': 'application/json'
      } 
      console.log(window.localStorage.getItem('Authorization'));
      console.log("interceptor ended");
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );*/

  return (
    <div className="App">
    
    {pathname === pathLoginCand || pathname === pathLoginEmp || pathname === pathLoginHr || 
    pathname === pathSignupCand || pathname === pathSignupEmp || pathname === pathSignupHr  || 
    pathname === pathLogin || pathname === pathSignup || pathname === pathSignupSuccess || pathname === "/"
    ? null : <Navi /> }
    {console.log(pathname)}

    <Route exact path="/" component={HomeNavi} />
    <Route path="/auth/signup" component={HomeNavi} />
    <Route path="/auth/login" component={HomeNavi} />
    
      
      <Container className="main">
      <Route exact path="/" component={HomeLoginDashboard} />
      <Route exact path="/auth/signup" component={HomeSignupDashboard} />
      <Route exact path="/auth/login" component={HomeLoginDashboard} />   
      <Route exact path="/auth/login/candidate" component={LoginCandidateForm} />
      <Route exact path="/auth/login/employer" component={LoginEmployerForm} />
      <Route exact path="/auth/login/hr" component={LoginHrForm} />
      <Route exact path="/auth/signup/candidate" component={SignupCandidateForm} />
      <Route exact path="/auth/signup/employer" component={SignupEmployerForm} />
      <Route exact path="/auth/signup/hr" component={SignupHrForm} />
      <Route exact path="/auth/signup/success" component={SuccessfulSignup} />
        <Dashboard />
      </Container>
    </div>
  );
}

export default App;

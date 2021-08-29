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

function App() {

  const pathname = window.location.pathname;
  let pathLoginCand = "/auth/login/candidate";
  let pathLoginEmp = "/auth/login/employer";
  let pathLoginHr = "/auth/login/hr";
  let pathSignupCand = "/auth/signup/candidate";
  let pathSignupEmp = "/auth/signup/employer";
  let pathSignupHr = "/auth/signup/hr";

  return (
    <div className="App">
    
    {pathname === pathLoginCand || pathname === pathLoginEmp || pathname === pathLoginHr || 
    pathname === pathSignupCand || pathname === pathSignupEmp || pathname === pathSignupHr  
    ? null : <Navi /> }
    {console.log(pathname)}
      
      <Container className="main">
      <Route exact path="/auth/login/candidate" component={LoginCandidateForm} />
      <Route exact path="/auth/login/employer" component={LoginEmployerForm} />
      <Route exact path="/auth/login/hr" component={LoginHrForm} />
      <Route exact path="/auth/signup/candidate" component={SignupCandidateForm} />
      <Route exact path="/auth/signup/employer" component={SignupEmployerForm} />
      <Route exact path="/auth/signup/hr" component={SignupHrForm} />
        <Dashboard />
      </Container>
    </div>
  );
}

export default App;

import "./App.css";
import Navi from "./layouts/navi/Navi";
import "semantic-ui-css/semantic.min.css";
import Dashboard from "./layouts/Dashboard";
import { Container } from "semantic-ui-react";
import { Route } from "react-router";
import LoginCandidateForm from "./pages/auth/login/LoginCandidateForm";
import LoginEmployerForm from "./pages/auth/login/LoginEmployerForm";
import LoginHrForm from "./pages/auth/login/LoginHrForm";

function App() {
  return (
    <div className="App">
      <Navi />
      <Container className="main">
      <Route exact path="/auth/login/candidate" component={LoginCandidateForm} />
      <Route exact path="/auth/login/employer" component={LoginEmployerForm} />
      <Route exact path="/auth/login/hr" component={LoginHrForm} />
        <Dashboard />
      </Container>
    </div>
  );
}

export default App;

import React from "react";
import { Link } from "react-router-dom";
import { Grid, Image, Card } from "semantic-ui-react";
import candidateLogo from "../../img/login-logo-candidate.png";
import employerLogo from "../../img/login-logo-employer.png";
import hrLogo from "../../img/login-logo-hr.png";
import "./HomeDashboard.css";

export default function HomeLoginDashboard() {
  return (
    <div>
      <Grid columns="three">
        <Grid.Row>
          <Grid.Column>
            <Link to="/auth/login/candidate">
              <Card>
                <Image src={candidateLogo} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>Login as Candidate</Card.Header>
                </Card.Content>
              </Card>
            </Link>
          </Grid.Column>
          <Grid.Column>
            <Link to="/auth/login/employer">
              <Card>
                <Image src={employerLogo} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>Login as Employer</Card.Header>
                </Card.Content>
              </Card>
            </Link>
          </Grid.Column>
          <Grid.Column>
            <Link to="/auth/login/hr">
              <Card>
                <Image src={hrLogo} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>Login as System Personnel</Card.Header>
                </Card.Content>
              </Card>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

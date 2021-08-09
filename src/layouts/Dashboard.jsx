import React from "react";
import { Route } from "react-router";
import { Grid } from "semantic-ui-react";
import AdvertisementFilter from "../pages/advertisements/AdvertisementFilter";
import Advertisements from "../pages/advertisements/Advertisements";
import CvAdd from "../pages/cv/CvAdd";

export default function Dashboard() {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
          <Route exact path="/advertisements" component={AdvertisementFilter} />
          </Grid.Column>
          <Grid.Column width={12}>
          <Route exact path="/advertisements" component={Advertisements} />
          <Route exact path="/cv/add" component={CvAdd} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

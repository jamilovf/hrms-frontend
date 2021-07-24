import React from "react";
import { Grid } from "semantic-ui-react";
import AdvertisementFilter from "../pages/advertisements/AdvertisementFilter";
import Advertisements from "../pages/advertisements/Advertisements";

export default function Dashboard() {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <AdvertisementFilter />
          </Grid.Column>
          <Grid.Column width={12}>
            <Advertisements />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

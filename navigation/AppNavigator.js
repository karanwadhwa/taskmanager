import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import MainDrawerNavigator from "./MainDrawerNavigator";
import AppSwitchNavigator from "./AppSwitchNavigator";

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Auth: AppSwitchNavigator,
    Main: MainDrawerNavigator
  })
);

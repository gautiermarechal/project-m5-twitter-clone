//Dependencies Imports
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

//Constants Imports
import { SIZES } from "./constants/constants";

//Components Imports
import HomeFeed from "./components/HomeFeed/index";
import Bookmarks from "./components/Bookmarks/index";
import Notifications from "./components/Notifications/index";
import Profile from "./components/Profile/index";
import TweetDetails from "./components/TweetDetails/index";
import GlobalStyles from "./components/GlobalStyles/index";
import SideBar from "./components/SideBar/index";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <AppContainer>
          <Router>
            <SideBarContainer>
              <SideBar />
            </SideBarContainer>
            <Switch>
              <Route exact path="/">
                <HomeFeed />
              </Route>
              <Route path="/bookmarks">
                <Bookmarks />
              </Route>
              <Route path="/notifications">
                <Notifications />
              </Route>
              <Route path="/tweet/:tweetId">
                <TweetDetails />
              </Route>
              <Route path="/:profileId">
                <Profile />
              </Route>
            </Switch>
          </Router>
        </AppContainer>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const SideBarContainer = styled.div`
  width: ${SIZES.desktop.sideBarWidth}px;
  height: ${SIZES.desktop.sideBarHeightVH}vh;
  position: fixed;
`;

const AppContainer = styled.div`
  margin-left: ${SIZES.desktop.sideBarWidth}px;
`;

export default App;

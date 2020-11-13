//Dependencies Imports
import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import history from "./history";

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
import Loading from "./components/Loading";
import Post from "./components/Post";

//Context imports
import { useCurrentUserContext } from "./context/CurrentUserContext";

const App = () => {
  const { status } = useCurrentUserContext();

  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <Router history={history}>
          <SideBarContainer>
            <SideBar />
          </SideBarContainer>
          <AppContainer>
            <Switch>
              {status === "loading" ? (
                <Route path="/">
                  <Loading width={100} height={100} />
                </Route>
              ) : (
                <>
                  <Route exact path="/">
                    <PageTitle>Home</PageTitle>
                    <Post />
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
                  <Route path="/profile/:profileId">
                    <Profile />
                  </Route>
                </>
              )}
            </Switch>
          </AppContainer>
        </Router>
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
  border-style: none;
  border-right-style: solid;
  border-left-style: solid;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.1);
`;

const PageTitle = styled.h1`
  margin: 20px;
`;

export default App;

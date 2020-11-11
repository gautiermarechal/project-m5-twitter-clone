import React, { createContext, useContext, useState } from "react";

export const TweetsContext = createContext({});

export const TweetsContextProvider = ({ children }) => {
  const [homeFeedTweets, setHomeFeedTweets] = useState([]);
  const [tweetFocused, setTweetFocused] = useState({});

  //Retrieve all home feed tweets
  const handleHomeFeedTweets = () => {
    fetch("http://localhost:31415/api/me/home-feed")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        let temp = [];
        json.tweetIds.forEach((id) => {
          temp.push(json.tweetsById[id]);
        });
        setHomeFeedTweets(temp);
      });
  };

  //Retrieve tweet to focus on
  //....

  return (
    <TweetsContext.Provider
      value={{
        homeFeedTweets,
        tweetFocused,
        handleHomeFeedTweets,
      }}
    >
      {children}
    </TweetsContext.Provider>
  );
};

export const useTweetsContext = () => {
  return useContext(TweetsContext);
};

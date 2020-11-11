import React, { createContext, useContext, useState } from "react";

export const TweetsContext = createContext({});

export const TweetsContextProvider = ({ children }) => {
  const [homeFeedTweets, setHomeFeedTweets] = useState([]);
  const [singleTweet, setSingletweet] = useState({});

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

  //Move single tweet info to local storage
  const handleSingleTweetLocalStorage = (objTweet) => {
    localStorage.setItem("single-tweet", JSON.stringify(objTweet));
  };

  //Update single tweet state
  const handleSingleTweetState = (objTweet) => {
    setSingletweet(objTweet);
  };

  //Increment number of likes
  const incrementLikes = () => {
    setSingletweet({ ...singleTweet, numLikes: singleTweet.numLikes + 1 });
  };

  //Increment number of retweets
  const incrementRetweets = () => {
    setSingletweet({
      ...singleTweet,
      numRetweets: singleTweet.numRetweets + 1,
    });
  };
  return (
    <TweetsContext.Provider
      value={{
        homeFeedTweets,
        singleTweet,
        handleHomeFeedTweets,
        handleSingleTweetLocalStorage,
        handleSingleTweetState,
        incrementLikes,
        incrementRetweets,
      }}
    >
      {children}
    </TweetsContext.Provider>
  );
};

export const useTweetsContext = () => {
  return useContext(TweetsContext);
};

import React, { createContext, useContext, useState } from "react";

export const TweetsContext = createContext({});

export const TweetsContextProvider = ({ children }) => {
  const [homeFeedTweets, setHomeFeedTweets] = useState([]);
  const [singleTweet, setSingletweet] = useState({});
  const [currentProfile, setCurrentProfile] = useState({});

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
  const incrementLikes = (e, id) => {
    e.stopPropagation();
    console.log(id);
    fetch(`http://localhost:31415/api/tweet/${id}/like`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ like: true }),
    });
    // console.log(id);
    // const tweetLiked = homeFeedTweets.find((tweet) => tweet.id === id);

    // if (!tweetLiked.isLiked) {
    //   tweetLiked.isLiked = !tweetLiked.isLiked;
    //   tweetLiked.numLikes += 1;
    // } else {
    //   tweetLiked.isLiked = !tweetLiked.isLiked;
    //   tweetLiked.numLikes -= 1;
    // }

    // setHomeFeedTweets([...homeFeedTweets], tweetLiked);
  };

  //Increment number of retweets
  const incrementRetweets = (e, id) => {
    e.stopPropagation();
    const tweetIsRetweeted = homeFeedTweets.find((tweet) => tweet.id === id);

    if (!tweetIsRetweeted.isRetweeted) {
      tweetIsRetweeted.isRetweeted = !tweetIsRetweeted.isRetweeted;
      tweetIsRetweeted.numRetweets += 1;
    } else {
      tweetIsRetweeted.isRetweeted = !tweetIsRetweeted.isRetweeted;
      tweetIsRetweeted.numRetweets -= 1;
    }

    setHomeFeedTweets([...homeFeedTweets], tweetIsRetweeted);
  };

  //Set Current profile localstorage
  const handleCurrentProfilLocalStorage = (profileObj) => {
    localStorage.setItem("current-profile", JSON.stringify(profileObj));
  };

  //Set Current profile state
  const handleCurrentProfileState = (profileObj) => {
    setCurrentProfile(profileObj);
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
        currentProfile,
        handleCurrentProfileState,
        handleCurrentProfilLocalStorage,
      }}
    >
      {children}
    </TweetsContext.Provider>
  );
};

export const useTweetsContext = () => {
  return useContext(TweetsContext);
};

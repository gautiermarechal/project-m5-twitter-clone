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

    let tempIsLiked;
    const updatedHomeFeedTweets = homeFeedTweets.map((tweet) => {
      if (tweet.id === id) {
        tempIsLiked = !tweet.isLiked;
        const toggleNumLikes = tempIsLiked ? 1 : -1;
        console.log(tweet);
        localStorage.setItem(
          "single-tweet",
          JSON.stringify({
            ...tweet,
            avatarSrc: tweet.author.avatarSrc,
            userName: tweet.author.handle,
            userTag: tweet.author.displayName,
          })
        );
        setSingletweet(tweet);
        return {
          ...tweet,
          numLikes: tweet.numLikes + toggleNumLikes,
          isLiked: !tweet.isLiked,
        };
      }
      return tweet;
    });

    setHomeFeedTweets(updatedHomeFeedTweets);

    fetch(`http://localhost:31415/api/tweet/${id}/like`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ like: tempIsLiked }),
    });
  };

  //Increment number of retweets
  const incrementRetweets = (e, id) => {
    e.stopPropagation();
    let tempIsRetweeted;
    const updatedHomeFeedTweets = homeFeedTweets.map((tweet) => {
      if (tweet.id === id) {
        tempIsRetweeted = !tweet.isRetweeted;
        const toggleNumRetweets = tempIsRetweeted ? 1 : -1;
        return {
          ...tweet,
          numRetweets: tweet.numRetweets + toggleNumRetweets,
          isRetweeted: !tweet.isRetweeted,
        };
      }
      return tweet;
    });

    setHomeFeedTweets(updatedHomeFeedTweets);

    fetch(`http://localhost:31415/api/tweet/${id}/retweet`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ retweet: tempIsRetweeted }),
    });
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

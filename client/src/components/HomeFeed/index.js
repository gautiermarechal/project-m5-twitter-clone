import React, { useEffect } from "react";
import { useTweetsContext } from "../../context/TweetsContext";
import Tweet from "./Tweet/index";

const HomeFeed = () => {
  const { handleHomeFeedTweets, homeFeedTweets } = useTweetsContext();

  useEffect(() => {
    handleHomeFeedTweets();
  }, []);

  return (
    <>
      {homeFeedTweets.map((tweet) => {
        return (
          <Tweet
            key={tweet.id}
            id={tweet.id}
            avatarSrc={tweet.author.avatarSrc}
            userTag={tweet.author.displayName}
            userName={tweet.author.handle}
            date={tweet.timestamp}
            content={tweet.status}
            media={tweet.media}
            numLikes={tweet.numLikes}
            numRetweets={tweet.numRetweets}
          />
        );
      })}
    </>
  );
};

export default HomeFeed;

import React, { useEffect } from "react";
import styled from "styled-components";
import { useTweetsContext } from "../../context/TweetsContext";
import Tweet from "../HomeFeed/Tweet/index";

const UserTweets = ({ currentProfile }) => {
  const { handleHomeFeedTweets, homeFeedTweets } = useTweetsContext();
  useEffect(() => {
    handleHomeFeedTweets();
  }, []);

  return (
    <>
      {homeFeedTweets.length !== 0 && (
        <>
          {homeFeedTweets.map((tweet) => {
            if (tweet.author.handle === currentProfile.handle) {
              return (
                <Tweet
                  key={tweet.id}
                  id={tweet.id}
                  avatarSrc={tweet.author.avatarSrc}
                  userTag={tweet.author.displayName}
                  userName={tweet.author.handle}
                  profileObj={tweet.author}
                  date={tweet.timestamp}
                  content={tweet.status}
                  media={tweet.media}
                  numLikes={tweet.numLikes}
                  numRetweets={tweet.numRetweets}
                />
              );
            }

            if (tweet.retweetFrom) {
              if (tweet.retweetFrom.handle === currentProfile.handle) {
                return (
                  <Tweet
                    key={tweet.id}
                    id={tweet.id}
                    avatarSrc={tweet.author.avatarSrc}
                    userTag={tweet.author.displayName}
                    userName={tweet.author.handle}
                    profileObj={tweet.author}
                    date={tweet.timestamp}
                    content={tweet.status}
                    media={tweet.media}
                    numLikes={tweet.numLikes}
                    numRetweets={tweet.numRetweets}
                    retweetFrom={
                      tweet.retweetFrom ? tweet.retweetFrom : undefined
                    }
                  />
                );
              }
            }
          })}
        </>
      )}
    </>
  );
};

export default UserTweets;

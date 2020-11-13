import React, { useEffect } from "react";
import styled from "styled-components";
import { useTweetsContext } from "../../context/TweetsContext";
import Tweet from "./Tweet/index";

const HomeFeed = () => {
  const { handleHomeFeedTweets, homeFeedTweets } = useTweetsContext();

  useEffect(() => {
    handleHomeFeedTweets();
  }, []);

  return (
    <HomeFeedContainer>
      {homeFeedTweets.map((tweet) => {
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
            isLiked={tweet.isLiked}
            isRetweeted={tweet.isRetweeted}
          />
        );
      })}
    </HomeFeedContainer>
  );
};

const HomeFeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default HomeFeed;

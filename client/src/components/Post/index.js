import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useCurrentUserContext } from "../../context/CurrentUserContext";
import { useTweetsContext } from "../../context/TweetsContext";
import { COLORS } from "../../constants/constants";
import Loading from "../Loading";

const Post = () => {
  const { currentUser } = useCurrentUserContext();
  const [statusContent, setStatusContent] = useState("");
  const [charCount, setCharCount] = useState(280);
  const [validTweet, setValidTweet] = useState(false);
  const [tweetStatus, setTweetStatus] = useState("idle");

  const { handleHomeFeedTweets } = useTweetsContext();
  const inputRef = useRef(null);

  useEffect(() => {
    if (charCount >= 0 && charCount < 280) {
      setValidTweet(true);
    } else {
      setValidTweet(false);
    }
  });

  const handleCharacterCount = (e) => {
    setCharCount(280 - e.target.value.length);
    setStatusContent(e.target.value);
  };

  const handlePostTweet = () => {
    console.log(statusContent);
    setTweetStatus("loading");
    fetch("http://localhost:31415/api/tweet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: statusContent,
      }),
    }).then(() => {
      inputRef.current.value = "";
      setCharCount(280);
      setTweetStatus("idle");
      handleHomeFeedTweets();
    });
  };

  return (
    <>
      <MainContainer>
        <InputContainer>
          <ProfilePicture
            src={`http://localhost:31415${currentUser.avatarSrc}`}
          />
          <MainInput
            placeholder="What's happening?"
            onChange={handleCharacterCount}
            ref={inputRef}
          />
        </InputContainer>
        <PostContainer>
          <CharacterCount>{charCount}</CharacterCount>
          <PostButton
            onClick={handlePostTweet}
            validTweet={validTweet}
            disabled={!validTweet}
          >
            {tweetStatus === "loading" ? (
              <Loading width={20} height={20} />
            ) : (
              "Meow"
            )}
          </PostButton>
        </PostContainer>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 670px;
  padding-right: 40px;
  margin-left: 50px;
  margin-top: 30px;
  margin-top: 50px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
`;

const MainInput = styled.textarea`
  height: 118px;
  width: 100%;
  max-width: 668px;
  border-style: none;
  outline: none;
  font-size: 30px;
  font-family: inherit;
`;

const ProfilePicture = styled.img`
  border-radius: 100px;
  height: 49px;
  width: 49px;
  margin-right: 20px;
`;

const PostContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const CharacterCount = styled.h6`
  color: grey;
  margin-right: 20px;
`;

const PostButton = styled.button`
  background-color: ${(props) =>
    props.validTweet ? `${COLORS.primary}` : `${COLORS.secondary}`};
  border-style: none;
  height: 39px;
  width: 100px;
  border-radius: 100px;
  color: white;
  font-weight: 800;
  font-size: 17px;
  cursor: pointer;
  margin-bottom: 20px;
  &:hover {
    background-color: ${COLORS.secondary};
  }
`;

export default Post;

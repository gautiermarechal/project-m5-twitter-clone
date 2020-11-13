import React from "react";
import styled from "styled-components";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import { RiHeart3Line } from "react-icons/ri";
import { BsDownload } from "react-icons/bs";
import { COLORS } from "../../../constants/constants";
import { useTweetsContext } from "../../../context/TweetsContext";

const ActionBarComponent = ({
  numLikes,
  numRetweets,
  id,
  isLiked,
  isRetweeted,
}) => {
  const { incrementLikes, incrementRetweets } = useTweetsContext();

  return (
    <ActionBar>
      <Action color={"commentColor"} colorHover={"commentColorHover"}>
        <FaRegComment />
      </Action>
      <ActionContainer>
        <Action
          color={"retweetColor"}
          colorHover={"retweetColorHover"}
          onClick={(e) => incrementRetweets(e, id)}
          isRetweeted={isRetweeted}
        >
          <AiOutlineRetweet />
        </Action>
        {numRetweets !== 0 && numRetweets}
      </ActionContainer>
      <ActionContainer>
        <Action
          color={"likeColor"}
          colorHover={"likeColorHover"}
          onClick={(e) => incrementLikes(e, id)}
          isLiked={isLiked}
        >
          <RiHeart3Line />
        </Action>
        {numLikes !== 0 && numLikes}
      </ActionContainer>

      <Action color={"bookmarkColor"} colorHover={"bookmarkColorHover"}>
        <BsDownload />
      </Action>
    </ActionBar>
  );
};

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ActionBar = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  margin-top: 20px;
  margin-left: 69px;
`;

const Action = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border-style: none;
  height: 37.5px;
  width: 37.5px;
  transition: 0.2s;
  background-color: transparent;

  svg {
    height: 18.75px;
    width: 18.75px;
    z-index: 1000;
    color: ${(props) => (props.isLiked ? "rgb(224, 36, 94)" : "none")};
    color: ${(props) => (props.isRetweeted ? COLORS.retweetColor : "none")};
  }

  &:hover {
    cursor: pointer;
    background-color: ${(props) => COLORS[props.colorHover]};

    svg {
      color: ${(props) => COLORS[props.color]};
    }
  }
`;

export default ActionBarComponent;

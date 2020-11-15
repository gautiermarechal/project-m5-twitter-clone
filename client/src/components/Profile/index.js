import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../constants/constants";
import { GoLocation } from "react-icons/go";
import { BiCalendarAlt } from "react-icons/bi";
import moment from "moment";
import UserTweets from "./UserTweets";
const Profile = () => {
  const [active, setActive] = useState("Tweets");

  const currentProfile = JSON.parse(localStorage.getItem("current-profile"));
  const isRemoteBannerSrc =
    currentProfile.bannerSrc.substring(0, 5) === "https";

  const isRemoteSrcAvatar =
    currentProfile.avatarSrc.substring(0, 5) === "https";

  const formattedDate = moment(currentProfile.joined).format("MMMM YYYY");

  return (
    <>
      <MainContainer>
        <Banner
          src={
            isRemoteBannerSrc
              ? currentProfile.bannerSrc
              : `http://localhost:31415${currentProfile.bannerSrc}`
          }
        />

        <ProfileInfoContainer>
          <ProfilePictureContainer>
            <ProfilePicture
              src={
                isRemoteSrcAvatar
                  ? currentProfile.avatarSrc
                  : `http://localhost:31415${currentProfile.avatarSrc}`
              }
            />
            <FollowButton>
              {currentProfile.isBeingFollowedByYou ? "Following" : "Follow"}
            </FollowButton>
          </ProfilePictureContainer>
          <TagsContainer>
            <UserTag>{currentProfile.displayName}</UserTag>
            <UserNameContainer>
              <UserName>@{currentProfile.handle}</UserName>
              <FollowsYou>
                {currentProfile.isFollowingYou && "Follows You"}
              </FollowsYou>
            </UserNameContainer>
          </TagsContainer>
          <Bio>{currentProfile.bio}</Bio>
          <Location>
            <GoLocation style={{ marginRight: "5px" }} />{" "}
            {currentProfile.location}
            <JoinedDate>
              <BiCalendarAlt style={{ marginRight: "5px" }} /> Joined{" "}
              {formattedDate}
            </JoinedDate>
          </Location>
          <FollowContainer>
            <FollowNumber>{currentProfile.numFollowing}</FollowNumber>
            <FollowTitle>Following</FollowTitle>
            <FollowNumber>{currentProfile.numFollowers}</FollowNumber>
            <FollowTitle>Followers</FollowTitle>
          </FollowContainer>
        </ProfileInfoContainer>
        <Navigation>
          <NavButton
            active={active === "Tweets" ? true : false}
            onClick={() => setActive("Tweets")}
          >
            Tweets
          </NavButton>
          <NavButton
            active={active === "Media" ? true : false}
            onClick={() => setActive("Media")}
          >
            Media
          </NavButton>
          <NavButton
            active={active === "Likes" ? true : false}
            onClick={() => setActive("Likes")}
          >
            Likes
          </NavButton>
        </Navigation>
        <UserTweets currentProfile={currentProfile} />
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  max-width: 668px;
`;

const Banner = styled.img`
  width: 668px;
  height: auto;
`;

const ProfileInfoContainer = styled.div`
  display: flex;
  padding: 10px 15px 0px;
  flex-direction: column;
`;

const ProfilePictureContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 90px;
  align-items: center;
  position: relative;
`;

const ProfilePicture = styled.img`
  position: absolute;
  height: 134px;
  width: 134px;
  border-radius: 100px;
  border-style: solid;
  border-width: 4px;
  border-color: white;
  top: -67px;
  left: 5px;
`;

const FollowButton = styled.button`
  background-color: ${COLORS.primary};
  color: white;
  border-style: none;
  border-radius: 20px;
  height: 39px;
  width: 100px;
  font-weight: 800;
  cursor: pointer;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserTag = styled.h3`
  font-size: 20px;
  font-weight: 800;
`;

const UserNameContainer = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.h5`
  color: grey;
  font-weight: 500;
`;

const FollowsYou = styled.span`
  background-color: #f2f2f2;
  color: grey;
  border-radius: 7px;
  width: fit-content;
  padding: 3px 5px 3px;
  margin-left: 5px;
`;

const Bio = styled.p`
  margin-top: 15px;
  word-wrap: break-word;
`;

const Location = styled.div`
  margin-top: 15px;
  color: grey;
  display: flex;
  align-items: center;
`;

const JoinedDate = styled.div`
  display: flex;
  color: grey;
  margin-left: 15px;
  align-items: center;
`;

const FollowContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

const FollowNumber = styled.div`
  font-weight: 800;
  margin-right: 5px;
`;

const FollowTitle = styled.div`
  color: grey;
  margin-right: 35px;
`;

const Navigation = styled.div`
  display: flex;
  height: 52px;
  margin-top: 20px;
`;

const NavButton = styled.button`
  border-style: none;
  background-color: white;
  width: 33.3333333%;
  // border-bottom-style: solid;
  // border-bottom-width: 3px;
  cursor: pointer;
  font-weight: 800;
  outline: none;
  ${(props) =>
    props.active
      ? `border-bottom: 3px solid ${COLORS.primary};`
      : "border-bottom: 3px solid white;"}

  ${(props) => (props.active ? `color: ${COLORS.primary}` : "color: grey;")}
`;
export default Profile;

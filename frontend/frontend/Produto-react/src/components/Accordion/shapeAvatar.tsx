import React from "react";
import { AvatarInitialsLetters, AvatarImage, AvatarIcon } from "./styles";
import { avatarInitials } from "../../utils/AvatarInitials";

const shapeIcons = (avatar: any) => (
  <AvatarIcon size="large" shape="square" icon={avatar} />
);

const shapeImage = (avatar: any) => (
  <AvatarImage size="large" shape="square" src={avatar} />
);

const shapeInitialsLetters = (avatar: any) => (
  <AvatarInitialsLetters size="large" shape="square">
    {avatarInitials(avatar)}
  </AvatarInitialsLetters>
);

export default function useShapeAvatar() {
  const selectShape = (avatar: any, shape: string | undefined) => {
    return (
      (shape === "icon" && shapeIcons(avatar)) ||
      (shape === "image" && shapeImage(avatar)) ||
      (shape === "initials-letters" && shapeInitialsLetters(avatar))
    );
  };

  return {
    selectShape,
  };
}

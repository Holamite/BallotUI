import React from "react";
import GiveRightToVoteCount from "./GiveRightToVoteCount";
import { Flex } from "@radix-ui/themes";
import UseIsChairperson from "../hooks/UseIsChairperson";

const Header = () => {
  const ischairperson = UseIsChairperson();

  return (
    <div className="flex justify-between items-center">
      <div>Ballot</div>
      <Flex gap={"4"} align={"center"}>
        {ischairperson && <GiveRightToVoteCount />}
        <w3m-button />
      </Flex>
    </div>
  );
};

export default Header;

import { Card, Avatar, Box, Text, Flex } from "@radix-ui/themes";

const Proposal = ({ id, name, voteCount, handleVote }) => {
  return (
    <Card size="2" style={{ width: 425 }}>
      <Flex gap="4" align="center">
        <Avatar size="4" radius="full" fallback="T" color="indigo" />
        <Box width="100%">
          <Flex justify={"between"} align={"center"}>
            <Text as="div" weight="bold">
              {name}
            </Text>
            <button
              className="bg-blue-600 px-6 py-3 rounded-md"
              onClick={() => handleVote(id)}
            >
              Vote
            </button>
          </Flex>
          <Text as="div" color="gray">
            Number of vote: {voteCount}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
};

export default Proposal;

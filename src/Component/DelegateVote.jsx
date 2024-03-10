import { Card, Box, Flex, Button, Text, TextField } from "@radix-ui/themes";
import useDelegate from "../hooks/useDelegate";
import { useState } from "react";

const DelegateVote = () => {
  const [to, setTo] = useState("");

  const handleDelegate = useDelegate(to);

  return (
    <Card size="2" style={{ width: 425 }}>
      <Flex gap="" align="center">
        <Box width={"100%"}>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Delegate&apos;s Address
              </Text>
              <TextField.Input
                placeholder="Enter Delegate's Address"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </label>
            <Button onClick={handleDelegate}>Delegate vote</Button>
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
};

export default DelegateVote;

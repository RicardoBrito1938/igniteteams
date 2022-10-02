import Button from "@components/Button";
import Header from "@components/Header";
import Highlight from "@components/Highlight";
import Input from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Container, Content, Icon } from "./styled";

const NewGroup = () => {
  const [group, setGroup] = useState("");
  const navigation = useNavigation();

  const handleNew = () => {
    navigation.navigate("Players", { group });
  };

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight title="New team" subtitle="Create a team to add people" />
        <Input placeholder="Team name" onChangeText={setGroup} />
        <Button title="Create" style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Container>
  );
};

export default NewGroup;

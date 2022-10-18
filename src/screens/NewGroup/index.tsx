import Button from "@components/Button";
import Header from "@components/Header";
import Highlight from "@components/Highlight";
import Input from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/appError";
import { useState } from "react";
import { Container, Content, Icon } from "./styled";
import { Alert } from "react-native";

const NewGroup = () => {
  const [group, setGroup] = useState("");
  const navigation = useNavigation();

  const handleNew = async () => {
    try {
      if (group.trim().length === 0) {
        return Alert.alert("New Group", "Inform the new team name");
      }
      await groupCreate(group);
      navigation.navigate("Players", { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("New Group", error.message);
      } else {
        Alert.alert("New Group", "Not possible to create a new group");
      }
    }
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

import GroupCard from "@components/GroupCard";
import Header from "@components/Header";
import Highlight from "@components/Highlight";
import { useState } from "react";
import { Container } from "./styles";
import { FlatList } from "react-native";
import ListEmpty from "@components/ListEmpty";
import Button from "@components/Button";
import { useNavigation } from "@react-navigation/native";

const Groups = () => {
  const [groups, setGroups] = useState<string[]>([]);
  const navigation = useNavigation();

  const handleNewGroup = () => {
    navigation.navigate("NewGroup");
  };

  return (
    <Container>
      <Header />
      <Highlight title="teams" subtitle="Play with your team" />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => <GroupCard title={item} />}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="You need to subscribe a team" />
        )}
      />

      <Button title="Create new team" onPress={handleNewGroup} />
    </Container>
  );
};

export default Groups;

import GroupCard from "@components/GroupCard";
import Header from "@components/Header";
import Highlight from "@components/Highlight";
import { useState } from "react";
import { Container } from "./styles";
import { FlatList } from "react-native";
import ListEmpty from "@components/ListEmpty";
import Button from "@components/Button";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { groupsGetAll } from "@storage/group/groupsGetAll";
import { useCallback } from "react";
import { Alert } from "react-native";
import Loading from "@components/Loading";

const Groups = () => {
  const [groups, setGroups] = useState<string[]>([]);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  const handleNewGroup = () => {
    navigation.navigate("NewGroup");
  };

  const fetchGroups = async () => {
    try {
      setIsLoading(true);
      const data = await groupsGetAll();
      setGroups(data);
      setIsLoading(false);
    } catch (error) {
      Alert.alert("Error", "Not possible to load the groups");
    }
  };

  const handleOpenGroup = (group: string) => [
    navigation.navigate("Players", { group })
  ];

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <Container>
      <Header />
      <Highlight title="teams" subtitle="Play with your team" />

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty message="You need to subscribe a team" />
          )}
        />
      )}

      <Button title="Create new team" onPress={handleNewGroup} />
    </Container>
  );
};

export default Groups;

import Button from "@components/Button";
import ButtonIcon from "@components/ButtonIcon";
import Filter from "@components/Filter";
import Header from "@components/Header";
import Highlight from "@components/Highlight";
import Input from "@components/Input";
import ListEmpty from "@components/ListEmpty";
import PlayerCard from "@components/PlayerCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playerGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { playersGetByGroup } from "@storage/player/playersGetByGroup";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { AppError } from "@utils/appError";
import { useState } from "react";
import { FlatList, Alert } from "react-native";
import { Container, Form, HeaderList, NumbersOfPlayers } from "./style";
import { useEffect, useRef } from "react";
import { TextInput, Keyboard } from "react-native";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import Loading from "@components/Loading";

type RouteParams = {
  group: string;
};

const Players = () => {
  const [team, setTeam] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const route = useRoute();
  const { group } = route.params as RouteParams;
  const [newPlayerName, setNewPlayerName] = useState("");
  const inputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const handleAddPlayer = async () => {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert("New person", "Inform the person`s name to add");
    }

    const newPlayer = {
      name: newPlayerName,
      team
    };

    try {
      await playerAddByGroup(newPlayer, group);
      inputRef.current?.blur();
      Keyboard.dismiss();
      setNewPlayerName("");
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("New person", error.message);
      } else {
        console.log(error);
        Alert.alert("New person", "Not possible to add");
      }
    }
  };

  const fetchPlayersByTeam = async () => {
    try {
      setIsLoading(true);
      const playersByTeam = await playerGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert("People", "Not possible to load people");
    }
  };

  const handleRemovePlayer = async (playerName: string) => {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      Alert.alert("Remove person", "Not possible to remove the person");
    }
  };

  const groupRemove = async () => {
    try {
      await groupRemoveByName(group);
      navigation.navigate("Groups");
    } catch (error) {
      Alert.alert("Remove Group", "Group not removed");
    }
  };

  const handleGroupRemove = async () => {
    Alert.alert("Remove", "Do you wish to remove the group?", [
      {
        text: "No",
        style: "cancel"
      },
      {
        text: "yes",
        onPress: () => groupRemove()
      }
    ]);
  };

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />

      <Highlight title={group} subtitle="Add the team and split the teams" />
      <Form>
        <Input
          inputRef={inputRef}
          placeholder="Name"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            horizontal
            data={["Team A", "Team B"]}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <Filter
                title={item}
                isActive={item === team}
                onPress={() => setTeam(item)}
              />
            )}
          />
        )}

        <NumbersOfPlayers>{players.length}</NumbersOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handleRemovePlayer(item.name)}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="There are no people in the team" />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 }
        ]}
      />

      <Button
        title="Remove group"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />
    </Container>
  );
};

export default Players;

import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/appError";
import { groupsGetAll } from "./groupsGetAll";

export const groupCreate = async (newGroup: string) => {
  try {
    const storedGroups = await groupsGetAll();
    const groupAlreadyExists = storedGroups.includes(newGroup);

    if (groupAlreadyExists) {
      throw new AppError("There is already a group with this name");
    }

    await AsyncStorage.setItem(
      GROUP_COLLECTION,
      JSON.stringify([...storedGroups, newGroup])
    );
  } catch (error) {
    throw error;
  }
};

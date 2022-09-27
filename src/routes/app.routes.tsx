import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Screen, Navigator } = createNativeStackNavigator();
import Groups from "@screens/Groups";
import NewGroup from "@screens/NewGroup";
import Players from "@screens/Players";

export const AppRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Groups" component={Groups} />
      <Screen name="NewGroup" component={NewGroup} />
      <Screen name="Players" component={Players} />
    </Navigator>
  );
};

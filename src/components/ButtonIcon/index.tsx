import { PressableProps } from "react-native";
import { ButtonIconTypeStyleProps, Container, Icon } from "./style";
import { MaterialIcons } from "@expo/vector-icons";

type Props = PressableProps & {
  icon: keyof typeof MaterialIcons.glyphMap;
  type?: ButtonIconTypeStyleProps;
};

const ButtonIcon = ({ icon, type = "PRIMARY", ...rest }: Props) => {
  return (
    <Container {...rest}>
      <Icon name={icon} type={type} />
    </Container>
  );
};

export default ButtonIcon;

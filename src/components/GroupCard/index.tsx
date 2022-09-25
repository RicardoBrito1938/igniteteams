import { Container, Icon, Title } from "./style";
import { PressableProps } from "react-native";

type Props = PressableProps & {
  title: string;
};

const GroupCard = ({ title, ...rest }: Props) => {
  return (
    <Container {...rest}>
      <Icon />
      <Title>{title}</Title>
    </Container>
  );
};

export default GroupCard;

import { PressableProps } from "react-native";
import { Container, FilterStyleProps, Title } from "./style";

type Props = PressableProps &
  FilterStyleProps & {
    title: string;
  };

const Filter = ({ title, isActive = false, ...rest }: Props) => {
  return (
    <Container isActive={isActive} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
};

export default Filter;

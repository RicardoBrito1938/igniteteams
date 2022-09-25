import { PressableProps } from "react-native";
import { ButtonTypeStyleProps, Container, Title } from "./style";

type Props = PressableProps & {
  title: string;
  type?: ButtonTypeStyleProps;
};

const Button = ({ title, type = "PRIMARY", ...rest }: Props) => {
  return (
    <Container type={type} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
};

export default Button;

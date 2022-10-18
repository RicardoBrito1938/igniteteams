import { TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";
import { Container } from "./style";
import { TextInput } from "react-native";

type Props = TextInputProps & {
  inputRef?: React.RefObject<TextInput>;
};

const Input = ({ inputRef, ...rest }: Props) => {
  const { COLORS } = useTheme();

  return (
    <Container
      ref={inputRef}
      placeholderTextColor={COLORS.GRAY_300}
      {...rest}
    />
  );
};

export default Input;

import { Container, Message } from "./style";

type Props = {
  message: string;
};

const ListEmpty = ({ message }: Props) => {
  return (
    <Container>
      <Message>{message}</Message>
    </Container>
  );
};

export default ListEmpty;

import Button from "@components/Button";
import Header from "@components/Header";
import Highlight from "@components/Highlight";
import Input from "@components/Input";
import { Container, Content, Icon } from "./styled";

const NewGroup = () => {
  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight title="New team" subtitle="Create a team to add people" />
        <Input placeholder="Team name" />
        <Button title="Create" style={{ marginTop: 20 }} />
      </Content>
    </Container>
  );
};

export default NewGroup;

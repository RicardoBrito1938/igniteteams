import { Container, SubTitle, Title } from "./style";

type Props = {
  title: string;
  subtitle: string;
};

const Highlight = ({ title, subtitle }: Props) => {
  return (
    <Container>
      <Title>{title}</Title>
      <SubTitle>{subtitle}</SubTitle>
    </Container>
  );
};

export default Highlight;

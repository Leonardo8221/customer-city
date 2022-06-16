import { FC, useState, ReactNode } from 'react';
import { ReactComponent as ChevronUpIcon } from 'assets/icons/chevronUp.svg';
import { ReactComponent as ChevronDownIcon } from 'assets/icons/chevronDown.svg';
import { Container, Head } from './ui';

type Props = {
  children?: ReactNode;
  defaultOpen?: boolean;
  title: string;
};

const DropDownPanel: FC<Props> = ({ children, defaultOpen = true, title }) => {
  const [open, setOpen] = useState<boolean>(defaultOpen);

  return (
    <Container>
      <Head color="primary" onClick={() => setOpen((o) => !o)} endIcon={open ? <ChevronUpIcon /> : <ChevronDownIcon />}>
        {title}
      </Head>
      {open && children}
    </Container>
  );
};

export default DropDownPanel;

import { FC } from 'react';
import { Breadcrumbs } from '@mui/material';

import { ReactComponent as ChevronRightIcon } from 'assets/icons/chevronRight.svg';
import { Container, Link, Separator } from './ui';
import { Dropdown } from '../Dropdown';

const breadcrumbs = [
  <Link key="ba">Home</Link>,
  <Dropdown key="bb">Light Square</Dropdown>,
  <Link key="bc" active>
    Goals and Milestones board
  </Link>,
];

const CustomBreadcrumbs: FC = () => {
  return (
    <Container>
      <Breadcrumbs
        separator={
          <Separator>
            <ChevronRightIcon />
          </Separator>
        }
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Container>
  );
};

export default CustomBreadcrumbs;

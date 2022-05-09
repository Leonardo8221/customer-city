import { FC } from 'react';
import { Breadcrumbs } from '@mui/material';

import { ReactComponent as ChevronRightIcon } from 'assets/icons/chevronRight.svg';
import { Container, Link, Separator } from './ui';
import { DropdownMenu } from '../DropdownMenu';

const breadcrumbs = [
  <Link key="ba">Home</Link>,
  <DropdownMenu key="bb">Light Square</DropdownMenu>,
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

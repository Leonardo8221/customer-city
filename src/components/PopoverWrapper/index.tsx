import { Popover } from '@mui/material';
import { FC, useState, ReactNode } from 'react';
import { ReactComponent as DotsIcon } from 'assets/icons/dots.svg';
import { StyledButton } from './ui';

type Props = {
  children?: ReactNode;
};

const DropDownWrapper: FC<Props> = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'popover-button' : undefined;

  return (
    <>
      <StyledButton aria-describedby={id} onClick={handleClick}>
        <DotsIcon />
      </StyledButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {children}
      </Popover>
    </>
  );
};

export default DropDownWrapper;

import { FC, useState, ReactNode } from 'react';

import { ReactComponent as TriangleDownIcon } from 'assets/icons/triangleDown.svg';
import { TextButton, Menu, MenuItem } from './ui';

interface DropdownProps {
  children: ReactNode;
}

const Dropdown: FC<DropdownProps> = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <TextButton variant="text" onClick={handleClick} endIcon={<TriangleDownIcon />}>
        {children}
      </TextButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        elevation={0}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: -12,
          horizontal: 15,
        }}
      >
        <MenuItem onClick={handleClose} active>
          Dashboard
        </MenuItem>
        <MenuItem onClick={handleClose}>Goals and Milestones</MenuItem>
        <MenuItem onClick={handleClose}>Forecast</MenuItem>
        <MenuItem onClick={handleClose}>Revenue Simulation</MenuItem>
      </Menu>
    </div>
  );
};

export default Dropdown;

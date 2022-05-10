import { FC, ReactNode, useState } from 'react';
import { ListItemText, Collapse } from '@mui/material';

import { ReactComponent as ChevronDownIcon } from 'assets/icons/chevronDown.svg';
import { ReactComponent as ChevronUpIcon } from 'assets/icons/chevronUp.svg';
import { NavRoute } from 'router/types';
import { ListItem, ListItemIcon } from '../../ui';
import { BlueDot, NotificationButton } from './ui';

interface MenuItemProps {
  Icon?: ReactNode;
  label: string;
  nestedItems?: NavRoute[];
  notifications?: number;
}

const MenuItem: FC<MenuItemProps> = ({ Icon, label, nestedItems, notifications }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    if (nestedItems && nestedItems.length > 0) {
      setExpanded(!expanded);
    }
  };

  return (
    <>
      <ListItem onClick={handleExpandClick}>
        {Icon && <ListItemIcon>{Icon}</ListItemIcon>}
        <ListItemText primary={label} primaryTypographyProps={{ variant: 'labelMedium14' }} />
        {nestedItems && nestedItems.length > 0 && (
          <ListItemIcon marginRight={0} small>
            {expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </ListItemIcon>
        )}
        {notifications && notifications > 0 && (
          <ListItemIcon marginRight={0}>
            <NotificationButton>{notifications}</NotificationButton>
          </ListItemIcon>
        )}
      </ListItem>

      {nestedItems && nestedItems.length > 0 && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {nestedItems.map((item) => (
            <ListItem key={item.name} nested>
              <ListItemIcon>
                <BlueDot />
              </ListItemIcon>
              <ListItemText primary={item.name} primaryTypographyProps={{ variant: 'labelMedium14' }} />
            </ListItem>
          ))}
        </Collapse>
      )}
    </>
  );
};

export default MenuItem;

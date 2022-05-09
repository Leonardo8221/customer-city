import { FC, ReactNode, useState } from 'react';
import { ListItemText, Collapse } from '@mui/material';

import { ReactComponent as ChevronDownIcon } from 'assets/icons/chevronDown.svg';
import { ReactComponent as ChevronUpIcon } from 'assets/icons/chevronUp.svg';
import { NavRoute } from 'router/types';
import { ListItem, ListItemIcon } from '../../ui';
import { BlueDot } from './ui';

interface MenuItemProps {
  Icon?: ReactNode;
  label: string;
  nestedItems?: NavRoute[];
}

const MenuItem: FC<MenuItemProps> = ({ Icon, label, nestedItems }) => {
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
      </ListItem>

      {nestedItems && nestedItems.length > 0 && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {nestedItems.map((item) => (
            <ListItem key={item.name}>
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

import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { ReactComponent as ChevronLeftIcon } from 'assets/icons/chevronLeft.svg';
import { ReactComponent as ChevronRightIcon } from 'assets/icons/chevronRight.svg';
import Visible from 'components/PanelLayout/Visible';
import { Typography } from '@mui/material';

const drawerWidth = 500;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

type PanelBodySidebarProps = {
  rightPanelChild?: JSX.Element
  middlePanelChild: JSX.Element
  leftPanelChild?: JSX.Element
  leftPanelTitle?: string
}

export default function PanelBodySidebar(props:PanelBodySidebarProps) {

  return (
    <Box sx={{ display: 'flex' }}>
      <LeftDrawer {...props} />
      <Box component="main">
        {props.middlePanelChild}
      </Box>
    </Box>
  );
}

function LeftDrawer(props: PanelBodySidebarProps){

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  if( !props.leftPanelChild ){
    return null;
  }

  return(
    <Drawer variant="permanent" open={open}>
      <Toolbar />
      <DrawerHeader>
        <Visible when={open}>
          <Typography variant='h2'>{props.leftPanelTitle}</Typography>
        </Visible>        
        <Visible when={open}>
          <IconButton 
                onClick={handleDrawerClose}
            >
            <ChevronLeftIcon />
          </IconButton>
        </Visible>
        <Visible when={!open}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
          >
            <ChevronRightIcon />
          </IconButton>
        </Visible>
      </DrawerHeader>
      <Visible when={open}>
        {props.leftPanelChild}
      </Visible>
    </Drawer>
  )

}
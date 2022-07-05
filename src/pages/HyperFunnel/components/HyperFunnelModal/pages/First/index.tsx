import { Box, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { ReactComponent as FunnelIcon } from 'assets/icons/menuFunnel.svg';
import { ReactComponent as QuestionIcon } from 'assets/icons/question.svg';
import { ActionSelect, FirstMain, SelectionIcon } from './ui';
import theme from 'core/theme';

export type ActionType = 'from-scratch' | 'from-template' | 'system-generate';

type SelectionType = {
  icon: {
    shape: ReactNode;
    color: string;
    backgroundColor?: string;
  };
  title: string;
  type: ActionType;
  description: string;
};

const Selections: SelectionType[] = [
  {
    icon: { shape: <PlusIcon />, color: theme.palette.primary.main, backgroundColor: theme.palette.primary.subtone3 },
    title: 'Create from Scratch',
    type: 'from-scratch',
    description: 'Use the Xperience Builder, the interactive drag & drop tool to craft your own business processes',
  },
  {
    icon: { shape: <FunnelIcon />, color: theme.palette.green.main, backgroundColor: theme.palette.green.light },
    title: 'Choose from the template',
    type: 'from-template',
    description: 'Pick one of our pre-built Pipeline templates',
  },
  {
    icon: { shape: <QuestionIcon />, color: theme.palette.orange.main, backgroundColor: theme.palette.orange.light },
    title: 'Respond to questionnaire and system generates pipeline',
    type: 'system-generate',
    description: 'Respond to the questionnaire and the system will generate the pipeline for you',
  },
];

interface Props {
  selected: ActionType;
  onSelect: (type: ActionType) => void;
}

const FirstPage: FC<Props> = ({ selected, onSelect }) => {
  return (
    <FirstMain>
      {Selections.map((selection, idx) => (
        <ActionSelect key={idx} onClick={() => onSelect(selection.type)} selected={selection.type === selected}>
          <SelectionIcon color={selection.icon.color} backgroundColor={selection.icon.backgroundColor}>
            {selection.icon.shape}
          </SelectionIcon>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', pt: '4px' }}>
            <Typography variant="labelMedium14">{selection.title}</Typography>
            <Typography variant="p12" sx={{ color: 'neutral.n400' }}>
              {selection.description}
            </Typography>
          </Box>
        </ActionSelect>
      ))}
    </FirstMain>
  );
};

export default FirstPage;

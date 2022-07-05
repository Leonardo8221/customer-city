import { Box, Typography } from '@mui/material';
import { CustomInput } from 'components/CustomInput';
import { NotificationButton, Notification } from 'components/ui';
import { ReactComponent as AvatarIcon } from 'assets/icons/avatarFilled.svg';
import { ReactComponent as DocumentIcon } from 'assets/icons/documentFilled.svg';
import { ReactComponent as ProductIcon } from 'assets/icons/productFilled.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { FC, ReactNode } from 'react';
import { SecondMain, SelectionIcon, SelectItem, SelectionLabel } from './ui';

export type DetailType = 'documents' | 'team&users' | 'products';

interface SelectionType {
  icon: ReactNode;
  title: string;
  type: DetailType;
}

const Selections: SelectionType[] = [
  {
    icon: <DocumentIcon />,
    title: 'Documents',
    type: 'documents',
  },
  {
    icon: <AvatarIcon />,
    title: 'Team and Users',
    type: 'team&users',
  },
  {
    icon: <ProductIcon />,
    title: 'Products',
    type: 'products',
  },
];

interface Props {
  onDetail: (detail: DetailType) => void;
}

const SecondPage: FC<Props> = ({ onDetail }) => {
  return (
    <SecondMain>
      <CustomInput
        id="pipelineName"
        name="pipelineName"
        label="Pipeline name"
        placeholder="Type the pipeline name"
        fullWidth
      />
      <CustomInput
        id="pipelineDescription"
        name="pipelineDescription"
        label="Pipeline description"
        placeholder="Add a pipeline description"
        fullWidth
      />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
        <Typography variant="p12" sx={{ color: 'neutral.main' }}>
          DETAILS
        </Typography>
        <NotificationButton>0</NotificationButton>
      </Box>
      <Typography variant="p12" sx={{ color: 'neutral.n400' }}>
        You can edit the Pipeline and add more details after it’s creating
      </Typography>

      {Selections.map((selection, idx) => (
        <SelectItem key={idx} onClick={() => onDetail(selection.type)}>
          <SelectionLabel>
            <SelectionIcon>{selection.icon}</SelectionIcon>
            <Typography variant="p14">{selection.title}</Typography>
            <Notification>0</Notification>
          </SelectionLabel>

          <PlusIcon className="plus-n400" />
        </SelectItem>
      ))}
    </SecondMain>
  );
};

export default SecondPage;

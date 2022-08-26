import { FC, useContext, useMemo, useState, useEffect } from 'react';
import { TeamUsersMain } from './ui';
import { Typography, IconButton } from '@mui/material';
import { TextButton, LoadingButton } from 'components/ui';
import { useUser } from 'store/user/hooks';
import { ReactComponent as ArrowLeft } from 'assets/icons/navBack.svg';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { ButtonGroup, ModalFooter, BackTo, ModalContainer, ModalHeader } from '../../ui';
import { Pipeline, PipelineFormContext, PipelineFormSteps } from 'pages/HyperFunnel/PipelinesProvider';
import { useFormikContext } from 'formik';
import { User } from 'store/user/types';
import { CustomMultiDropdown } from 'components/CustomDropdown';
import { OptionValue } from 'core/types';
import update from 'immutability-helper';

const TeamUsersPage: FC = () => {
  const { users } = useUser();

  const { onClose, setStep } = useContext(PipelineFormContext);
  const [selectedUsers, setSelectedUsers] = useState<OptionValue<User>[]>([]);

  const { values, touched, errors, setValues, handleBlur } = useFormikContext<Pipeline>();

  useEffect(() => {
    setSelectedUsers(
      values.pipelineUsers.map((user) => {
        return { label: user.userName, value: user };
      }),
    );
  }, [values]);

  const userSuggestions = useMemo(() => {
    return users.reduce((acc, val) => {
      acc.push({ label: val.userName, value: val });
      return acc;
    }, [] as OptionValue<User>[]);
  }, [users]);

  const handleSave = () => {
    setValues(update(values, { $merge: { pipelineUsers: selectedUsers.map((s) => s.value) } }));
    setStep(PipelineFormSteps.SECOND);
  };

  return (
    <ModalContainer>
      <ModalHeader>
        <Typography variant="h3" sx={{ color: 'neutral.main' }}>
          {'Teams & Users'}
        </Typography>

        <IconButton onClick={onClose}>
          <CrossIcon />
        </IconButton>
      </ModalHeader>

      <TeamUsersMain sx={{ height: 496 }}>
        <CustomMultiDropdown<User>
          id="pipelineOwners"
          placeholder="Choose Users"
          value={selectedUsers}
          options={userSuggestions}
          onSelect={(value) => setSelectedUsers(value)}
          InputProps={{
            error: touched.pipelineUsers && !!errors.pipelineUsers,
            onBlur: handleBlur,
          }}
        />
      </TeamUsersMain>

      <ModalFooter>
        <BackTo onClick={() => setStep(PipelineFormSteps.SECOND)}>
          <ArrowLeft />
          <Typography variant="p12">Back to Pipeline creating</Typography>
        </BackTo>

        <ButtonGroup>
          <TextButton sx={{ marginRight: 3 }} onClick={() => onClose}>
            Cancel
          </TextButton>
          <LoadingButton variant="contained" onClick={handleSave}>
            {'Save and back to Pipeline'}
          </LoadingButton>
        </ButtonGroup>
      </ModalFooter>
    </ModalContainer>
  );
};

export default TeamUsersPage;

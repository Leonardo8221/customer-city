import { LoadingButton } from '@mui/lab';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { Modal, ModalContainer, ModalHeader, PaginatedModalFooter, TextButton } from 'components/ui';
import { PRIVATE_ABS_ROUTE_PATHS } from 'core/constants';
import { FC, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';

interface Props {
  open: boolean;
  toggleOpen: () => void;
}

const EmailProviderModal: FC<Props> = ({ open, toggleOpen }) => {
  const navigate = useNavigate();
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    toggleOpen();
  };

  const onSubmit = async (values: any) => {
    setLoading(true);
    try {
      // do auth integration here
      navigate(generatePath(PRIVATE_ABS_ROUTE_PATHS.contactDetail, { id: '4' }));
      closeModal();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <Modal open={open} onClose={toggleOpen}>
      <ModalContainer>
        <ModalHeader>
          <Typography variant="h3" sx={{ color: 'neutral.main' }}>
            {'Connect an Inbox'}
          </Typography>

          <IconButton onClick={toggleOpen}>
            <CrossIcon />
          </IconButton>
        </ModalHeader>

        <Divider />
        <PaginatedModalFooter>
          <Box sx={{ width: 250 }}></Box>
          <span>
            <strong>{isFirst ? '1' : '2'}</strong> / 2
          </span>
          <Box sx={{ width: 250, display: 'flex', flexDirection: 'row-reverse' }}>
            {isFirst ? (
              <LoadingButton variant="contained" onClick={() => setIsFirst(false)}>
                Next
              </LoadingButton>
            ) : (
              <LoadingButton
                variant="contained"
                loading={loading}
                onClick={(event) => {
                  event.preventDefault();
                  {
                    onSubmit(null);
                  }
                }}
                type="submit"
              >
                {'Next'}
              </LoadingButton>
            )}
            <TextButton sx={{ marginRight: 3 }} onClick={toggleOpen}>
              Cancel
            </TextButton>
          </Box>
        </PaginatedModalFooter>
      </ModalContainer>
    </Modal>
  );
};

export default EmailProviderModal;

import { ReactComponent as CameraIcon } from 'assets/icons/camera.svg';
import { ReactComponent as CheckCircleIcon } from 'assets/icons/checkCircleBlue.svg';
import { ReactComponent as DotsIcon } from 'assets/icons/dots.svg';
import { ReactComponent as EditCircleIcon } from 'assets/icons/editCircleBlue.svg';
import { ReactComponent as EmailIcon } from 'assets/icons/email.svg';
import { ReactComponent as PhoneIcon } from 'assets/icons/phone.svg';
import { ReactComponent as SMSIcon } from 'assets/icons/sms.svg';
import { EmailProviderModal } from 'pages/ContactDetail/components/ContactActivity/components/EmailProviderModal';
import { FC, useCallback, useEffect, useState } from 'react';
import { useEmail } from 'store/email/hooks';
import EmailModal from '../EmailModal';
import { ActionButton, Container, VirticalDivider } from './ui';

const ActivityToolBar: FC = () => {
  const [emailOpen, setEmailOpen] = useState<boolean>(false);
  const [emailProviderOpen, setEmailProviderOpen] = useState<boolean>(false);
  const [postAction, setPostAction] = useState<boolean>(false);
  const { connectedAccount, getConnectedAccount, loading } = useEmail();

  const toggleEmailOpen = useCallback(() => {
    setEmailOpen((prevState) => !prevState);
  }, []);

  const toggleEmailProviderOpen = useCallback(() => {
    setEmailProviderOpen((prevState) => !prevState);
  }, []);

  const openEmailAction = loading ? () => true : connectedAccount ? toggleEmailOpen : toggleEmailProviderOpen;

  useEffect(() => {
    if (!emailProviderOpen) {
      getConnectedAccount();
    }
  }, [emailProviderOpen]);

  useEffect(() => {
    if (postAction && connectedAccount) {
      setEmailOpen(true);
    }
  }, [postAction, connectedAccount]);

  return (
    <Container>
      <ActionButton startIcon={<CheckCircleIcon />}>Note</ActionButton>
      <ActionButton startIcon={<EditCircleIcon />}>Task</ActionButton>
      <VirticalDivider />
      <ActionButton startIcon={<EmailIcon />} onClick={openEmailAction}>
        Email
      </ActionButton>
      <ActionButton startIcon={<PhoneIcon />}>Call</ActionButton>
      <ActionButton startIcon={<SMSIcon />}>SMS</ActionButton>
      <ActionButton startIcon={<CameraIcon />}>Meeting</ActionButton>
      <ActionButton startIcon={<DotsIcon />} />
      <>
        <EmailModal open={emailOpen} toggleOpen={toggleEmailOpen} />
        <EmailProviderModal
          open={emailProviderOpen}
          toggleOpen={toggleEmailProviderOpen}
          postAction={() => {
            setPostAction(true);
          }}
        />
      </>
    </Container>
  );
};

export default ActivityToolBar;

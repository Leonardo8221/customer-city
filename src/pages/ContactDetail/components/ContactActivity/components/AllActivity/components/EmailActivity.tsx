import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { ReactComponent as EmailIcon } from 'assets/icons/emailCircleGreen.svg';
import { format } from 'date-fns';
import { FC } from 'react';
import { Activity } from 'store/activity/types';
import { useContact } from 'store/contact/hooks';
import { useUser } from 'store/user/hooks';
import { EMAIL_TYPE_ID } from 'types';
import EmailCard from './EmailCard';

type Props = Partial<Activity>;

const EmailActivity: FC<Props> = (props) => {
  const { user } = useUser();
  const { contact } = useContact();
  const { emailActivityDetails, status: statusText } = props;

  const lastEmailDetail = emailActivityDetails?.[(emailActivityDetails?.length || 0) - 1];
  const from =
    (lastEmailDetail?.emailTypeId === EMAIL_TYPE_ID.OUTGOING
      ? user?.userName
      : `${contact?.lastName} ${contact?.firstName}`) || '';

  const to =
    (lastEmailDetail?.emailTypeId === EMAIL_TYPE_ID.OUTGOING
      ? `${contact?.lastName} ${contact?.firstName}`
      : user?.userName) || '';

  const subject = lastEmailDetail?.emailSubject || '';
  const body = lastEmailDetail?.emailBody || '';

  const actionText =
    (emailActivityDetails?.length || 0) > 1 && lastEmailDetail?.emailTypeId === EMAIL_TYPE_ID.INCOMING
      ? 'replied'
      : 'send email';

  const dateYearAndTime = format(new Date(String(lastEmailDetail?.emailDate)), 'PPp').split(',');
  const dateTime = `${dateYearAndTime[0]} ${dateYearAndTime[2]}`;
  const threads = emailActivityDetails?.length || 0;

  return (
    <Box display="flex" flexDirection="row" justifyContent="center" gap={1}>
      <Avatar sx={{ bgcolor: 'green.main' }} aria-label="email">
        <EmailIcon />
      </Avatar>
      <EmailCard {...{ to, from, subject, body, actionText, statusText, dateTime, threads }} />
    </Box>
  );
};

export default EmailActivity;

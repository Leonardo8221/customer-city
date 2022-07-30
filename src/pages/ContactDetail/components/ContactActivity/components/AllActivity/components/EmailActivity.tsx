import { Box, Chip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ReactComponent as ExpandMoreIcon } from 'assets/icons/chevronDown.svg';
import { ReactComponent as ContactIcon } from 'assets/icons/contactAvatar.svg';
import { ReactComponent as EmailIcon } from 'assets/icons/emailCircleGreen.svg';
import { CustomLinkLabel } from 'components/CustomLinkLabel';
import { TextLinkButton } from 'components/ui';
import theme from 'core/theme';
import { format } from 'date-fns';
import * as React from 'react';
import { FC } from 'react';
import { Activity } from 'store/activity/types';
import { useContact } from 'store/contact/hooks';
import { useUser } from 'store/user/hooks';
import { ACTIVITY_STATUS, EMAIL_TYPE_ID } from 'types';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginRight: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

type Props = Partial<Activity>;

const EmailActivity: FC<Props> = (props) => {
  const { user } = useUser();
  const { contact } = useContact();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const { emailActivityDetails, status } = props;
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

  const typeText =
    (emailActivityDetails?.length || 0) > 1 && lastEmailDetail?.emailTypeId === EMAIL_TYPE_ID.INCOMING
      ? 'replied'
      : 'send email';

  const emailDate = format(new Date(String(lastEmailDetail?.emailDate)), 'dd MMMM');
  const time = String(lastEmailDetail?.emailTime).split(':');
  const hour = time[0],
    minute = time[1];
  const emailTime = format(new Date(0, 0, 0, parseInt(hour, 0), parseInt(minute, 0)), "hh:mm aaaaa'm'");
  const chipBgColor = status === ACTIVITY_STATUS.SPAM ? 'orange.main' : 'green.main';
  return (
    <Box display="flex" flexDirection="row" justifyContent="flex-start" gap={1}>
      <Avatar sx={{ bgcolor: 'green.main' }} aria-label="email">
        <EmailIcon />
      </Avatar>
      <Card sx={{ width: 520, mb: 1 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'background.paper' }} aria-label="contact">
              <ContactIcon />
            </Avatar>
          }
          title={
            <Box display="flex" flexDirection="row" justifyContent="space-between">
              <Box display="flex" flexDirection="row" gap={0.5} alignItems="center" width={'70%'}>
                <Typography variant="p14">{from}</Typography>
                <Typography variant="labelRegular12" sx={{ color: 'neutral.n400' }}>
                  {typeText}
                </Typography>
                <Chip label={String(status)} sx={{ ml: 1, backgroundColor: chipBgColor, color: 'neutral.white' }} />
              </Box>
              <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" width={'30%'}>
                <Typography variant="labelRegular12" sx={{ color: 'neutral.n400' }}>
                  {`${emailDate} ${emailTime}`}
                </Typography>
              </Box>
            </Box>
          }
          subheader={
            <Box display="flex" flexDirection="row" justifyContent="space-between">
              <Box display="flex" flexDirection="row" gap={0.5} alignItems="center" width={'70%'}>
                <Typography variant="labelRegular12" sx={{ color: 'neutral.n400' }}>
                  {'to'}
                </Typography>
                <Typography variant="p14">{to}</Typography>
              </Box>
              <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" width={'30%'}>
                <TextLinkButton href="#" style={{ fontSize: 14 }}>
                  Forward
                </TextLinkButton>
                <TextLinkButton href="#" style={{ fontSize: 14 }}>
                  Reply
                </TextLinkButton>
              </Box>
            </Box>
          }
        />
        <CardContent>
          <Typography variant="body1" color="text.primary">
            {subject}
          </Typography>
          {!expanded && (
            <Typography
              variant="body2"
              color="text.secondary"
              width="488px"
              height="50px"
              noWrap
              dangerouslySetInnerHTML={{ __html: body }}
            />
          )}
        </CardContent>
        <CardActions>
          <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
            {!expanded && (
              <TextLinkButton href="#" style={{ fontSize: 14 }}>
                {'Show more'}
              </TextLinkButton>
            )}
            <ExpandMoreIcon style={{ marginLeft: 4 }} />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent sx={{ padding: '0 16px' }}>
            <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: body }} />
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
};

export default EmailActivity;

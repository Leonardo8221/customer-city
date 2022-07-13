import { Box, Typography } from '@mui/material';
import { CustomLinkLabel } from 'components/CustomLinkLabel';
import { TextLinkButton } from 'components/ui';
import { TextValue } from 'components/ui/text';
import { FC } from 'react';
import { FieldContainer, PropertyTitle } from '../../../ui';

interface Props {
  isCompatiblePlan: boolean;
  permissions: string;
  subscriptionTitle: string;
  subscriptions: string;
  subscriptionPageLink: string;
}

const Requirement: FC<Props> = ({
  isCompatiblePlan,
  permissions,
  subscriptionTitle,
  subscriptions,
  subscriptionPageLink,
}) => {
  const FieldTitle: FC<{ children: string }> = ({ children }) => (
    <Typography component="p" variant="labelRegular12" sx={{ color: 'neutral.n400' }}>
      {children}
    </Typography>
  );
  const FieldValue = TextValue;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <PropertyTitle>Requirements</PropertyTitle>
      <FieldContainer>
        <FieldTitle>CustomerCity Subscription</FieldTitle>
        <CustomLinkLabel
          href={'https://customercitydev.com'}
          captionText={`${isCompatiblePlan ? '' : 'Not'} Compatible with your`}
          linkText="CustomerCity plan"
          withIcon
        />
        <TextLinkButton href="https://customercitydev.com" style={{ justifyContent: 'start' }}>
          See all compatible plans
        </TextLinkButton>
        {/* <CustomLinkLabel href={'https://customercitydev.com'} linkText="See all compatible plans" withIcon /> */}
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>CustomerCity Account Permissions</FieldTitle>
        <FieldValue>{permissions}</FieldValue>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>{subscriptionTitle}</FieldTitle>
        <CustomLinkLabel href={subscriptionPageLink} linkText={subscriptions} withIcon />
      </FieldContainer>
    </Box>
  );
};
export default Requirement;

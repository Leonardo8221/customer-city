import { Box, Divider, Grid } from '@mui/material';
import { CustomSelect } from 'components/CustomSelect';
import StageBar from 'components/StageBar';
import TitleContainer from 'components/TitileContainer/TitleContainer';
import { ReactComponent as DealRoundIcon } from 'assets/icons/dealRound.svg';
import { FC } from 'react';
import { DealContainer } from './ui';

const DealItem: FC = () => {
  return (
    <>
      <DealContainer>
        <Grid item xs={12} sm={6}>
          <TitleContainer label="Deal Name">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <DealRoundIcon />
              <CustomSelect<string>
                value={'aronda'}
                options={[{ label: 'Aronda', value: 'aronda' }]}
                sx={{
                  '& .MuiSelect-select': {
                    padding: 0,
                  },
                }}
              />
            </Box>
          </TitleContainer>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TitleContainer label="Stage">
            <CustomSelect<string>
              value={'engagement'}
              options={[{ label: 'Engagement', value: 'engagement' }]}
              sx={{
                '& .MuiSelect-select': {
                  padding: 0,
                },
              }}
            />
            <StageBar stage={6} />
          </TitleContainer>
        </Grid>
      </DealContainer>
      <Divider />
    </>
  );
};

export default DealItem;

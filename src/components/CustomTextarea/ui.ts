import { styled, TextareaAutosize } from '@mui/material';

export const Textarea = styled(TextareaAutosize)(({ theme }) => ({
  width: '100%',
  border: `1px solid ${theme.palette.neutral.n200}`,
  borderRadius: 4,
  padding: '8px 16px',
  fontFamily: theme.typography.fontFamily,
  resize: 'none',
  '&::-webkit-input-placeholder, &:-moz-placeholder, &::-moz-placeholder, &:-ms-input-placeholder, &::placeholder': {
    ...theme.typography.p14,
    color: theme.palette.neutral.n400,
    fontWeight: 400,
  },
  ':hover': {
    borderColor: theme.palette.primary.main,
    borderWidth: 1,
  },
  ':focus': {
    borderColor: theme.palette.primary.main,
    borderWidth: 1,
    outline: 'none !important',
  },
}));

import { Select, OptionItem } from './ui';

type OptionValue = string | number;

interface Option<T extends OptionValue> {
  label: string;
  value: T;
}

interface CustomSelectProps<T extends OptionValue> {
  value: T;
  options: Option<T>[];
  onSelect: (value: T) => void;
}

const CustomSelect = <T extends OptionValue>({ value, options, onSelect }: CustomSelectProps<T>): JSX.Element => {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <Select
      value={selectedOption?.value ?? ''}
      label={selectedOption?.label ?? ''}
      onChange={(event) => onSelect(event.target.value as T)}
      MenuProps={{
        PaperProps: {
          style: {
            boxShadow: '0px 4px 24px rgba(23, 46, 82, 0.08)',
            borderRadius: '4px',
          },
        },
      }}
    >
      {options.map((option) => (
        <OptionItem key={option.value} value={option.value}>
          {option.label}
        </OptionItem>
      ))}
    </Select>
  );
};

export default CustomSelect;

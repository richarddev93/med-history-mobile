import { Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Input from './Input';
import { useState } from 'react';
import { UIIconName } from '@/types/ui-types';

export type DatePickerProps = {
  iconName?: UIIconName;
  label?: string;
  placeholder?: string;
  dateValue: Date | null;
  mode?: 'date' | 'time' | 'datetime';
  setDateValue: (date: Date) => void;
};

export const DatePicker: React.FC<DatePickerProps> = ({
  mode = 'date',
  iconName,
  label,
  placeholder,
  dateValue,
  setDateValue,
}) => {
  const [show, setShow] = useState(false);

  const handleChange = (_: any, date?: Date) => {
    if (Platform.OS !== 'ios') setShow(false);
    if (date) setDateValue(date);
  };

  const formatDate = (date: Date) => {
    if (mode === 'time') {
      return date.toLocaleTimeString('pt-BR').split(':')[0] + ':' + date.toLocaleTimeString('pt-BR').split(':')[1];
    }
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <>
      <TouchableOpacity className='flex-1' onPress={() => setShow(true)}>
        <Input
          iconName={iconName}
          label={label}
          placeholder={placeholder}
          value={dateValue ? formatDate(dateValue) : ''}
          editable={false}
        />
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={dateValue ?? new Date()}
          mode={mode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
          maximumDate={new Date()}
        />
      )}
    </>
  );
};

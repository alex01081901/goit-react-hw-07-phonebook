import { Input, Label } from 'components/ContactForm/ContactForm.styled';
import { useDispatch } from 'react-redux';
import { setFilter } from 'redux/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <Label htmlFor="search">
      Find contacts by name
      <Input type="text" id="search" onChange={handleChange} />
    </Label>
  );
};
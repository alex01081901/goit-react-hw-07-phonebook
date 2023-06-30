import { addContact } from 'redux/operations';
import { Button, Form, Input, Label } from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleSubmit = e => {
    e.preventDefault();

    const duplicatedContact = contacts.items.find(
      contact =>
        contact.name.toLowerCase() ===
        e.target.elements.name.value.toLowerCase()
    );

    if (duplicatedContact) {
      return alert(`${duplicatedContact.name} is already in contacts`);
    }

    const newContact = {
      name: e.target.elements.name.value,
      phone: e.target.elements.number.value,
    };

    dispatch(addContact(newContact));

    e.target.reset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="name">
        Name
        <Input
          type="text"
          name="name"
          id="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </Label>
      <Label htmlFor="number">
        Number
        <Input
          type="tel"
          name="number"
          id="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Label>
      <Button
        type="submit"
        disabled={contacts.isAdding}
        onMouseDown={e => (e.target.style.backgroundColor = '#3e7fe9')}
        onMouseUp={e => (e.target.style.backgroundColor = 'transparent')}
      >
        {contacts.isAdding ? 'Adding...' : 'Add contact'}
      </Button>
    </Form>
  );
};
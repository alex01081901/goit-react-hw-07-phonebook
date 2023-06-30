import { ContactListItem } from 'components';
import { Li } from '../ContactListItem/ContactListItem.styled';
import { useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';

const getVisibleContacts = (contacts, filter) => {
  const normalizedFilter = filter.toLowerCase();

  return contacts.items.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
};

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const visibleContacts = getVisibleContacts(contacts, filter);

  return (
    <ul>
      {contacts.isLoading && <div>Loading...</div>}
      {contacts.error && (
        <div>Something went wrong. Error message: {contacts.error}</div>
      )}
      {visibleContacts.map(contact => (
        <Li key={contact.id}>
          <ContactListItem contact={contact} />
        </Li>
      ))}
    </ul>
  );
};
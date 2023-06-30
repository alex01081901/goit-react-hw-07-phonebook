import PropTypes from 'prop-types';
import { Button } from 'components/ContactForm/ContactForm.styled';
import { Span } from './ContactListItem.styled';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/operations';
import { getContacts } from 'redux/selectors';

export const ContactListItem = ({ contact }) => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };

  return (
    <>
      <Span>
        {contact.name}: {contact.phone}
      </Span>
      <Button
        type="button"
        onClick={handleDelete}
        disabled={contacts.isDeleting}
        onMouseDown={e => (e.target.style.backgroundColor = '#3e7fe9')}
        onMouseUp={e => (e.target.style.backgroundColor = 'transparent')}
      >
        {contacts.isDeleting ? 'Deleting...' : 'Delete'}
      </Button>
    </>
  );
};

ContactListItem.propTypes = {
  contact: PropTypes.object.isRequired,
};
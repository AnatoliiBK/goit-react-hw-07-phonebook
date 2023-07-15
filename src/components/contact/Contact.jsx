import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'components/redux/contactsSlice';
import { nameStyle, name, btnDelStyle } from 'components/styles';

export const ContactItem = ({ contact }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };

  return (
    <li style={nameStyle}>
      <p style={name}>{contact.name} :</p>
       {contact.number}
      <button onClick={handleDelete} style={btnDelStyle}>
        Delete
      </button>
    </li>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
};
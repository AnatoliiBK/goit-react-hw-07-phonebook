import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addContact } from 'components/redux/contactsSlice';
import { formStyle, labelStyle, inputStyle, buttonStyle } from 'components/styles';
import { nanoid } from 'nanoid';

export const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = e.target.elements;


    const newContact = {
      id: nanoid(),
      name: name.value,
      number: number.value,
    };

    dispatch(addContact(newContact));

    name.value = '';
    number.value = '';
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <label style={labelStyle}>
        Name
        <input
          style={inputStyle}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' :][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash, space, or colon. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

      <label style={labelStyle}>
        Number
        <input
          style={inputStyle}
          type="tel"
          name="number"
          // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>

      <button type="submit" style={buttonStyle}>
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  handleSubmit: PropTypes.func,
  name: PropTypes.string,
  number: PropTypes.string,
};

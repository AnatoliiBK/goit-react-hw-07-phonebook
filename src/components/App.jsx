import { ContactForm } from './form/Form';
import { ContactList } from './contact/ContactList';
import PropTypes from 'prop-types';


export function App() {
  
  return (
    <div>
      <h1 style={{ marginLeft: '80px', fontSize: '40px' }}>Phonebook</h1>
      <ContactForm />
      <ContactList />
    </div>
  );
}

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

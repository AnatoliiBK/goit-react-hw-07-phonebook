import PropTypes from 'prop-types';
import { labelStyle, inputStyle } from './styles';

export const Filter = ({ handleChange }) => {
  
  return (
    <label style={labelStyle}>
      Find contacts by name
      <input
        type="text"
        name="filter"       
        onChange={handleChange}
        style={inputStyle}
      />
    </label>
  );
};


Filter.propTypes = {
  filter: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

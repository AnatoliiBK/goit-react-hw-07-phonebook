import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from './redux/contactsSlice';
import { labelStyle, inputStyle } from './styles';
import PropTypes from 'prop-types';

export const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const filterValue = e.target.value;
    dispatch(setFilter(filterValue));
  };

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



// import PropTypes from 'prop-types';
// import { labelStyle, inputStyle } from './styles';

// export const Filter = ({ handleChange }) => {
  
//   return (
//     <label style={labelStyle}>
//       Find contacts by name
//       <input
//         type="text"
//         name="filter"       
//         onChange={handleChange}
//         style={inputStyle}
//       />
//     </label>
//   );
// };


Filter.propTypes = {
  filter: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

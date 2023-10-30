import React, { useState } from 'react';
import { ImSearch } from "react-icons/im";

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(query);
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label" ><ImSearch /></span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </form>
    </header>
  );
  
};

export default Searchbar;


// import React, { Component } from 'react';
// import { ImSearch } from "react-icons/im";

// class Searchbar extends Component {
//   state = {
//     query: '',
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     this.props.onSubmit(this.state.query);
//   };

//   handleChange = (e) => {
//     this.setState({ query: e.target.value });
//   };

//   render() {
//     return (
//       <header className="Searchbar">
//         <form className="SearchForm" onSubmit={this.handleSubmit}>
//           <button type="submit" className="SearchForm-button">
//             <span className="SearchForm-button-label" ><ImSearch /></span>
//           </button>

//           <input
//             className="SearchForm-input"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={this.state.query}
//             onChange={this.handleChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }

// export default Searchbar;
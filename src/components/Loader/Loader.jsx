import React, { Component } from 'react';
import {Circles} from 'react-loader-spinner';

class Loader extends Component {
  render() {
    return (
    <div className="loader">
      <Circles
        height="80"
        width="80"
        color="#303f9f"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
    );
  }
}

export default Loader;



import React, {Component} from 'react';

class Button extends Component {
  // render() {
  //   const { onClick, isHidden } = this.props;
  //   if (isHidden) return null;
  //   return (
     
  //       <button type="button" className="Button" onClick={onClick}>
  //         Load more...
  //       </button>
      
  //   );
  // };

  render() {

    const { onLoadMore, shouldRenderButton } = this.props;
    return shouldRenderButton ? (
      <button type="button" className="Button" onClick={onLoadMore}>
        Load more...
      </button>
    ) : null;
  };

};


export default Button;


// class Button extends Component {
//   render() {

//     const { onLoadMore, shouldRenderButton } = this.props;
//     return shouldRenderButton ? (
//       <button type="button" className="Button" onClick={onLoadMore}>
//         Load more...
//       </button>
//     ) : null;
//   };

// };

// export default Button;






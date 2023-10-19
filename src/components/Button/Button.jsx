import React, {Component} from 'react';

class Button extends Component {
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


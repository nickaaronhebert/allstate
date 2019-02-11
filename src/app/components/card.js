import React, { Component} from 'react';


export default class Card extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div style={{ ...Object.assign({ backgroundColor: 'white', width: '100%', boxShadow: '0 0px 24px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02)' }, this.props.style ? this.props.style : {}) }}>
        <div style={{ padding: '20px' }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

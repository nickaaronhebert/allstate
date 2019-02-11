import React, { Component} from 'react';
import JSONInput from 'react-json-editor-ajrm';

export default class JsonViewerEditor extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <JSONInput
        id = 'a_unique_id'
        placeholder = { this.props.json }
        theme = { 'dark_vscode_tribute' }
        height = '550px'
        viewOnly={this.props.viewOnly}
      />
    );
  }
}

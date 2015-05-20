import React from 'react';

const style = {
  border: 'none',
  height: '100%',
  width: '100%'
}

export default class Renderer extends React.Component {
  render() {
    return (
      this.props.spineItem ?
        <iframe src={`${this.props.contentBaseUri}/${this.props.spineItem.href}`} style={style} /> :
        <span style={style}>loading</span>
    );
  }
}

Renderer.propTypes = {
  contentBaseUri: React.PropTypes.string,
  spineItem: React.PropTypes.object
}

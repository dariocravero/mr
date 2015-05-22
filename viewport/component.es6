import React from 'react';

const style = {
  border: 'none',
  height: '100%',
  width: '100%'
}

export default class Viewport extends React.Component {
  render() {
    return (
      this.props.spineItem ?
        <iframe src={`${this.props.contentBaseUri}/${this.props.spineItem.href}`} style={style} /> :
        <span style={style}>loading...</span>
    );
  }
}

Viewport.propTypes = {
  contentBaseUri: React.PropTypes.string.isRequired,
  spineItem: React.PropTypes.shape({
    href: React.PropTypes.string.isRequired
  }).isRequired
}

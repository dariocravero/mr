import React from 'react';

const style = {
  border: 'none',
  height: '100%',
  width: '100%'
}

export default class Viewport extends React.Component {
  render() {
    return <iframe id={this.props.viewportId} src={`${this.props.contentBaseUri}/${this.props.spineItem.href}`} style={style} />;
  }
}

Viewport.propTypes = {
  contentBaseUri: React.PropTypes.string.isRequired,
  spineItem: React.PropTypes.shape({
    href: React.PropTypes.string.isRequired
  }).isRequired,
  viewportId: React.PropTypes.string.isRequired
}

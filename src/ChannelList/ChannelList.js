import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Channel from '../Channel/Channel';
import { removeChannel, updateChannel } from '../actions';
import './styles.css';

class ChannelList extends Component {
  constructor(props) {
    super(props);

    this.renderChannels = this.renderChannels.bind(this);
  }

  componentWillMount() {
    this.props.channels.forEach((channel) => {
      this.props.updateChannel(channel.name);
    });
  }

  renderChannels() {
    return (
      this.props.channels.map((channel, index) =>
        <Channel channel={ channel } key={ index } removeChannel={ this.props.removeChannel } />)
    );
  }

  render() {
    return (
      <div>
        {this.props.channels.length > 0 ?
          <ul>
            {this.renderChannels()}
          </ul> :
          <p styleName="toAdd">Use the search bar to add channels to watch.</p>
        }
      </div>
    );
  }
}

ChannelList.propTypes = {
  channels: PropTypes.array.isRequired,
  removeChannel: PropTypes.func.isRequired,
  updateChannel: PropTypes.func.isRequired
};

function mapStateToProps({channels}) {
  return {channels};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({removeChannel, updateChannel}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);

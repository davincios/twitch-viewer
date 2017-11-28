import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Channel = ({channel, removeChannel}) => {
  return (
    <li styleName={ 'channel ' + (channel.stream ? 'online' : 'offline') }>
      <a href={ channel.link } target="_blank">
        <img styleName="logo" src={ channel.logo } alt={ channel.name }/>
        <div styleName="info">
          <h2>{channel.name}</h2>
          <p styleName="status">{channel.status}</p>
          {channel.stream ?
            <p>
              <i className="fa fa-circle" styleName="record" />
              <span>LIVE: </span> {channel.stream}
            </p> :
            <p><span>OFFLINE</span></p>
          }
        </div>
      </a>
      <i
        className="fa fa-times-circle"
        styleName="delete"
        onClick={ () => removeChannel(channel.name) } />
    </li>
  );
};

Channel.propTypes = {
  removeChannel: PropTypes.func.isRequired,
  channel: PropTypes.object.isRequired
};

export default Channel;

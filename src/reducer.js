import * as types from './actionTypes';
import initialState from './initialState';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.INPUT: {
      let newState = JSON.parse(JSON.stringify(state));

      newState.term = action.term;

      return newState;
    }

    case types.SET_ERROR: {
      let newState = JSON.parse(JSON.stringify(state));

      newState.error = action.error;

      return newState;
    }

    case types.ADD_CHANNEL: {
      let newState = JSON.parse(JSON.stringify(state));

      // Gives error message if channel doesn't exist
      if (action.error) {
        newState.error = action.payload.response.data.message;

        return newState;
      }

      const channelData = action.payload[0].data;
      const streamData = action.payload[1].data;
      const stream = streamData.stream ? streamData.stream.game : false;

      // This if/else statement assures that the array is sorted by online first
      // without needing the sort function.
      if (stream) {
        newState.channels.unshift({
          name: channelData.display_name,
          link: channelData.url,
          logo: channelData.logo,
          status: channelData.status,
          stream
        });
      } else {
        newState.channels.push({
          name: channelData.display_name,
          link: channelData.url,
          logo: channelData.logo,
          status: channelData.status,
          stream
        });
      }

      localStorage.setItem('channels', JSON.stringify(newState.channels));

      return newState;
    }

    case types.REMOVE_CHANNEL: {
      let newState = JSON.parse(JSON.stringify(state));
      const removeChannelIndex = newState.channels.findIndex((channel) => {
        return channel.name === action.name;
      });

      newState.channels.splice(removeChannelIndex, 1);
      newState.error = '';
      localStorage.setItem('channels', JSON.stringify(newState.channels));

      return newState;
    }

    case types.UPDATE_CHANNEL: {
      let newState = JSON.parse(JSON.stringify(state));
      const channelData = action.payload[0].data;
      const streamData = action.payload[1].data;
      const stream = streamData.stream ? streamData.stream.game : false;
      const updateChannelIndex = newState.channels.findIndex((channel) => {
        return channel.name === channelData.display_name;
      });

      newState.channels[updateChannelIndex] =
        {
          name: channelData.display_name,
          link: channelData.url,
          logo: channelData.logo,
          status: channelData.status,
          stream
        };

      localStorage.setItem('channels', JSON.stringify(newState.channels));

      return newState;
    }

    default:
      return state;
  }
}

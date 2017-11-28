import axios from 'axios';
import * as types from './actionTypes';
// For Development
// import credentials from './credentials';

function fetchData(name) {
  // Development: Using real twitch API
  /*const channelURL = `https://api.twitch.tv/kraken/channels/${name}`;
  const streamURL = `https://api.twitch.tv/kraken/streams/${name}`;

  return axios.all([
    axios.get(channelURL, {headers: {'Client-ID': credentials.ID}}),
    axios.get(streamURL, {headers: {'Client-ID': credentials.ID}})
  ]);*/

  // Live: Using API provided by freeCodeCamp
  const channelURL = `https://wind-bow.gomix.me/twitch-api/channels/${name}`;
  const streamURL = `https://wind-bow.gomix.me/twitch-api/streams/${name}`;

  return axios.all([axios.get(channelURL), axios.get(streamURL)]);
}

export function input(term) {
  return {
    type: types.INPUT,
    term
  };
}

export function setError(error) {
  return {
    type: types.SET_ERROR,
    error
  };
}

export function addChannel(name) {
  return {
    type: types.ADD_CHANNEL,
    payload: fetchData(name)
  };
}

export function removeChannel(name) {
  return {
    type: types.REMOVE_CHANNEL,
    name
  };
}

export function updateChannel(name) {
  return {
    type: types.UPDATE_CHANNEL,
    payload: fetchData(name)
  };
}

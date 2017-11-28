export default {
  channels: JSON.parse(localStorage.getItem('channels')) || [],
  term: '',
  error: ''
};

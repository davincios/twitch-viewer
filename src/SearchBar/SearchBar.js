import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { input, setError, addChannel } from '../actions';
import './styles.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.inputChange = this.inputChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.checkIfAdded = this.checkIfAdded.bind(this);
  }

  inputChange(e) {
    this.props.input(e.target.value);
  }

  formSubmit(e) {
    e.preventDefault();

    const alreadyAdded = this.checkIfAdded(this.props.term);

    if (alreadyAdded > -1) {
      this.props.setError(`Channel "${this.props.term}" already added`);
    } else {
      this.props.addChannel(this.props.term);
      this.props.setError('');
    }

    this.props.input('');
  }

  checkIfAdded(term) {
    return this.props.channels.findIndex((channel) => {
      return channel.name.toLowerCase() === term.toLowerCase();
    });
  }

  render() {
    return (
      <div styleName="form">
        <form onSubmit={ this.formSubmit }>
          <input
            styleName="search"
            type="text"
            placeholder="Search"
            required
            value={ this.props.term }
            onChange={ this.inputChange } />
          <button styleName="submit">Add</button>
        </form>
        <p styleName="error">{this.props.error}</p>
      </div>
    );
  }
}

SearchBar.propTypes = {
  input: PropTypes.func.isRequired,
  term: PropTypes.string.isRequired,
  channels: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  setError: PropTypes.func.isRequired,
  addChannel: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({input, setError, addChannel}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

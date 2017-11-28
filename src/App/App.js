import React from 'react';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import ChannelList from '../ChannelList/ChannelList';
import Footer from '../Footer/Footer';
import './styles.css';

const App = () => {
  return (
    <div styleName="app">
      <Header />
      <SearchBar />
      <ChannelList />
      <Footer />
    </div>
  );
};

export default App;

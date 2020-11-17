import * as React from 'react';
import './scss/App.scss';
import NavBar from './components/NavBar';
import Board from './components/Board';
import axios from 'axios';

const App = () => {
  axios.defaults.baseURL = 'http://localhost:8080';
  // axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
  // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  axios
    .get('/test')
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (response) {
      console.log(response);
    });

  // fetch('/api/text', {
  //   method: 'GET',
  // })
  //   .then((response) => response.json())
  //   .then((data) => console.log(data));
  return (
    <div className="App">
      <NavBar />
      <Board />
    </div>
  );
};
export default App;

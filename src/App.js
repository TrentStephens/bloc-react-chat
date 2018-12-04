import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyB_RgtK5gJ0kmgt4gwIX1jmtKV_PA-jbrQ",
    authDomain: "react-chat-rooms.firebaseapp.com",
    databaseURL: "https://react-chat-rooms.firebaseio.com",
    projectId: "react-chat-rooms",
    storageBucket: "react-chat-rooms.appspot.com",
    messagingSenderId: "195796598816"
  };
  firebase.initializeApp(config);


class App extends Component {
  render() {
    return (
      <div className="App">
        <RoomList
        firebase = {firebase}
         />
      </div>
    );
  }
}

export default App;

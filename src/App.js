import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

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

  setRoom(roomID){
    var setRoomID = this.state.roomID
    this.setState({rooms: setRoomID})
  }

  render() {
    return (
      <div className="App">
        <RoomList
        firebase = {firebase}
        setRoom = {(roomID) => this.setRoom(roomID)}
         />
         <MessageList
         firebase = {firebase}
          />
      </div>
    );
  }
}

export default App;

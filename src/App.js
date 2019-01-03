import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

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

  constructor(props) {
    super(props);
      this.state = {
        activeRoom: '',
        activeUser: ''
      };
  };

  setRoom(roomID){
    //console.log(roomID);
    this.setState({activeRoom: roomID})
    //console.log(this.state.activeRoom)
  }

  setUser(userID){
    this.setState({activeUser: userID})
  }

  render() {
    return (
      <div className="App">
        <User
        firebase = {firebase}
        setUser = {(user)=>this.setUser(user)}
        user = {this.state.activeUser}
        />
        <RoomList
        firebase = {firebase}
        setRoom = {(roomID)=>this.setRoom(roomID)}
         />
         <MessageList
         firebase = {firebase}
         activeRoomId = {this.state.activeRoom}
         user = {this.state.activeUser}
          />
      </div>
    );
  }
}

export default App;

import React, {Component} from 'react';

this.state = {
     rooms: []
  };

this.roomsRef = this.props.firebase.database().ref('rooms');

class RoomList extends Component {
  render() {
    return (
      <div className="RoomList">
      This is a test
      </div>
    );
  }
}




export default RoomList;

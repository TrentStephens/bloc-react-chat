import React, {Component} from 'react';

class RoomList extends Component {

  constructor(props) {
    super(props);
      this.state = {rooms:[]}

      this.roomsRef = this.props.firebase.database().ref('rooms');
  };

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room)})
    });
  }

  createRoom(e) {
    e.preventDefault();
      this.roomsRef.push({
      name: newRoomName
      });
  }

  render() {
    return (
        <div className="RoomList">
          {this.state.rooms.map ((room, index) =>
            <div className="RoomID"
              key={index}>
                {room.name}
            </div>
          )}
          <form onSubmit ={ (e) => this.createRoom(e)} >
    	   		<input type="text" value="Chat Room"/>
    	   		<input type="submit" />
    	   </form>
        </div>
    );
  }
}




export default RoomList;

import React, {Component} from 'react';

class RoomList extends Component {

  constructor(props) {
    super(props);
      this.state = {rooms:[], newRoomName: ''}

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
    if (!this.state.newRoomName) { return }
      this.roomsRef.push({
      name: this.state.newRoomName
      });
      this.setState({ newRoomName: ''});
  }

  handleChange(e){
    this.setState({newRoomName: e.target.value});
  }

  render() {
    return (
        <div className="RoomList">
          {this.state.rooms.map ((room, index) =>
            <div className="RoomID"
              key={index}
              onClick = {() => this.props.setRoom(room)}>
                {room.name}
            </div>
          )}
          <form onSubmit ={ (e) => this.createRoom(e)} >
    	   		<input type="text" name="chat-room" value={this.state.newRoomName} placeholder="Chat Room Name" onChange={(e)=>this.handleChange(e)} />
    	   		<input type="submit" />
    	   </form>
        </div>
    );
  }
}




export default RoomList;

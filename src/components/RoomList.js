import React, {Component} from 'react';

/* 
  You can remove this. I was just playing with the style to make things a little easier to see.
*/
import '../App.css';

class RoomList extends Component {

  /**
    Added two new variables.
      1.) selectedRoom - for the selected room name
      2.) selectedRoomId - for the selected room id
  */
  constructor(props) {
    super(props);
      this.state = {rooms:[], 
        newRoomName: '', 
        selectedRoom: '', 
        selectedRoomId: ''
      }

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

  /*
    will be called everytime the user clicks a "Room". Currently what is being passed as the parameter is an object.
    The objects current setup is 
      {
        name: "someName",
        key: "someKey"
      }

    I am assuming this is how you have your Firebase data setup, since I believe firebase will send database information
    as a JSON Object. From here you can do whatever you want with the rooms.

    - Update Firebase for a state
    - Select the active room to chat
    - Make a callout to firebase or any other web service upon clicking

    Currently just sets the selectedRoom and selectedRoomId variables
  */
  selectRoom(room) {
    console.log("Selected Item", room);
    this.setState({selectedRoom: room.name});
    this.setState({selectedRoomId: room.key});
  }

  handleChange(e){
    this.setState({newRoomName: e.target.value});
  }

  render() {
    return (
      <div>
        <div className="RoomList">
          {this.state.rooms.map ((room, index) =>
            <div className="RoomID" key={index}>
                {/*
                  Added an onClick listener to the Div. Similiar to the onChange, everytime the action is fired (clicked) it 
                  will call the selectRoom function, passing in the specific room the user has selected. Since you are looping through
                  the rooms via the "this.state.rooms.map" it will create an onClick event for every item dynamically.
                */}
                <div onClick={() => {this.selectRoom(room)}} className="room-item">{room.name}</div>
            </div>
          )}
          <form onSubmit ={ (e) => this.createRoom(e)} >
    	   		<input type="text" name="chat-room" value={this.state.newRoomName} placeholder="Chat Room Name" onChange={(e)=>this.handleChange(e)} />
    	   		<input type="submit" />
    	   </form>
        </div>

        {/* 
          This is just fluff I added to show that the onClick method is properly working
        */}
        <div className="Chat">
          <div className="roomDetail">You have selected:</div>
          <div className="ChatRoom">Room Name: <span className="roomDetail">{this.state.selectedRoom}</span></div>
          <div className="ChatRoom">Room Id: <span className="roomDetail">{this.state.selectedRoomId}</span></div>
        </div>
      </div>
    );
  }
}




export default RoomList;

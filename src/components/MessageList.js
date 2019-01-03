import React, {Component} from 'react';

class MessageList extends Component {

  constructor(props) {
    super(props);
      this.state = {messages:[], newMessageName: ''}
      this.messagesRef = this.props.firebase.database().ref('messages');
  };

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message)})
    });

  }

  createMessage(e) {
    e.preventDefault();
    if (!this.state.newMessageName) { return }
      this.messagesRef.push({
      content: this.state.newMessageName,
      roomId: this.props.activeRoomId.key,
      username: this.props.username,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      });
      this.setState({ newMessageName: ''});
  }

  handleChange(e){
    this.setState({newMessageName: e.target.value});
  }

  render() {
    //console.log(this.props.activeRoomId);
    return (
      (this.props.activeRoomId !== "" && this.props.activeRoomId !== undefined) ?
        <div className="MessageList" >
        {this.state.messages.filter ((message, index) => this.props.activeRoomId.key === message.roomId).map ((message, index) =>

         <div className="MessageID"

           key={index}>

             {message.content}

         </div>

       )}
          <form onSubmit ={ (e) => this.createMessage(e)} >
            <input type="text" name="message-data" value={this.state.newMessageName} placeholder="Enter Message" onChange={(e)=>this.handleChange(e)} />
            <input type="submit" />
          </form>
        </div>
      : <div>Please Select Your Room</div>
    );
  }
}

export default MessageList;

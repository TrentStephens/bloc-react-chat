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
      message: this.state.newMessageName
      });
      this.setState({ newMessageName: ''});
  }

  handleChange(e){
    this.setState({newMessageName: e.target.value});
  }

  render() {
    return (
      <div className="MessageList">
        {this.state.messages.map ((message, index) =>
          <div className="MessageID"
            key={index}>
              {message.message}
          </div>
        )}
        <form onSubmit ={ (e) => this.createMessage(e)} >
          <input type="text" name="message-data" value={this.state.newMessageName} placeholder="Enter Message" onChange={(e)=>this.handleChange(e)} />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default MessageList;

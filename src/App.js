import React, { Component } from 'react'
import './App.css'
import axios from 'axios'

class App extends Component {
  state = {
    input: '',
    messages: [],
    number: null
  }

  componentDidMount = () => {
    axios.get('/messages')
      .then(res => {
        this.setState({
          messages: res.data
        })
      })
  }

  handleInput = e => this.setState({ input: e.target.value })

  handleEnter = e => {
    // console.log(e.keyCode)
    if (e.keyCode === 13) this.sendMessage()
  }

  sendMessage = () => {
    axios.post('/message', {message: this.state.input})
      .then(res => {
        this.setState({
          messages: res.data,
          input: ''
        })
      })
  }

  updateRace = () => {
    axios.put('/race', {number: this.state.number})
  }
  updateNumber = (e) => {
    this.setState({
      number: +e.target.value
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Send the things</h1>
        </header>
        <div className="messages">
          {this.state.messages.map((message, i) => (
            <h3 key={i}>{message}</h3>
          ))}
        </div>
        <div className="message-inputs">
          <input
            placeholder="What would you like to send?"
            value={this.state.input}
            onChange={this.handleInput}
            onKeyDown={e => this.handleEnter(e)}
            type="text"
          />
          <button onClick={this.sendMessage}>Send</button>
        </div>

        <hr/>
        <input onChange = {this.updateNumber} type="number"/>
        <button onClick={this.updateRace}>Update Race</button>
      </div>
    )
  }
}

export default App

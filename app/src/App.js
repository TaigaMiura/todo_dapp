import React, { Component } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import TodoInput from './components/TodoInput'
import TodoContract from './contracts/Todo_ABI'
import web3 from './contracts/web3'
import TodoList from './components/TodoList'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      todolist: []
    }
  }
  async componentWillMount() {
    const accounts = await web3.eth.getAccounts()
    console.log(accounts[0])
    const result = await TodoContract.methods.getTodosByOwner(accounts[0]).call()
    await Promise.all(result.map(async num => {
      return await TodoContract.methods.todos(num).call()
    })).then(v => {
      console.log(v)
      this.setState({ todolist: v })
    })
  }
  render() {
    return (
      <div>
        <Container>
          <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="#home">TodoDapp</Navbar.Brand>
          </Navbar>
          <TodoInput />
          <TodoList todolist={this.state.todolist}/>
        </Container>
      </div>
    )
  }

}

export default App;
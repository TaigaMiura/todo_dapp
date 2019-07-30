import React, {Component} from 'react'
import { Card } from 'react-bootstrap'
import Todo from './Todo'
import TodoContract from '../contracts/Todo_ABI'
import web3 from '../contracts/web3'

class TodoList extends Component {
  async TodoRemove(event) {
    try {
      const accounts = await web3.eth.getAccounts()
      await TodoContract.methods.TodoRemove(event).send({
        from: accounts[0]
      })
      window.location.reload()
    } catch (e) {
      console.log(e)
    }
  }
  render() {
    console.log(this)
    const list = this.props.todolist.map((todo, i) => {
      if (todo.flag) {
        return <Todo {...todo} key={i} TodoRemove={this.TodoRemove.bind(this)}/>
      }
    })

    return (
      <div>
        <Card>
          <Card.Header>Todo List</Card.Header>
          {list}
        </Card>
      </div>
    )
  }
}

export default TodoList;
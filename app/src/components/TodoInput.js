import React, { Component } from 'react'
import { Card, Form, FormControl, InputGroup, Button } from 'react-bootstrap'
import TodoContract from '../contracts/Todo_ABI'
import web3 from '../contracts/web3'

class TodoInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      task: '',
    }
  }
  async onAddTodo(event) {
    event.preventDefault()
    const accounts = await web3.eth.getAccounts()
    await TodoContract.methods.TodoCreate(this.state.task).send({
      from: accounts[0]
    })
    window.location.reload()
  }
  async onTodoCreate(event) {
    event.preventDefault()
    const accounts = await web3.eth.getAccounts()
    await TodoContract.methods.TodoCreate(this.state.task).send({
      from: accounts[0]
    })
    window.location.reload()
  }
  render() {
    return (
      <div>
        <Card className="mt-3 mb-3">
          <Card.Body>
            <Form onSubmit={this.onTodoCreate.bind(this)}>
              <InputGroup>
                <FormControl
                  placeholder="Todoを入力してください"
                  onChange={this.onAddTodo.bind(this)}
                />
                <InputGroup.Append>
                  <Button type="submit" variant="success">Add</Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default TodoInput;
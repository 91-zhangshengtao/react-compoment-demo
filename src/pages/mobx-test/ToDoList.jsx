import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { observer, PropTypes as ObservablePropTypes } from 'mobx-react'
import TodoItem from './TodoItem'
import store from '../../mobx/store.js'

@observer
class ToDoList extends Component {
  static propTypes = {
    // 特定形状参数的对象
    store: PropTypes.shape({
      // 对store内的数据进行类型校验
      //todos为observableArray，其内数据为observableObject，isRequired表示store，todos必须存在，
      createTodo: ObservablePropTypes.func,
      todos: ObservablePropTypes.observableArrayOf(
        ObservablePropTypes.observableObject
      ).isRequired
    }).isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      inputValue: ''
    }
  }
  handlerChange(e) {
    let inputValue = e.target.value
    this.setState({
      inputValue
    })
  }
  handlerSubmit(e) {
    e.preventDefault()
    // let store = this.props.store
    store.createTodo(this.state.inputValue)
    this.setState({
      inputValue: ''
    })
  }
  render() {
    // let store = this.props.store
    return (
      <div className="todo-list">
        <span>{ `${JSON.stringify(store.todos)}`}</span>
        <header>
          <form onSubmit={e => this.handlerSubmit(e)}>
            <input
              type="text"
              className="input"
              placeholder="what needs to be finished"
              value={this.state.inputValue}
              onChange={e => this.handlerChange(e)}
            />
           
          </form>
        </header>
        <ul>
          {store.todos.map(todo => {
            return (
              <li key={todo.id} className="todo-item">
                <TodoItem todo={todo} store={store} />
              </li>
            )
          })}
        </ul>
        <footer>{store.unfinished} item(s) unfinished</footer>
      </div>
    )
  }
}
export default ToDoList
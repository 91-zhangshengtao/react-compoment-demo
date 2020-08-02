import React, { Component } from 'react'
import ToDoList from './ToDoList'
import store from '../../mobx/store'
class Mobxtest extends Component {
  render() {
    return (
      <div>
        <ToDoList store={store} />
      </div>
    )
  }
}
export default Mobxtest
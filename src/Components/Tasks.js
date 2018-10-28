
import React, { Component } from 'react';
import '../App.css';
import Task from './Task';
<<<<<<< HEAD
import server from '../server';
=======
import server from './server';
>>>>>>> cf04fdc7177a3630e29ab4b70cbcda08799fdab4
class Tasks extends Component {
  constructor(props){
    super(props);
    this.state = {
        name: "",
    }
  }
  addTask = () => {
    const { name } = this.state;
    const { username, newTask } = this.props;
    if(Boolean(name)){
        fetch(server + 'newtask', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, name})
        })
        .then(res => res.json())
        .then(task => {
            this.setState({
                name: ""
            })
            newTask(task)
      })
    }
  }
  newTaskName = e => {
      this.setState({name: e.target.value})
  }
  renderTasks = () => {
      const { tasks, editTask } = this.props;
      return tasks.map(task => <Task id={task.id} name={task.name} editTask={editTask} completed={task.completed}/>)
  }
  render() {
      const { name } = this.state;
    return (
      <div className="inner">
        <div className="task">
            <p className="tickBox" onClick={this.addTask}>+</p>
            <input type="text" onChange={this.newTaskName} placeholder="New task" value={name}/>
        </div>
        {this.renderTasks()}
      </div>
    );
  }
}

export default Tasks;
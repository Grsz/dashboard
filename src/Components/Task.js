
import React, { Component } from 'react';
import '../App.css';
<<<<<<< HEAD
import server from '../server';
=======
import server from './server';
>>>>>>> cf04fdc7177a3630e29ab4b70cbcda08799fdab4
class Task extends Component {
  constructor(props){
    super(props);
    this.state = {
        nameEdit: false,
        newName: this.props.name
    }
  }
  setNewName = () => {
    const { newName } = this.state;
    const { id, editTask } = this.props;
    if(Boolean(newName)){
        fetch(server + 'newtaskname', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({newName, id})
        })
        .then(res => res.json())
        .then(task => {
            editTask(task);
            this.setState({
                nameEdit: false
            })
      })
    }
  }
  newName = e => {
      this.setState({newName: e.target.value})
  }
  nameEdit = e => {
      this.setState({nameEdit: true})
  }
  switchCompleted = () => {
    const { completed, id, editTask } = this.props;
    fetch(server + 'switchcompleted', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({completed: !completed, id})
    })
    .then(res => res.json())
    .then(task => {
        editTask(task)
    })
  }
  render() {
      const { newName, nameEdit } = this.state;
      const { completed, name } = this.props;
      if(nameEdit){
        return <div className="task">
        <p className="tickBox" onClick={this.setNewName}>Ok</p>
            <input type="text" onChange={this.newName} value={newName}/>
        </div>
      } else {
          return <div className="task">
            <p className="tickBox" onClick={this.switchCompleted}>
                {completed ? "X" : " "}
            </p>
            <p className={`taskName ${completed ? "completed" : ""}`} onClick={this.nameEdit}>{name}</p>
          </div>
      }
  }
}

export default Task;
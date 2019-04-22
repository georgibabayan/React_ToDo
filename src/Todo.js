import React from 'react'

class Todo extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {tasks : this.getTasks(), newTask : ''}
  }

  getTasks = () => {
    return [{id : 1, text : 'Do dishes'}, {id : 2, text : 'Take over the world'}]
  }
  handleClick = (id) => {
    this.setState((prevState) => {
      return {tasks : prevState.tasks.filter((element)=> {return element.id !== id})}
    })
  }
  addTask = () => {
    this.setState((prevState) => {
      return {tasks : [...prevState.tasks, {id: Math.max( ...prevState.tasks.map((element)=>element.id)) + 1, text : prevState.newTask}], newTask : ''}
    })
  }
updateNewTask = (evt) => {
    this.setState({
      newTask: evt.target.value
    });
  }

  render() {
    return (
      <table>
      	<tbody>
      		<tr>
      			<th align="left">Task</th>
      			<th align="left">Complete</th>
      		</tr>
      		<tr>
      			<td></td>
      			<td></td>
      		</tr>
          <TaskList tasks = {this.state.tasks} handleClick = {this.handleClick}/>
      		<tr>
      			<td align="left"><input type="text" value = {this.state.newTask} onChange={evt => this.updateNewTask(evt)}/></td>
      			<td><button type="button" onClick={this.addTask} >Add New</button></td>
      		</tr>
      	</tbody>
      </table>
    )
  }
}

class Task extends React.Component {


  handleClick = () => {this.props.handleClick(this.props.task.id)}
  render(){
    return (
          <tr>
      			<td align="left">{this.props.task.text}</td>
      			<td><input type="checkbox" onClick = {this.handleClick}/></td>
      		</tr>
        )
      }
  }
function TaskList(props){
return(
  props.tasks.map((task)=>
    <Task  key={task.id} task = {task} handleClick = {props.handleClick}/>)
)

}
export default Todo;

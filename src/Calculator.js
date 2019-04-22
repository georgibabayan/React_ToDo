import React from 'react'
import ReactDOM from 'react-dom'

class Button extends React.Component {
  constructor(props)
  {
    super(props)
    //this.state = {value : 1}
    this.state = {value : props.value, handler : props.updateValue}
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick = () => {this.props.updateValue(this.state.value)}
  render() {
    return (
      <button onClick={this.handleClick}>{this.state.value}</button>
    )
  }
}

class Output extends React.Component {

render() {
  return (
    <div>{this.props.value}</div>
  )
}

}

class Calculator extends React.Component {
constructor(props)
{
  super(props)
  this.state = {currentValue : 0, savedValue : 0, currentOp : 0, override : false, fraction : false}
  this.updateValue = this.updateValue.bind(this)
  this.calculate = this.calculate.bind(this)
  this.processOP = this.processOP.bind(this)
}
calculate = () => {

  if (this.state.currentOp === 1)
  {
    this.setState((prevState) => {
      return {currentValue : prevState.currentValue + prevState.savedValue, savedValue : 0, currentOp : 0}
    })
  }
  if (this.state.currentOp === 2)
  {
    this.setState((prevState) => {
      return {currentValue : prevState.savedValue - prevState.currentValue, savedValue : 0, currentOp : 0}
    })
  }
  if (this.state.currentOp === 3)
  {
    this.setState((prevState) => {
      return {currentValue : prevState.savedValue * prevState.currentValue, savedValue : 0, currentOp : 0}
    })
  }
  if (this.state.currentOp === 4)
  {
    this.setState((prevState) => {
      return {currentValue : prevState.savedValue / prevState.currentValue, savedValue : 0, currentOp : 0}
    })
  }
  this.setState((prevState) => {
    return {override : true}
  })
}

processOP = (op) => {
  if (this.state.currentOp !== 0 && !this.state.override)
  {
    this.calculate()
  }
  this.setState((prevState) => {
    return {
      savedValue: prevState.currentValue, override : true, currentOp : op };
  })
}
updateValue = (newVal) => {
  switch(newVal) {
    case '+':
      this.processOP(1)
      break;
    case '-':
      this.processOP(2)
      break;
    case '*':
      this.processOP(3)
      break;
    case '/':
      this.processOP(4)
      break;
    case 'C':
      this.setState((prevState) => {
        return {
          currentValue : 0, savedValue : 0, currentOp : 0, override : false, fraction : false
        }
      })
      break;
    case '=':
      if (this.state.currentOp !== 0)
      {
        this.calculate()
      }
      break;
    default:
      this.setState((prevState) => {
        if (prevState.override)
          return {currentValue : Number(newVal), override : false}
        return {
          currentValue: Number(prevState.currentValue)*10 + Number(newVal) };
      })
  }

  //console.log(this.state.currentValue)
}

render() {
  return(
    <table>
      <tbody>
	<tr>
		<td colSpan="4">
			<Output value={this.state.currentValue}/>
		</td>
	</tr>
	<tr>
		<td>
			<Button value = {'1'} updateValue = {this.updateValue}/>
		</td>
    <td>
			<Button value = {'2'} updateValue = {this.updateValue}/>
		</td>
    <td>
			<Button value = {'3'} updateValue = {this.updateValue}/>
		</td>
    <td>
			<Button value = {'+'} updateValue = {this.updateValue}/>
		</td>
  </tr>
  <tr>
		<td>
			<Button value = {'4'} updateValue = {this.updateValue}/>
		</td>
    <td>
			<Button value = {'5'} updateValue = {this.updateValue}/>
		</td>
    <td>
			<Button value = {'6'} updateValue = {this.updateValue}/>
		</td>
    <td>
			<Button value = {'-'} updateValue = {this.updateValue}/>
		</td>
  </tr>
  <tr>
		<td>
			<Button value = {'7'} updateValue = {this.updateValue}/>
		</td>
    <td>
			<Button value = {'8'} updateValue = {this.updateValue}/>
		</td>
    <td>
			<Button value = {'9'} updateValue = {this.updateValue}/>
		</td>
    <td>
			<Button value = {'*'} updateValue = {this.updateValue}/>
		</td>
  </tr>
  <tr>
		<td>
			<Button value = {'C'} updateValue = {this.updateValue}/>
		</td>
    <td>
			<Button value = {'0'} updateValue = {this.updateValue}/>
		</td>
    <td>
			<Button value = {'='} updateValue = {this.updateValue}/>
		</td>
    <td>
			<Button value = {'/'} updateValue = {this.updateValue}/>
		</td>
  </tr>
  </tbody>
</table>
  )
}
}

export default Calculator;
//ReactDOM.render(<Calculator />, document.getElementById('root'));

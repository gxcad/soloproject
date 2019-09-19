import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      foodItem: '',
      foodItems: []
    };
    this.updateState = this.updateState.bind(this);
    this.submitInfo = this.submitInfo.bind(this);
  }

  updateState(foodItem) {
    console.log('foodItem', foodItem);
    this.setState({
      foodItem: foodItem
    })
    console.log('foodItem in state', this.state.foodItem);
  }

  submitInfo() {
    const currentFoodItems = [...this.state.foodItems, this.state.foodItem];
    this.setState({foodItems: currentFoodItems});
  }

  componentDidMount() {
    console.log('after componentDidMount', this.state.foodItems);
    fetch('/food') 
    .then((foodData) => {
      return foodData.json()
    })
      .then((resultFoodData) => {
        this.setState({foodItem: resultFoodData})
      })
    }

  render() {
    const foodItems = [];
    for (let i = 0; i < this.state.people.length; i += 1) {
      foodItems.push(`${this.state.foodItems[i]} is expiring 3 days from ${Date()}`);
    }
    console.log('foodItems in render', foodItems);

    return (
      <div>
        <input className='inputField' onChange={(e) => this.updateState(e.target.value)} placeholder='enter food item'></input>
        <input className='inputField' value={this.state.expiration} onChange={(e) => this.updateState(e.target.value)} placeholder='enter days until expiration'></input>
        <button form='foodItem' type='submit' onClick={this.submitInfo} className='submit'>Submit</button>
        <h1>Food inventory:</h1>
        <ul>
          {this.state.foodItems.length > 0 ? (
            <>
              {foodItems.map((person, i) => {
                return<FoodItem key={i} message={person} foodItem={this.state.foodItems[i]}/>
                
              })}
            </>
          ): null}
        </ul>
      </div>
    )
  }
}

function FoodItem(props) {
  console.log('food item props', props)
  return (
    <div className='foodItem'>
      <li>{props.message}</li>
    </div>
  )
}

export default App;
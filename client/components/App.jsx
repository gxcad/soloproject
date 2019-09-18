import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      foodItem: '',
      foodItems: ['Pan seared T-Rex']
    };
    this.updateState = this.updateState.bind(this);
    this.submitInfo = this.submitInfo.bind(this);
  }

  updateState(foodItem) {
    // console.log('foodItem', foodItem);
    this.setState({
      foodItem: foodItem
    })
    console.log('foodItem in state', this.state.foodItem);
  }

  submitInfo() {
    // console.log('foodItem', this.state.foodItem)
    const currentFoodItems = [...this.state.foodItems, this.state.foodItem];
    // console.log('current state of fooditems', currentFoodItems);
    this.setState({foodItems: currentFoodItems});
    // console.log('fooditems after update', this.state.foodItems);
  }

  componentDidMount() {
    console.log('after componentDidMount', this.state.foodItems);
    fetch('/coolRoute', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.foodItems)
  })
      .then((foodData) => {
        // console.log('before json parse', sampleData);
        return foodData.json()})
        .then((resultFoodData) => {
          // console.log('result in CDM', resultFoodData);
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
        <h1>Perishables:</h1>
        <ul>
          {this.state.foodItems.length > 0 ? (
            <>
              {/* {foodItems} */}
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
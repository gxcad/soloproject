import React, { Component, Fragment } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      foodItem: '',
      foodId: '',
      expiration: '2019-09-30',
      foodItems: []
    };
    this.updateFood = this.updateFood.bind(this);
    this.submitInfo = this.submitInfo.bind(this);
    this.submitRemove = this.submitRemove.bind(this);
    this.submitUpdate = this.submitUpdate.bind(this);
    this.foodToRemove = this.foodToRemove.bind(this);
  }

  updateFood(foodItem) {
    this.setState({
      foodItem: foodItem
    })
  }

  updateExpiration(expiration) {
    this.setState({
      expiration: expiration
    })
  }

  foodToRemove(Id) {
    this.setState({
      foodId: Id
    })
  }

  submitUpdate() {
    const newFoodItemObj = {food: this.state.foodItem, expiration: this.state.expiration};
    return fetch('/food', + this.state.foodId, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify(newFoodItemObj),
  })
  .then((response) => response.json())
  .then((result) => {
    this.setState({foodItems: [...this.state.foodItems, result]});
  }) 
}

  submitRemove() {
    // console.log('state id', this.state.foodId);
    return fetch('/food/' + this.state.foodId, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json',},
  })
  .then((res) => res.json())
  .then((result) => {
    this.setState({foodItems: [...this.state.foodItems, result]});
  }) 
}

  submitInfo() {
    const newFoodItemObj = {food: this.state.foodItem, expiration: this.state.expiration}
    return fetch('/food', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify(newFoodItemObj),
  })
  .then((response) => response.json())
  .then((result) => {
    // console.log(result);
    this.setState({foodItems: [...this.state.foodItems, result]});
  }) 
}

  componentDidMount() {
    fetch('/food') 
    .then((foodData) => {
      return foodData.json();
    })
    .then((resultFoodData) => {
      this.setState({foodItems: resultFoodData});
    })
  }

  render() {
    // const foodItems = [];
    // console.log('begin of render', this.state.foodItems);
    // for (let i = 0; i < this.state.foodItems.length; i += 1) {
    //   foodItems.push(`${this.state.foodItems} is expiring 3 days from ${Date()}`);
    // }
    const myFoodItems = this.state.foodItems.map((e, i) => {
      return (
          <FoodItem key={i} id={i} foodId={e.id} foodItem={e.food} expiration={e.expiration} />
      )
    });
    // console.log('foodItems in render', foodItems);

    return (
      <div>
        <input className='inputField' onChange={(e) => this.updateFood(e.target.value)} placeholder='enter food item'></input>
        <input className='inputField' onChange={(e) => this.updateExpiration(e.target.value)} placeholder='enter expiration date'></input>
        <button type='submit' onClick={this.submitInfo} className='submit'>Submit</button>
        <button type='submit' onClick={(id) => this.submitUpdate(id)} className='submit'>Update</button>
        <input className='inputField' onChange={(e) => this.foodToRemove(e.target.value)} placeholder='enter id to remove'></input>
        <button type='submit' onClick={(id) => this.submitRemove(id)} className='submit'>Remove</button>
        <h1>Food inventory:</h1>
        <ul>
          <Fragment>
            {myFoodItems}
          </Fragment>
        </ul>
      </div>
    )
  }
}

function FoodItem(props) {
  return (
    <div className='foodItem'>
      <li>{props.foodItem}</li>
      <li>{props.expiration}</li>
    </div>
  )
}

export default App;
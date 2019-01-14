import React, { Component } from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';


// const orderSummary = (props) => {
  
// doesn't have to be a class. Should revert to functional component ^ 
class OrderSummary extends Component {

  componentWillUpdate(){
    console.log('[OrderSummary]: WillUpdate')
  }

  render() {

    const ingredientSummary = Object.keys(this.props.ingredients).map( igKey => {
      return (
        <li key={igKey}>
          <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
        </li>
      )
    });

    return(
      <Aux>
        <h3>Your Order</h3>
        <p>A burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: ${this.props.price}</strong></p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </Aux>
    )
  }
}

export default OrderSummary;
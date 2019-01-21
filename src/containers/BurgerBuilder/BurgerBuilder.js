import React, {Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {

  // constructor(props) {
  //   super(props) {
  //     this.state = {...}
  //   }
  // }
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce( (sum, el) => {  // sum=constantly updated current sum up until current iteration
        return sum + el; // el=number accessed in ingredients[igKey]
      }, 0) // 0=starting number
    this.setState({purchaseable: sum > 0})
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    const updatedCount = oldCount + 1
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredient = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    this.setState({loading: true})

    // alert('Continue.')
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'First Last',
        address: {
          street: '1st Ave',
          zipCode: '123456',
          country: 'USA'
        },
        deliveryMethod: 'fastest'
      }
    }
    Axios.post('/orders.json', order)
    .then(response => {
      this.setState({loading: false, purchasing: false})
      console.log(response)
    })
    .catch(error => {
      this.setState({loading: false, purchasing: false})
      console.log(error)
    });
  }

  render() {

    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    };

    let orderSummary = <OrderSummary 
      ingredients={this.state.ingredients}
      price={this.state.totalPrice.toFixed(2)}
      purchaseCancelled={this.purchaseCancelHandler}
      purchaseContinued={this.purchaseContinueHandler}/>;
      
    if (this.state.loading) {
      orderSummary = <Spinner />
    };

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredient}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            ordered={this.purchaseHandler} />
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, Axios);
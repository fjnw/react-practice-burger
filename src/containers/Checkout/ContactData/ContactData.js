import React, { Component} from 'react';

import classes from './ContactData.module.css'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    name: '', 
    email: '',
    address: {
      street: '', 
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true})
    
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
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
      this.setState({loading: false})
      this.props.history.push('/');
      // console.log(response)
    })
    .catch(error => {
      this.setState({loading: false})
      console.log(error)
    });
  }

  render () {
    let form = (
      <form>
      <Input inputtype="input" type="email" name="email" placeholder="Your email" />
      <Input inputtype="input" type="text" name="street" placeholder="Your street" />
      <Input inputtype="input" type="text" name="name" placeholder="Your name" />
      <Input inputtype="input" type="text" name="postal" placeholder="Your zip code" />
      <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
    </form>
    );
    if (this.state.loading) {
      console.log("Spinning")
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }

}

export default ContactData;


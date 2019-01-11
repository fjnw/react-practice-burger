import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {


  // Step-through explaination:  https://www.udemy.com/react-the-complete-guide-incl-redux/learn/v4/questions/3501504
  const transformedIngredients = Object.keys(props.ingredients)
    .map( igKey => { // igKey: "salad"
      return [...Array(props.ingredients[igKey])].map( (_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />
      })
    })

  return(
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );


};

export default burger;
import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  console.log(props)

  // Step-through explaination:  https://www.udemy.com/react-the-complete-guide-incl-redux/learn/v4/questions/3501504
  let transformedIngredients = Object.keys(props.ingredients)
    .map( igKey => { // igKey: "salad"
      return [...Array(props.ingredients[igKey])].map( (_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />
      })
    })
    .reduce((arr, el) => {  // (previous value, current value), reduce method accepts call back of everything before and initial value
      return arr.concat(el)
    }, [])

  // console.log(transformedIngredients)
  if (transformedIngredients.length === 0 ) {
    transformedIngredients = <p>Please start adding ingredients.</p>
  }

  return(
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );


};

export default burger;
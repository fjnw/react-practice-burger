import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {


  // explanation of why we use the spread operator [...Array()] vs [Array()]
  // let ingredients = {};
  // ingredients = {
  //   salad: 2,
  //   bacon: 4
  // };
 
  // let transformedA = Object.keys(ingredients).map(igKey => {
  //   return [Array(ingredients[igKey])].map((_, i) => {
  //     debugger;
  //     console.log("Example A","Iteration output", i, "for", igKey);
  //     return "<p key=" + (igKey + i) + " type=" + igKey + ">Ingredient</p>";
  //   });
  // });
 
  // let transformedB = Object.keys(ingredients).map(igKey => {
  //   return [...Array(ingredients[igKey])].map((_, i) => {
  //     console.log("Example B","Iteration output", i, "for", igKey);
  //     return "<p key=" + (igKey + i) + " type=" + igKey + ">Ingredient</p>";
  //   });
  // });
 
  // console.log("Arrays Output");
  // console.log("First array :", transformedA);
  // console.log("Second Array :", transformedB);
  // console.log("Salad Quantity");
  // console.log("First array :", transformedA[0].length);
  // console.log("Second Array :", transformedB[0].length);
  // console.log("Bacon Quantity");
  // console.log("First array :", transformedA[1].length);
  // console.log("Second Array :", transformedB[1].length);
 
 
  // let arrayGroup = [];
  // const arrayCreater = valuesAmount => { return [Array(valuesAmount)]};
  // const arrayCreaterWithSpread = valuesAmount => { return [...Array(valuesAmount)]};
 
  // arrayGroup[0] = arrayCreater(5);
  // arrayGroup[1] = arrayCreaterWithSpread(5);
  // arrayGroup[2] = arrayCreater(2);
  // arrayGroup[3] = arrayCreaterWithSpread(2);
 
  // console.log("arrayGroup :",arrayGroup)



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


    // alternate solution
    // const ingredients = [];
    // let keyCount = 0;
  
    // for (let key in props.ingredients) {
    //   for (let i = 0; i < props.ingredients[key]; i++) {
    //     console.log("i: " + i, "props.ingredient[key]: " + props.ingredients[key], "key: " + key)
    //     ingredients.push(
    //       <BurgerIngredient type={key} key={keyCount++} />
    //     );
    //   }
    // }

    // return(
    //   <div className={classes.Burger}>
    //     <BurgerIngredient type='bread-top' />
    //      {ingredients}
    //     <BurgerIngredient type='bread-bottom' />
    //   </div>
    // );

};

export default burger;
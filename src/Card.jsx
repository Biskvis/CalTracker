import React from "react";
import thrashI from './assets/trash.png'
import writeI from './assets/write.png'

export default function Card(props) {

    function roundn(num) {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    return (
        <div className="card">
          <h2>{props.name}</h2>
          <p>Calories: {roundn(props.calories * props.itemCount)}</p>
          <p>Protein: {roundn(props.protein * props.itemCount)}g</p>
          <p>Carbs: {roundn(props.carbs * props.itemCount)}g</p>
          <p>Fat: {roundn(props.fat * props.itemCount)}g</p>
          <div className='card-buttons'>
            <div className="first-buttons">
                <button onClick={props.handleClick}>+</button>
                {props.itemCount}
                <button onClick={props.handleClickMinus}>-</button>

            </div>
            <div className="second-buttons">
                <button onClick={() => props.editItem()}><img src={writeI}/>Edit</button><button onClick={props.deleteItem}><img src={thrashI} />Delete</button>
            </div> 
          </div>
        </div>
    )
}
import { useState, useMemo } from 'react'
import Card from './Card'
import './App.css'

function App() {

  const emptyItem = {
    itemCount: 1,
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: ''
  }

  const [ item, setItem ] = useState(emptyItem)
  const [ itemArray, setItemArray ] = useState([])
  const [ total, setTotal ] = useState({ calories: 0, protein: 0, fat: 0, carbs: 0 });
  const [ updateItem, setUpdateItem ] = useState(false)
  const [ updatedItemI, setUpdatedItemI] = useState(0)


  function handleChange(event) {
    const { name, value } = event.target;
    setItem(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
  

  function handleSubmit(event) {
    event.preventDefault();
    setItemArray(prevState => [...prevState, item])
    clearForm();
  }

  function clearForm() {
    setItem(emptyItem)
  }

  function resetArr() {
    setItemArray([])
  }

  function handleClick(id) {
    setItemArray(prevState => prevState.map((v, i) => 
      i === id ? {...v, itemCount: v.itemCount + 1} : v
    ))
  }

  function handleClickMinus(id) {
    setItemArray(prevState => 
      prevState.map((v, i) => 
        i === id ? { ...v, itemCount: v.itemCount !== 0 ? v.itemCount - 1 : v.itemCount } : v
      )
    );
  }

  function deleteItem(id) {
    setItemArray(prevState => prevState.filter((v, i) => i !== id));
  }

  function editItem(id) {
    setItem(itemArray[id])
    setUpdatedItemI(id)
    setUpdateItem(true)
  }

  function saveItem() {
    setItemArray(prevState => prevState.map((v, i) =>
      i === updatedItemI ? item : v
    ))
    setUpdateItem(false)
    setUpdatedItemI(0);
    clearForm();
  }
  
  useMemo(() => {
    const newTotal = itemArray.reduce((accumulator, currentItem) => {
      return {
        calories: Number(accumulator.calories) + (Number(currentItem.calories) * Number(currentItem.itemCount)),
        protein: Number(accumulator.protein) + (Number(currentItem.protein) * Number(currentItem.itemCount)),
        fat: Number(accumulator.fat) + (Number(currentItem.fat) * Number(currentItem.itemCount)),
        carbs: Number(accumulator.carbs) + (Number(currentItem.carbs) * Number(currentItem.itemCount))
      };
    }, { calories: 0, protein: 0, fat: 0, carbs: 0 });

    setTotal(newTotal);
  }, [itemArray]);

  function roundn(num) {
    return (Math.round(num * 100) / 100).toFixed(2)
}
  

  const cards = itemArray.map((item, index) => 
    <Card
      key={index}
      {...item}
      handleClick={() => handleClick(index)}
      handleClickMinus={() => handleClickMinus(index)}
      deleteItem={() => deleteItem(index)}
      editItem={() => editItem(index)}  
        />
  );

  

  return (
    <>
      <div className='main'>
      <h1>Calorie Tracker</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className='inputs'>
          <input
            name='name'
            type='text'
            placeholder='Item Name'
            onChange={(e) =>handleChange(e)}
            value={item.name}
            required
          />
          <input
            name='calories'
            type='number'
            placeholder='Calories'
            onChange={(e) =>handleChange(e)}
            value={item.calories}
          />
          <input
            name='protein'
            type='number' 
            placeholder='Protein (g)' 
            onChange={(e) =>handleChange(e)}
            value={item.protein}
            />
          <input 
            name='carbs' 
            type='number' 
            placeholder='Carbs (g)' 
            onChange={(e) =>handleChange(e)} 
            value={item.carbs}
          />
          <input
            name='fat' 
            type='number' 
            placeholder='Fat (g)' 
            onChange={(e) =>handleChange(e)} 
            value={item.fat}
            
           />

        </div>
        <div className='buttons'> {!updateItem ?
          <button type='submit'>Add item</button> :
          <button style={{ backgroundColor: 'blue' }} onClick={saveItem}>Update Item</button>


        }
          <button onClick={() => {
            clearForm()
            resetArr()
            }}>Clear all</button>
        </div>
      </form>
      <div className='cards'>
        {cards}
      </div>
      {total.calories > 0 && <>
        <h2>Total Calories: {roundn(total.calories)}</h2>
        <h2>Total Protein: {roundn(total.protein)}g</h2>
        <h2>Total Carbs: {roundn(total.carbs)}g</h2>
        <h2>Total Fat: {roundn(total.fat)}g</h2>
      
      </>
       
       }
      </div>
    </>
  )
}

export default App

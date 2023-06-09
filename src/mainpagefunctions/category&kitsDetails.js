import React, { useState, useContext } from 'react';
import { useEffect } from 'react';

// Define a component to capture user details
export const CategoryAndKitsDetails = () => {
    const [catName, setCatName] = useState('');
    const [inventory, setInventory] = useState('');
    
    const [kitName, setKitName] = useState('');
    const [kitItems, setKitItems] = useState([
        {'': 0}
    ]);
    
    const [categories, setCategories] = React.useState([]);
    const [kits, setKits] = React.useState([]);
    const [items, setItems] = React.useState([]);

    //   const items = [
    //   { name:"DryFoodItems", inventory:'low'},
    //   { name:"HotFoodItems", inventory:'low'},
    //   { name:"PersonalHygiene", inventory:'low'},
    //   { name:"Footwear", inventory:'low'},
    //   { name:"Warmlothing", inventory:'low'},
    //   { name:"CasualClothing", inventory:'low'}
    // ]

    const handleFormChange = (index, event) => {
        let data = [...kitItems];
        data[index][event.target.name] = event.target.value;
        setKitItems(data);
    }


    const addKitItems = () => {
        let newfield = { itemName: '', amount: '' };
    
        setKitItems([...kitItems, newfield]);
    }

    const removeKitItems = (index) => {
        let data = [...kitItems];
        data.splice(index, 1)
        setKitItems(data)
    }

    // Handle category form submission and update user context
    const handleCatSubmit = (e) => {
      e.preventDefault();
      if (!catName) {
        alert("Category Name must be filled")
        return
      }
      const aidCategory = {catName, inventory}
      console.log(aidCategory)
      
      fetch(
        "http://localhost:5000/categories/category", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(aidCategory)
        }
      ).then(() => {
        alert(`${aidCategory.catName} has been successfully added`)
        setCatName('');
        setInventory('');
        window.location.reload(true)
      })
    };

    // Handle kit form submission and update user context
    const handleKitSubmit = (e) => {
        e.preventDefault();
        if (!kitName || !kitItems) {
          alert("All fields must be filled")
          return
        }
        const aidKit = {kitName, kitItems}
        console.log(aidKit)
        
        fetch(
          "http://localhost:5000/categories/kit", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(aidKit)
          }
        ).then(() => {
          alert(`${aidKit.kitName} has been successfully added`)
          console.log(aidKit.kitItems[0])
          setKitName('');
          setKitItems('');
          window.location.reload(true)
        })
      };
  
    useEffect(() =>
    {
      fetch("http://localhost:5000/categories/category")
      .then(res => res.json())
      .then((result) => {
        setCategories(result);
      }
    )
    fetch("http://localhost:5000/categories/kit")
    .then(res => res.json())
    .then((result) => {
      setKits(result);
    }
    )
      fetch("http://localhost:5000/items")
      .then(res => res.json())
      .then((result) => {
        setItems(result);
      }
    )
    }, [])

    return ( 
      <div>
        <h3>Enter New Aid Category details:</h3>
        <form style={{ margin: '20px', justifyContent: 'center'}} onSubmit={handleCatSubmit}>
          <div>
            <label style={{ fontSize: '18px' }}>
              Category Name:
              <input type="text" value={catName} onChange={(e) => setCatName(e.target.value)} />
            </label>
          </div>
          <div>
            <label style = {{ fontSize: '18px'}}>
              Inventory Status:
                <select value={inventory} onChange={(e) => setInventory(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Excess">Excess</option>
                </select>
            </label>
          </div>
          <button type="submit">Save</button>
        </form>
        <h3>Enter New Aid Kit details:</h3>
        <form style={{ margin: '20px', justifyContent: 'center'}} onSubmit={handleKitSubmit}>
          <div>
            <label style={{ fontSize: '18px' }}>
              Kit Name:
              <input type="text" value={kitName} onChange={(e) => setKitName(e.target.value)} />
            </label>
          </div>
          <div>
            {kitItems.map((input, index) => (
                <div key ={index}>
                    <div>
                      <label style = {{ fontSize: '18px'}}>
                          What would you like to add:
                          <select 
                            name='itemName'
                            value={input.itemName}
                            placeholder='ItemName'
                            onChange={event => handleFormChange(index, event)}>
                              <option>Select item</option>
                              {items.map((item) => (
                                <option>{item.name}</option>
                              ))}
                          </select>
                          <input 
                            type='number'
                            name='amount'
                            placeholder='Amount'
                            value ={input.amount}
                            size={'1'}
                            onChange={event => handleFormChange(index, event)}
                          />
                          <button onClick={() => removeKitItems(index)}>Remove</button>
                      </label>
                    </div>                   
                </div>
            ))}
          </div>
          <button onClick={addKitItems}>Add More..</button>
          <div />
          <button type="submit">Save</button>
        </form>
        <div>
          <hr/>
          <h3>All Aid Categories and Kits:</h3>
          {categories.length > 0 ? (
              <ul>
                  {categories.map((item, index) => (
                      <div key={index}>
                          <p style={{fontSize: '18px'}}>Category: {item.name}</p>
                          <p style={{fontSize: '18px'}}>Inventory Status: {item.status}</p>
                          <hr />
                      </div>
                  ))}
              </ul>
          ) : (
              <p>No categories found</p>
          )}
          {kits.length > 0 ? (
              <ul>
                  {kits.map((item, index) => (
                      <div key={index}>
                          <p style={{fontSize: '18px'}}>Kit Name: {item.name}</p>
                          <p style={{fontSize: '18px'}}>Item Name: {item.items[index]?.itemName || 'spaghetti'}</p>
                          <p style={{fontSize: '18px'}}>Item Amount: {item.items[index]?.amount || 3}</p>
                          <hr />
                      </div>
                  ))}
              </ul>
          ) : (
              <p>No kits found</p>
          )}
        </div>
      </div>
    );
  };
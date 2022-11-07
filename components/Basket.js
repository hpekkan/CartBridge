import React from 'react'

export default function Basket({basket,cost}) {
  cost = cost.toFixed(2)
  return (
    <div>
    <div className='mainBasket'>
    <div className='showBasket'>
    <h2>Basket</h2>
    {basket.length === 0 && <p>not found result</p> || null}
    {
     basket.map(item => {
      let temp = (item.price * item.amount).toFixed(2);
      return (
       <div className='basketList'>
       <img width="100" src={item.img} />
       <p>{item.name} x {item.amount}</p>
       <p> $ {temp}</p>

       </div>
       )}
       )
     }
     {cost && <p>Total : $ {cost}</p> || null}
     </div>
     

     </div>
     </div>
     )
   }

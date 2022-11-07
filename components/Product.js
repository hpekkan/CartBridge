import React from 'react'

export default function Product({product,basket,setBasket}) {

  const basketProduct = basket.find(item => item.id === product.urun_id);

  function addBasket(){
    const addFind = basket.find(item => item.id === product.urun_id);
    if(addFind)
    {
      addFind.amount += 1;
      setBasket([...basket.filter(item => item.id !== product.urun_id),{
        id : product.urun_id,
        name: product.urun_isim,
        img : product.detay,
        price  : product.fiyat,
        amount : addFind.amount
      }])

    }
    else 
    {
      setBasket([...basket,{
        id : product.urun_id,
        name: product.urun_isim,
        price  : product.fiyat,
        img : product.detay,
        amount : 1
      }])
    }
  }

  function removeBasket(){
    const removeFind = basket.find(item => item.id === product.urun_id);
    removeFind.amount -=1;
    if(removeFind.amount === 0)
    {
      setBasket([...basket.filter(item => item.id !== product.urun_id)]);
    }
    else
    {
      setBasket([...basket.filter(item => item.id !== product.urun_id),
      {
        id : product.urun_id,
        name: product.urun_isim,
        img : product.detay,
        price  : product.fiyat,
        amount : removeFind.amount
      }])
    }
  }

  return (
    <div>
    <div className='product'>
    <div className='countProduct'>
    <button onClick={addBasket} >+</button> <b> {basketProduct && basketProduct.amount || 0} </b><button  disabled={!basketProduct} onClick={removeBasket} >-</button>
    </div>
    <img src={product.detay} />
    <div className='productsInfo'>
    <p>{product.urun_isim}</p>
    <p>$ {product.fiyat}</p>
    </div>
    </div>

    </div>
    )
  }

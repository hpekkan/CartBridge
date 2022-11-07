import Basket from '../components/Basket';
import Header from '../components/Header';
import Product from '../components/Product';
import axios from 'axios';
let products = [];
axios.get(`http://localhost:3008/HepsiburdaData`)
    .then(res => {
      products = res.data
    }).catch(err => { 
    })
function Hepsiburda(props) {  
    
  return (
    <>
    <Header title='header' store='Hepsiburda'/>

    <div className='productContainer'>
    <div className='productBoxs'>

    {
      products.map(product => (
        <Product key = { product.urun_id} basket={props.basket} setBasket={props.setBasket}  product={product} />
        ))
    }

    </div>
    <Basket cost={props.cost} basket={props.basket}/>
    </div>

    </>
    
    );
}

export default Hepsiburda;
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { MYSepet } from "../style"

export default function Teksepet({kullanici_adi,success,basket,cost}) {
  const [isSuccess, setisSuccess] = useState(false);
  const [selected, setSelected] = useState("");

  const [fail,setFail] = useState(false);
  const [sepetOnay,setsepetOnay] = useState(false);
  const [cards, setCards] = useState([]);
    useEffect(() => {
      if(success){
        axios.get(`http://localhost:3008/getCard`,{
            params: {
                kullanici_adi: kullanici_adi
            }
          })
            .then(res => {
                console.log(res.data)
                setCards(res.data)  
                setisSuccess(true);
                this.setState({ state: this.state });
            }).catch(err => { 
            })
        
       
    };
       
} , []);

    const handleSubmit = (e) => {
       
        if(success && cost>0){
          
       
        
        
       e.preventDefault();
       axios.post(`http://localhost:3008/SatinAl`, {'kullanici_adi':kullanici_adi,'miktar':cost,'kart_id':selected})
        .then(res => {
          setFail(false);
          setsepetOnay(true);

        }).catch(err => { 
            setFail(true);
            setsepetOnay(false); 
        })
       
     }else{
         setFail(true);
         setsepetOnay(false);
     }
    }
     


  return (
        <MYSepet>
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
        <form id='onayla' onSubmit={handleSubmit} noValidate>
            <select onChange={(e) => setSelected(e.target.value)}>
                {
                    
                    cards.map(card => 
                    
                        
                        
                         
                            <option value = {card.kart_id}> {card.kart_isim} </option>
                        )
                }
            </select>
            

            {success&&cost>0&&(<button type="submit">Ödeme Yap</button>)}
            {sepetOnay && (<span>Ödeme Başarılı</span>)}
        </form>
    </MYSepet>
     )
   }

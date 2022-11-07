import logo from 'C:/Users/LEGION/Desktop/All Folders/372/515/public/logo.png';
import React from "react"
import Link from "next/link"
import { withRouter } from "next/router"
import { TabHead, TabContainer, TabBody, Tab, TabC,Logo,Login, MyHeader, Sepet } from "../../style"
import Form from "../../components/Form.js"
import Trendiol from "../../pages/Trendiol"
import Hepsiburda from "../../pages/Hepsiburda"
import Amazın from "../../pages/Amazın"
import Home from "../../pages/Home"
import {useState,useEffect,useContext } from 'react';
import Teksepet from "../../pages/Teksepet"
import axios from 'axios';

const Tabs = ({ router }) => {
  const UserContext = React.createContext();
  const {
    query: { tab }
  } = router
  const intialValues = { kullaniciadi: "", password: "" };
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fail,setFail] = useState(false);
  const [success,setSuccess] = useState(false);
    const submit = () => {
      console.log(formValues);
    };
    //input change handler
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    };
  const handleSubmit = (e) => {
     if(success){
        setSuccess(false);
        document.getElementById("myform").reset();
        return
     }
     

    e.preventDefault();
    axios.post(`http://localhost:3008/Login`, { "kullaniciadi":e.target.kullaniciadi.value,"password": e.target.password.value})
      .then(res => {
        console.log(res);
        console.log(res.data);
        setFail(false);
        setSuccess(true);
        setUser(e.target.kullaniciadi.value);

      }).catch(err => {
        setFail(true);
        setSuccess(false);
        
      })
    
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };
  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  
    if (!values.email) {
      errors.email = "Cannot be blank";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format";
    }
  
    if (!values.password) {
      errors.password = "Cannot be blank";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    }
  
    return errors;
  };
  
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submit();
    }
  }, [formErrors]);
        
        
  const [basket,setBasket] = useState([]);
  const [cost,setCost] = useState("");
  
  useEffect( () => {
    const totalPrice = basket.reduce((pre,basket) => pre +(basket.amount*basket.price),0);
    setCost(totalPrice);
  
  },[basket])

  const isHome = tab === "0" || tab == null
  const isTabOne = tab === "1" 
  const isTabTwo = tab === "2"
  const isTabThree = tab === "3"
  const isCart = tab === "4"
  const isLogin = tab === "5"
  const goHome = () => {
    isHome = true
    isTabOne = false
    isTabTwo = false
    isTabThree = false
    isLogin = false
    isCart = false
  }
  const goSub = () => {
    isHome = false

  }
  return (
    <MyHeader>
        <Logo>
          <Link href={{ pathname: "/", query: { tab: "0" } }}>
            <img src='./logo.png' alt="515-Logo" width="75" height="50" onClick={goHome}/>
          </Link>
        </Logo>
      <TabContainer>
          <TabHead>
            <TabC>
              <Tab selected={isTabOne} isFirst="true" onClick={goSub}>
                <Link href={{ pathname: "/", query: { tab: "1" } }}>
                  <a>amazon.com.tr</a>
                </Link>
              </Tab>
              <Tab selected={isTabTwo}>
                <Link href={{ pathname: "/", query: { tab: "2" } }}>
                  <a>hepsiburada.com</a>
                </Link>
              </Tab>
              <Tab selected={isTabThree}>
                <Link href={{ pathname: "/", query: { tab: "3" } }}>
                  <a>trendiol.com</a>
                </Link>
              </Tab>
              
            </TabC>
            <Login>
              
            <form  onSubmit={handleSubmit} noValidate id = "myform">
                { fail && (
                          <div>Başarısız Giriş</div>
                    )}
                    { !success && 
                (<div >
                  <label htmlFor="kullaniciadi" >Kullanıcı Adı</label>
                  <input
                    type="kullaniciadi"
                    name="kullaniciadi"
                    id="kullaniciadi"
                    value={formValues.kullaniciadi}
                    onChange={handleChange}
                  />
                  {formErrors.kullaniciadi && <span>{formErrors.kullaniciadi}</span>}
                </div>)}
                { !success && 
                ( <div>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formValues.password}
                    onChange={handleChange}
                  />
                  {formErrors.password && <span>{formErrors.password}</span>}
                </div>)}
                <button type="submit">
                    { !success && (
                          <span>Giriş Yap</span>
                    )}
                    { success && (
                          <span>Çıkış Yap</span>
                    )}
                </button>
            </form>
                
            </Login>
            { !success && 
            <Sepet>
            
              <Link href={{ pathname: "/", query: { tab: "5" } }}>
                  <a >Kayıt Ol</a>
                </Link>
               
            </Sepet>
          }
          { success && 
            <Sepet>
              <Link href={{ pathname: "/", query: { tab: "4" } }}>
                  <a>TEK SEPET</a>
                </Link>
            </Sepet>
          }
          </TabHead>
        <TabBody>
          {isHome && 
            <React.Fragment>
              <Home kullanici_adi={user} success={success}></Home>
            </React.Fragment>}

          {isTabOne && 
          <React.Fragment>
            <Amazın  basket={basket} setBasket={setBasket} cost={cost}/>
          </React.Fragment>}
          
          {isTabTwo && <React.Fragment><Hepsiburda   basket={basket} setBasket={setBasket} cost={cost}/></React.Fragment>}
          {isTabThree && <React.Fragment><Trendiol  basket={basket} setBasket={setBasket} cost={cost}/></React.Fragment>}
          {isLogin && <React.Fragment><Form></Form></React.Fragment>}
          {isCart && <React.Fragment><Teksepet kullanici_adi={user} success={success} basket={basket} setBasket={setBasket} cost={cost}/></React.Fragment>}
        </TabBody>
      </TabContainer>
    
    </MyHeader>
  )
}

export default withRouter(Tabs)

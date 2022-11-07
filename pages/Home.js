import React, { useState, useEffect } from "react";
import axios from 'axios';
import {HomeMain} from "../style"

const Home = (props) => {
  const intialValues = { kart: "", cvv: "",geccerlilik:"",isim:"" };

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

  //form submission handler
  const handleSubmit = (e) => {
   
    e.preventDefault();
    validate(formValues);

    if (props.success) {
      if(Object.keys(validate(formValues)).length == 0)
      axios.post(`http://localhost:3008/createCC`, { "kart":e.target.kart.value,"cvv": e.target.cvv.value,"gecerlilik": e.target.gecerlilik.value,"isim": e.target.isim.value,"kullanici_adi":props.kullanici_adi})
      .then(res => {
        console.log(res);
        console.log(res.data);
        setFail(false);
        setSuccess(true);
      }).catch(err => {
        setFail(true);
        setSuccess(false);   
      })
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
    }else {
      setFail(true);
      setSuccess(false);

    }
    
  };

  //form validation handler
  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.kart) {
      errors.kart = "Cannot be blank";
    } else if (values.kart.length !=16 ) {
      errors.kart = "Kart no must be 16 characters";
    }
    if (!values.gecerlilik) {
      errors.gecerlilik = "Cannot be blank";
    }

    if (!values.cvv) {
      errors.cvv = "Cannot be blank";
    } else if (values.cvv.length != 3) {
      errors.cvv = "CVV must be 3 characters";
    }
    if (!values.isim) {
      errors.isim = "Cannot be blank";
    } else if (values.isim.length < 4) {
      errors.isim = "Kart ismi must be more than 4 characters";
    }
    


    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submit();
    }
  }, [formErrors]);

  return (
     
  <HomeMain>
    <section className="py-2 text-center container">
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          <h1 className="fw-light">Tek kargo üstelik sonra ödeme seçeneğiyle</h1>
          <p className="lead text-muted">Tahminlere göre önümüzdeki dönemde tüm ödeme yöntemleri arasında %4.2’lik bir paya  sahip olacak.
              
          </p>
        </div>
      </div>
    </section>
    <div className="album py-1 bg-light">
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <div className="col">
              <h3 >Şimdi Al Sonra Öde</h3>
            <div >
              <img  src="https://www.oceanpayment.com/wp-content/uploads/2021/11/BNPL.png" alt="Card image cap" />
              
            </div>
          </div>
          
          
        </div>
      </div>
    </div>
      
    { props.success && (<div>
      { success && (
        <span>Kart Başarıyla Eklendi</span>
      )}
      { fail && (
        <span>Kart Eklenirken Bir hata oluştu</span>
      )}
      
      <form onSubmit={handleSubmit} noValidate>
        
        <div>
          <label htmlFor="kart" className = "kartekle">Kart No</label>
          <input
            type="kart"
            name="kart"
            id="kart"
            value={formValues.kart}
            onChange={handleChange}
          />
          {formErrors.kart && <span>{formErrors.kart}</span>}
        </div>
        <div>
          <label htmlFor="cvv">CVV</label>
          <input
            type="cvv"
            name="cvv"
            id="cvv"
            value={formValues.cvv}
            onChange={handleChange}
          />
          {formErrors.cvv && <span>{formErrors.cvv}</span>}
        </div>
        <div>
          <label htmlFor="gecerlilik">Kart Geçerlilik</label>
          <input
            type="gecerlilik"
            name="gecerlilik"
            id="gecerlilik"
            value={formValues.gecerlilik}
            onChange={handleChange}
          />
          {formErrors.gecerlilik && <span>{formErrors.gecerlilik}</span>}
        </div>
        <div>
          <label htmlFor="isim">Kart İsim</label>
          <input
            type="isim"
            name="isim"
            id="isim"
            value={formValues.isim}
            onChange={handleChange}
          />
          {formErrors.isim && <span>{formErrors.isim}</span>}
        </div>

        <button type="submit">Register</button>
      </form>
    </div>)}
    </HomeMain>
      
      
  );
};

export default Home;
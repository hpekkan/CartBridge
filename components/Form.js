import React, { useState, useEffect } from "react";
import axios from 'axios';
const Form = () => {
  const intialValues = { email: "", password: "" };

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
    console.log(e);
    validate(formValues);
    e.preventDefault();
    if(Object.keys(validate(formValues)).length == 0)
      axios.post(`http://localhost:3008/createUser`, { "email":e.target.email.value,"password": e.target.password.value,"kullaniciadi": e.target.kullaniciadi.value,"surname": e.target.surname.value,"name":e.target.name.value})
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
    setIsSubmitting(false);
  };

  //form validation handler
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
    if (!values.kullaniciadi) {
      errors.kullaniciadi = "Cannot be blank";
    } else if (values.kullaniciadi.length < 3) {
      errors.kullaniciadi = "Kullanici adi must be more than 3 characters";
    }
    if (!values.name) {
      errors.name = "Cannot be blank";
    } 

    if (!values.surname ) {
      errors.surname = "Cannot be blank";
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting && !fail) {
      submit();
    }
  }, [formErrors]);

  return (
    <div>
      <h1>Sign in to continue</h1>
      { success && (
        <span>Form submitted successfully</span>
      )}
      { fail && (
        <span>Form failed</span>
      )}
      
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formValues.email}
            onChange={handleChange}
          />
          {formErrors.email && <span>{formErrors.email}</span>}
        </div>
        <div>
          <label htmlFor="name">İsim</label>
          <input
            type="name"
            name="name"
            id="name"
            value={formValues.name}
            onChange={handleChange}
          />
          {formErrors.name && <span>{formErrors.name}</span>}
        </div>
        <div>
          <label htmlFor="surname">Soyadı</label>
          <input
            type="surname"
            name="surname"
            id="surname"
            value={formValues.surname}
            onChange={handleChange}
          />
          {formErrors.surname && <span>{formErrors.surname}</span>}
        </div>
        <div>
          <label htmlFor="kullaniciadi">Kullanıcı Adı</label>
          <input
            type="kullaniciadi"
            name="kullaniciadi"
            id="kullaniciadi"
            value={formValues.kullaniciadi}
            onChange={handleChange}
          />
          {formErrors.kullaniciadi && <span>{formErrors.kullaniciadi}</span>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formValues.password}
            onChange={handleChange}
          />
          {formErrors.password && <span>{formErrors.password}</span>}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Form;
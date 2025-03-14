import React, { useState } from 'react';
import './App.scss';

function App() {
  const [fields, setFields] = useState({
    name: '',
    email: '',
    message: '',
    phone: ''
  })

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: '',
    phone: ''
  })

  const [fieldsValid, setFieldsValid] = useState({
    name: false,
    email: false,
    message: false,
    phone: false
  })

  const [formValid, setFormValid] = useState(false)
  const [resultMessage, setResultMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    const { name, phone, email } = fieldsValid;
    setFormValid(name && (phone || email))
  }

  const resetForm = () =>
    setFields({
      name: '',
      email: '',
      message: '',
      phone: ''
    })


  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'name':
        fieldsValid.name = value.length > 0;
        formErrors.name = fieldsValid.name ? '' : "Uzupełnij swoje imię";
        break;
      case 'email':
        fieldsValid.email = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        formErrors.email = fieldsValid.email ? '' : "Format e-maila jest nieprawidłowy";
        break;
      case 'message':
        fieldsValid.message = true
        break;
      case 'phone':
        fieldsValid.phone = value.length > 0;
        formErrors.phone = fieldsValid.phone ? '' : "Wpisz swój numer kontaktowy";
        break;
      default:
        break;
    }
    setFieldsValid(fieldsValid)
    setFormErrors(formErrors)
    validateForm()
  }

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFields({ ...fields, [name]: value })
    validateField(name, value)
  }

  const handleSubmit = (e) => {
    const { name, email, message, phone } = fields;

    e.preventDefault();
    validateForm();
    setLoading(true);
    window.Pageclip.send("RgpW5kPx9sCTMIfukxpR25zH1oToBkD6", "default", { name, email, message, phone }, (error) => {
      if (!error) {
        setResultMessage('success')
        resetForm();
      } else {
        setResultMessage('error')
      }
      setLoading(false)
    })
  }

  return (

    <div className="Contact">
      <div className="Contact-main">
        {resultMessage.length > 0 ? (
          <div className="Contact-main_form info">
            <p className={`${resultMessage === 'success' && 'text-success'} ${resultMessage === 'error' && 'text-danger'}`} style={{ textAlign: 'center', marginTop: '1rem', fontSize: '1.25rem' }}>
              {resultMessage === 'success' && "Wiadomość została poprawnie wysłana, dziękujemy!"}
              {resultMessage === 'error' && "Ups, coś poszło nie tak! Spróbuj ponownie później."}
            </p>
          </div>
        ) : (
          <div className="Contact-main_form" id="contact">
            <form className="pageclip-form">
              <div className="form-group">
                <input value={fields.name} onChange={e => handleInput(e)} type="text" className="form-control" id="exampleInputName" name="name" aria-describedby="name" placeholder="*Imię" required />
                <p className="text-danger" style={{ height: ".35rem", fontSize: "12px", marginTop: ".25rem" }}>{formErrors.name}</p>
              </div>


              <div className="custom-box">
                <div className="col1 mb-3">
                  <input value={fields.email} onChange={e => handleInput(e)} type="email" className="form-control" id="exampleInputEmail" name="email" aria-describedby="emailHelp" placeholder="*Email" required />
                  <p className="text-danger" style={{ height: ".35rem", fontSize: "12px", marginTop: ".25rem" }}>{formErrors.email}</p>
                </div>

                <div className="col2 mb-3">
                  <input value={fields.phone} onChange={e => handleInput(e)} type="text" className="form-control" id="exampleInputPhone" name="phone" aria-describedby="phone" placeholder="*Telefon" required />
                  <p className="text-danger" style={{ height: ".35rem", fontSize: "12px", marginTop: ".25rem" }}>{formErrors.phone}</p>
                </div>
              </div>


              <div className="form-group">
                <textarea value={fields.message} onChange={e => handleInput(e)} className="form-control" name="message" id="exampleFormControlTextarea" rows="5" placeholder="Napisz wiadomość..." required />
                <p className="text-danger" style={{ height: ".35rem", fontSize: "12px", marginTop: ".25rem" }}>{formErrors.message}</p>
              </div>

              <div className='d-grid'><button
                onClick={handleSubmit}
                type="submit"
                className="btn form-btn pageclip-form__submit"
                disabled={!formValid || loading}
              >
                {loading ? (
                  <span className="sr-only">Trwa wysyłanie wiadomości...</span>
                ) : (
                  <span>Wyślij wiadomość</span>
                )}
              </button></div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

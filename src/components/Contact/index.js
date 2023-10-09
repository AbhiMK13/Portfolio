import { Label } from '@mui/icons-material'
import { Button, Card, Input } from '@mui/material'
import React from 'react'
import "./index.css"
import Grid from '@mui/material/Grid';
import emailjs from '@emailjs/browser';

import { useState, useRef } from 'react'
import styled from 'styled-components'

const Container  =  styled.div`
display: flex;
flex-direction: column;
justify-content: center;
position: relative;
z-index: 1;
align-items: center;
padding: 0px 0px 60px 0px;
@media (max-width: 960px) {
    padding: 0px;
}

`
const Wrapper = styled.div`
position: relative;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: column;
width: 100%;
max-width: 1350px;
padding: 40px 0px 0px 0px;
gap: 12px;
@media (max-width: 960px) {
    flex-direction: column;
}
`;
const Title = styled.div`
font-size: 42px;
text-align: center;
font-weight: 600;
margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
      margin-top: 12px;
      font-size: 32px;
  }
`;
const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 16px;
    }
`;

const ContactContainer = styled.div`
width: 100%;
max-width: 500px;
background: ${({ theme }) => theme.card};
border: 0.1px solid #854CE6;
box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
border-radius: 16px;
padding: 18px 36px;
@media (max-width: 768px) {
  max-width: 400px;
  padding: 10px 36px;
}
@media (max-width: 500px) {
  max-width: 330px;
  padding: 10px 36px;
}
`
export const Contact = () => {
  const [formsubmitted, setFormsubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const form = useRef();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here
    console.log('Form Data:', formData);
    // Clear the form fields
    emailjs.sendForm('service_opd6ert', 'template_dy0pjgk', form.current, 'fVzxQa8onseyv_-P4')
      .then((result) => {
          console.log(result.text);
          setFormsubmitted(true)
      }, (error) => {
          console.log(error.text);
      });
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };


  return (
  <Container id="contact">
    <Wrapper>
    <Title>Contact</Title>

    <Desc>

      Please feel free to contact me..
                </Desc>

      <ContactContainer>
      <div className="contact-form-container">
        {formsubmitted?<><p className='message-sent'>Thank you for your message!<br/>Will Contact you soon.</p></>:<> 
             <form ref={form} onSubmit={handleSubmit} enctype="text/plain">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
</>}
    </div>
      </ContactContainer>
    </Wrapper>
  </Container>
  )
}

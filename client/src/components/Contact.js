import React from 'react'
import emailjs from '@emailjs/browser';

export default function Contact() {

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_uthi5mq', 'template_salulmi', e.target ,'euFAMk63XJJ819ic2')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };


  return (
    <div className='contact_page'>
      <form onSubmit={sendEmail} id="contact-form">
        <h2>Send Us a message</h2>
        <input type="hidden" name="contact_number" />
        <input type="text" name="user_name" placeholder='Name' />
        <input type="email" name="user_email" placeholder='Email' />
        <input type="number" name="user_phone" placeholder='Phone' />
        <textarea name="user_message" placeholder='Message'></textarea>
        <input type="submit" value="Send" />
      </form>
    </div>
  )
}

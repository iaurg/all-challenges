import React from 'react'
import './Contact.scss'

export default function Contact ({ data: contact }) {
  const admissionDate = new Date(contact.admissionDate).toLocaleDateString()
  return (
    <article className='contact' data-testid='contact'>
      <span className='contact__avatar'><img src={contact.avatar} alt={contact.name} /></span>
      <span className='contact__data'>{contact.name}</span>
      <span className='contact__data'>{contact.phone}</span>
      <span className='contact__data'>{contact.country}</span>
      <span className='contact__data'>{admissionDate}</span>
      <span className='contact__data'>{contact.company}</span>
      <span className='contact__data'>{contact.department}</span>
    </article>
  )
}

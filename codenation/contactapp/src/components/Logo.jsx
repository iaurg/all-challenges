import React from 'react'
import { ReactComponent as LogoSvg } from '../assets/img/logo.svg'
import './Logo.scss'
export default function Logo () {
  return (
    <a href='/' className='topbar__logo'>
      <LogoSvg alt='Logo Contatos' />
    </a>
  )
}

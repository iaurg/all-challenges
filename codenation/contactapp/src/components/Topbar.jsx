import React from 'react'
import Logo from './Logo'
import './Topbar.scss'
export default function Topbar () {
  return (
    <header className='topbar' data-testid='topbar'>
      <div className='container'>
        <Logo />
      </div>
    </header>
  )
}

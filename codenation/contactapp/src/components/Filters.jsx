import React from 'react'
import './Filters.scss'

export default function Filters ({ handleSearch, handleButtonFilter, buttonSelected }) {
  return (
    <div className='container' data-testid='filters'>
      <section className='filters'>
        <div className='filters__search'>
          <input type='text' className='filters__search__input' placeholder='Pesquisar' onChange={(e) => handleSearch(e)} />

          <button className='filters__search__icon'>
            <i className='fa fa-search' />
          </button>
        </div>

        <button className={`filters__item ${buttonSelected === 'name' ? 'is-selected' : null}`} onClick={() => handleButtonFilter('name')}>
          Nome <i className='fas fa-sort-down' />
        </button>

        <button className={`filters__item ${buttonSelected === 'country' ? 'is-selected' : null}`} onClick={() => handleButtonFilter('country')}>
          País <i className='fas fa-sort-down' />
        </button>

        <button className={`filters__item ${buttonSelected === 'company' ? 'is-selected' : null}`} onClick={() => handleButtonFilter('company')}>
          Empresa <i className='fas fa-sort-down' />
        </button>

        <button className={`filters__item ${buttonSelected === 'department' ? 'is-selected' : null}`} onClick={() => handleButtonFilter('department')}>
          Departamento <i className='fas fa-sort-down' />
        </button>

        <button className={`filters__item ${buttonSelected === 'admissionDate' ? 'is-selected' : null}`} onClick={() => handleButtonFilter('admissionDate')}>
          Data de admissão <i className='fas fa-sort-down' />
        </button>
      </section>
    </div>
  )
}

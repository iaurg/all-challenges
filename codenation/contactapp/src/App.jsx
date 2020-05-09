import React from 'react'
import Topbar from './components/Topbar'
import Filters from './components/Filters'
import Contacts from './components/Contacts'
import Loading from './components/Loading'
import './App.scss'
import { orderBy } from './utils/order'
import { baseUrl } from './services/api'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      loading: false,
      contacts: [],
      filteredContacts: []
    }
  }

  async componentDidMount () {
    this.setState({ loading: true })
    const response = await fetch(baseUrl)
    const data = await response.json()
    this.setState({ loading: false, contacts: data, filteredContacts: data })
  }

  onHandleSearch = (event) => {
    const { contacts } = this.state
    const value = event.target.value
    if(value === ''){
     return this.setState({filteredContacts: contacts})
    }
    const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(value));
    this.setState({filteredContacts: filteredContacts})
  }

  onHandleButtonFilter = (type) => {
    const { filteredContacts } = this.state;
    this.setState({buttonSelected: type, buttonClicked:true})
    if(this.state.buttonClicked){
      const ordered = orderBy(filteredContacts, type, 'desc');
      this.setState({ filteredContacts:ordered, buttonClicked:false })
    } else {
      const ordered = orderBy(filteredContacts, type, 'asc');
      this.setState({ filteredContacts:ordered, buttonClicked:true })
    }
  }  

  render () {
    const { loading, filteredContacts } = this.state
    return (
      <>
        <Topbar />        
        <Filters
          handleSearch={this.onHandleSearch}
          handleButtonFilter={this.onHandleButtonFilter}
          buttonSelected={this.state.buttonSelected}
        />
        {loading ? <Loading /> : <Contacts contacts={filteredContacts} />}        
      </>
    )
  }
}

export default App

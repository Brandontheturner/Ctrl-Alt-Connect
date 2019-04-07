import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import Navbar from './layout/Navbar'
import Landing from './layout/Landing'
import Footer from './layout/Footer'
import Login from './auth/Login'
import Register from './auth/Register'
import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Container>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </Container>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App

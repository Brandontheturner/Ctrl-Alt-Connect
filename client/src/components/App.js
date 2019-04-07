import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import history from '../history'
import PrivateRoute from './routes/PrivateRoute'
import Navbar from './layout/Navbar'
import Landing from './layout/Landing'
import Footer from './layout/Footer'
import Login from './auth/Login'
import Register from './auth/Register'
import Dashboard from './dashboard'
import './App.css'

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Container className="body">
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
          </Container>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App

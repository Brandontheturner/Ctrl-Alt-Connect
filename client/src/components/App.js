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
import CreateProfile from './dashboard/profile-actions/CreateProfile'
import EditProfile from './dashboard/profile-actions/EditProfile'
import AddExperience from './dashboard/add-credentials/AddExperience'
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
            <PrivateRoute path="/create-profile" component={CreateProfile} />
            <PrivateRoute path="/edit-profile" component={EditProfile} />
            <PrivateRoute path="/add-experience" component={AddExperience} />
          </Container>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App

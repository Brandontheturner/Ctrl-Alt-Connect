import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import history from '../history'
import PrivateRoute from './routes/PrivateRoute'
import Navbar from './layout/navbar/Navbar'
import Landing from './layout/Landing'
import Footer from './layout/Footer'
import Login from './auth/Login'
import Register from './auth/Register'
import Dashboard from './dashboard/Dashboard'
import CreateProfile from './dashboard/profile-actions/CreateProfile'
import EditProfile from './dashboard/profile-actions/EditProfile'
import AddExperience from './dashboard/add-credentials/AddExperience'
import AddEducation from './dashboard/add-credentials/AddEducation'
import AccountSettings from './settings'
import Profiles from './profiles/Profiles'
import Profile from './profile/Profile'
import './App.css'

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Container className="body">
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/profiles" component={Profiles} />
            <Route path="/profile/:handle" component={Profile} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/create-profile" component={CreateProfile} />
            <PrivateRoute path="/edit-profile" component={EditProfile} />
            <PrivateRoute path="/add-experience" component={AddExperience} />
            <PrivateRoute path="/add-education" component={AddEducation} />
            <PrivateRoute path="/settings" component={AccountSettings} />
          </Container>
          <Footer />
        </>
      </Router>
    )
  }
}

export default App

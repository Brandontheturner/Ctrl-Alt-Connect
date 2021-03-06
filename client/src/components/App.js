import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import history from '../history'
import PrivateRoute from './routes/PrivateRoute'
import Navbar from './layout/navbar/Navbar'
import Landing from './layout/landing/Landing'
import Footer from './layout/Footer'
import Login from './auth/Login'
import Register from './auth/Register'
import Dashboard from './dashboard/Dashboard'
import CreateProfile from './dashboard/profile-actions/CreateProfile'
import EditProfile from './dashboard/profile-actions/EditProfile'
import AddExperience from './dashboard/profile-actions/add-credentials/AddExperience'
import AddEducation from './dashboard/profile-actions/add-credentials/AddEducation'
import AccountSettings from './settings/AccountSettings'
import Profiles from './profiles/Profiles'
import Profile from './profile/Profile'
import PostPage from './posts/PostPage'
import PostFeed from './posts/PostFeed'
import NotFound from './shared/pages/NotFound'
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
            <Route path="/profile/handle/:handle" component={Profile} />
            <Route path="/profile/user/:userId" component={Profile} />
            <Route path="/not-found" component={NotFound} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/create-profile" component={CreateProfile} />
            <PrivateRoute path="/edit-profile" component={EditProfile} />
            <PrivateRoute path="/add-experience" component={AddExperience} />
            <PrivateRoute path="/add-education" component={AddEducation} />
            <PrivateRoute path="/settings" component={AccountSettings} />
            <PrivateRoute path="/feed" component={PostFeed} />
            <PrivateRoute path="/post/:id" component={PostPage} />
          </Container>
          <Footer />
        </>
      </Router>
    )
  }
}

export default App

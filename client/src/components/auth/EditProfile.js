import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Form, Header } from 'semantic-ui-react'
import FormInput from './form/FormInput'
import FormSelect from './form/FormSelect'
import FormTextArea from './form/FormTextArea'
import { createProfile, getCurrentProfile } from '../../actions/profileActions'
import './form/Forms.css'

const options = [
  { text: 'Developer', value: 'Developer' },
  { text: 'Junior Developer', value: 'Junior Developer' },
  { text: 'Senior Developer', value: 'Senior Developer' },
  { text: 'Manager', value: 'Manager' },
  { text: 'Student or Learning', value: 'Student or Learning' },
  { text: 'Instructor or Teacher', value: 'Instructor or Teacher' },
  { text: 'Intern', value: 'Intern' },
  { text: 'Other', value: 'Other' }
]
class EditProfile extends Component {
  state = {
    handle: '',
    company: '',
    website: '',
    location: '',
    skills: '',
    status: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    profile: {},
    errors: {},
    displaySocial: false
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  handleSubmit = () =>
    this.props.createProfile({
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    })

  toggleDisplaySocial = e => {
    this.setState({ displaySocial: !this.state.displaySocial })
  }

  static getDerivedStateFromProps({ errors }) {
    if (errors) return { errors }
  }
  componentDidUpdate({ errors }) {
    if (errors !== this.state.errors) this.setState({ errors })
  }

  // Get current profile data to fill edit profile form fields
  componentDidMount() {
    this.props.getCurrentProfile()
  }

  render() {
    const { errors, displaySocial } = this.state

    return (
      <Container text className="">
        <Header as="h1" textAlign="center">
          Edit Profile
        </Header>
        <Form onSubmit={this.handleSubmit} error noValidate>
          <span>* = required fields</span>
          <FormInput // Handle
            name="handle"
            type="text"
            placeholder="* Profile handle"
            label="A unique handle for your profile URL. Your full name, company name,
            nickname, etc (This CAN'T be changed later)"
            value={this.state.handle}
            onChange={this.handleChange}
            error={errors.handle}
          />
          <FormSelect
            name="status"
            placeholder="* Select Professional Status"
            label="Give us an idea of where you are at in your career"
            value={this.state.status}
            onChange={this.handleChange}
            options={options}
            error={errors.status}
          />
          <FormInput // Company
            name="company"
            type="text"
            placeholder="Company"
            label="Could be your own company or one you work for"
            value={this.state.company}
            onChange={this.handleChange}
            error={errors.company}
          />
          <FormInput // Website
            name="website"
            type="text"
            placeholder="Website"
            label="Could be your own or a company website"
            value={this.state.website}
            onChange={this.handleChange}
            error={errors.website}
          />
          <FormInput // Location
            name="location"
            type="text"
            placeholder="Location"
            label="City & state suggested (eg. Boston, MA)"
            value={this.state.location}
            onChange={this.handleChange}
            error={errors.location}
          />
          <FormInput // Skills
            name="skills"
            type="text"
            placeholder="* Skills"
            label="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
            value={this.state.skills}
            onChange={this.handleChange}
            error={errors.skills}
          />
          <FormInput // Github Username
            name="githubusername"
            type="text"
            placeholder="Github Username"
            label="If you want your latest repos and a Github link, include your username"
            value={this.state.githubusername}
            onChange={this.handleChange}
            error={errors.githubusername}
          />
          <FormTextArea // Bio
            name="bio"
            placeholder="A short bio of you"
            label="Tell us a little about yourself"
            value={this.state.bio}
            onChange={this.handleChange}
            error={errors.bio}
          />
          {/* SOCIAL NETWORKS */}
          <Form.Button
            type="button"
            content="Add Social Links"
            onClick={this.toggleDisplaySocial}
          />
          {displaySocial && (
            <>
              <FormInput // Twitter
                name="twitter"
                type="url"
                placeholder="Twitter Profile URL"
                icon="twitter"
                iconPosition="left"
                value={this.state.twitter}
                onChange={this.handleChange}
                error={errors.twitter}
              />
              <FormInput // Linkedin
                name="linkedin"
                type="url"
                placeholder="LinkedIn Profile URL"
                icon="linkedin"
                iconPosition="left"
                value={this.state.linkedin}
                onChange={this.handleChange}
                error={errors.linkedin}
              />
              <FormInput // Instagram
                name="instagram"
                type="url"
                placeholder="Instagram Page URL"
                icon="instagram"
                iconPosition="left"
                value={this.state.instagram}
                onChange={this.handleChange}
                error={errors.instagram}
              />
              <FormInput // Facebook
                name="facebook"
                type="url"
                placeholder="Facebook Page URL"
                icon="facebook"
                iconPosition="left"
                value={this.state.facebook}
                onChange={this.handleChange}
                error={errors.facebook}
              />
              <FormInput // YouTube
                name="youtube"
                type="url"
                placeholder="YouTube Channel URL"
                icon="youtube"
                iconPosition="left"
                value={this.state.youtube}
                onChange={this.handleChange}
                error={errors.youtube}
              />
            </>
          )}
          <Form.Button fluid primary type="submit" content="Submit" />
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = ({ profile, errors }) => ({ profile, errors })

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(EditProfile)

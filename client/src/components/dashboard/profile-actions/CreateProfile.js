import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Form, Segment } from 'semantic-ui-react'
import { createProfile } from '../../../actions/profileActions'
import FormHeader from '../../shared/form/FormHeader'
import FormInput from '../../shared/form/FormInput'
import FormInputWithIcon from '../../shared/form/FormInputWithIcon'
import FormSelect from '../../shared/form/FormSelect'
import FormTextArea from '../../shared/form/FormTextArea'

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
class CreateProfile extends Component {
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

  componentWillReceiveProps({ errors }) {
    if (errors) this.setState({ errors })
  }

  render() {
    const { errors, displaySocial } = this.state

    return (
      <Container text>
        <FormHeader
          content="Create Profile"
          subheader="Let's get some information to make your profile stand out"
        />
        <Segment attached="bottom">
          <Form onSubmit={this.handleSubmit} error noValidate>
            <span>* = required fields</span>
            <FormInput // Handle
              name="handle"
              type="text"
              placeholder="* Profile handle"
              info="A unique handle for your profile URL. Your full name, company name,
            nickname, etc (This CAN'T be changed later)"
              value={this.state.handle}
              onChange={this.handleChange}
              error={errors.handle}
            />
            <FormSelect
              name="status"
              placeholder="* Select Professional Status"
              info="Give us an idea of where you are at in your career"
              value={this.state.status}
              onChange={this.handleChange}
              options={options}
              error={errors.status}
            />
            <FormInput // Company
              name="company"
              type="text"
              placeholder="Company"
              info="Could be your own company or one you work for"
              value={this.state.company}
              onChange={this.handleChange}
              error={errors.company}
            />
            <FormInput // Website
              name="website"
              type="text"
              placeholder="Website"
              info="Could be your own or a company website"
              value={this.state.website}
              onChange={this.handleChange}
              error={errors.website}
            />
            <FormInput // Location
              name="location"
              type="text"
              placeholder="Location"
              info="City & state suggested (eg. Boston, MA)"
              value={this.state.location}
              onChange={this.handleChange}
              error={errors.location}
            />
            <FormInput // Skills
              name="skills"
              type="text"
              placeholder="* Skills"
              info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
              value={this.state.skills}
              onChange={this.handleChange}
              error={errors.skills}
            />
            <FormInput // Github Username
              name="githubusername"
              type="text"
              placeholder="Github Username"
              info="If you want your latest repos and a Github link, include your username"
              value={this.state.githubusername}
              onChange={this.handleChange}
              error={errors.githubusername}
            />
            <FormTextArea // Bio
              name="bio"
              placeholder="A short bio of you"
              info="Tell us a little about yourself"
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
                <FormInputWithIcon // Twitter
                  name="twitter"
                  type="url"
                  placeholder="Twitter Profile URL"
                  icon="twitter"
                  iconPosition="left"
                  value={this.state.twitter}
                  onChange={this.handleChange}
                  error={errors.twitter}
                />
                <FormInputWithIcon // Linkedin
                  name="linkedin"
                  type="url"
                  placeholder="LinkedIn Profile URL"
                  icon="linkedin"
                  iconPosition="left"
                  value={this.state.linkedin}
                  onChange={this.handleChange}
                  error={errors.linkedin}
                />
                <FormInputWithIcon // Instagram
                  name="instagram"
                  type="url"
                  placeholder="Instagram Page URL"
                  icon="instagram"
                  iconPosition="left"
                  value={this.state.instagram}
                  onChange={this.handleChange}
                  error={errors.instagram}
                />
                <FormInputWithIcon // Facebook
                  name="facebook"
                  type="url"
                  placeholder="Facebook Page URL"
                  icon="facebook"
                  iconPosition="left"
                  value={this.state.facebook}
                  onChange={this.handleChange}
                  error={errors.facebook}
                />
                <FormInputWithIcon // YouTube
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
        </Segment>
      </Container>
    )
  }
}

const mapStateToProps = ({ profile, errors }) => ({ profile, errors })

export default connect(
  mapStateToProps,
  { createProfile }
)(CreateProfile)

import React, { Component } from 'react'
import { Container, Form, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { addExperience } from '../../../actions/profileActions'
import FormInput from '../../shared/form/FormInput'
import FormTextArea from '../../shared/form/FormTextArea'
import BackToDashboard from '../../shared/buttons/BackToDashboard'

class AddExperience extends Component {
  state = {
    company: '',
    title: '',
    location: '',
    description: '',
    from: '',
    to: '',
    current: false,
    disabled: false,
    errors: {}
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  handleCheckboxClick = () =>
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    })
  handleSubmit = () => {
    this.props.addExperience({
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      description: this.state.description,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current
    })
  }

  componentWillReceiveProps({ errors }) {
    if (errors) this.setState({ errors })
  }

  render() {
    const { errors } = this.state
    return (
      <Container text className="">
        <BackToDashboard />
        <Header as="h1" textAlign="center">
          Add Experience
          <Header.Subheader>
            Add any job or position that you have had in the past or present
          </Header.Subheader>
        </Header>
        <Form onSubmit={this.handleSubmit} error noValidate>
          <span>* = required fields</span>
          <FormInput // Company
            name="company"
            type="text"
            placeholder="* Company"
            value={this.state.company}
            onChange={this.handleChange}
            error={errors.company}
          />
          <FormInput // Title
            name="title"
            type="text"
            placeholder="* Job Title"
            value={this.state.title}
            onChange={this.handleChange}
            error={errors.title}
          />
          <FormInput // Location
            name="location"
            type="text"
            placeholder="Location"
            value={this.state.location}
            onChange={this.handleChange}
            error={errors.location}
          />
          <FormInput // From Date
            name="from"
            type="date"
            value={this.state.from}
            label="From Date"
            onChange={this.handleChange}
            error={errors.from}
          />
          <FormInput // To Date
            name="to"
            type="date"
            value={this.state.to}
            label="To Date"
            onChange={this.handleChange}
            error={errors.to}
            disabled={this.state.disabled}
          />
          <Form.Checkbox
            onClick={this.handleCheckboxClick}
            label="Current Job"
          />
          <FormTextArea // Job Description
            name="description"
            placeholder="Job Description"
            info="Tell us about the position"
            value={this.state.description}
            onChange={this.handleChange}
            error={errors.description}
          />

          <Form.Button fluid primary type="submit" content="Submit" />
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = ({ profile, errors }) => ({ profile, errors })

export default connect(
  mapStateToProps,
  { addExperience }
)(AddExperience)

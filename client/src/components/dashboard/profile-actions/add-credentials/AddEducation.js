import React, { Component } from 'react'
import { Container, Form, Header, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { addEducation } from '../../../../actions/profileActions'
import FormInput from '../../../shared/form/FormInput'
import FormTextArea from '../../../shared/form/FormTextArea'
import BackToDashboard from '../../../shared/buttons/BackToDashboard'

class AddEducation extends Component {
  state = {
    school: '',
    degree: '',
    fieldofstudy: '',
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
    this.props.addEducation({
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
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
        <Segment>
          <Header as="h1" textAlign="center">
            Add Education
            <Header.Subheader>
              Add any school, bootcamp, etc you have attended
            </Header.Subheader>
          </Header>
          <Form onSubmit={this.handleSubmit} error noValidate>
            <span>* = required fields</span>
            <FormInput // School
              name="school"
              type="text"
              placeholder="* School"
              value={this.state.school}
              onChange={this.handleChange}
              error={errors.school}
            />
            <FormInput // degree
              name="degree"
              type="text"
              placeholder="* Degree"
              value={this.state.degree}
              onChange={this.handleChange}
              error={errors.degree}
            />
            <FormInput // Field of study
              name="fieldofstudy"
              type="text"
              placeholder="* Field of Study"
              value={this.state.fieldofstudy}
              onChange={this.handleChange}
              error={errors.fieldofstudy}
            />
            <FormInput // From Date
              name="from"
              type="date"
              value={this.state.from}
              label="* From Date"
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
            <Form.Checkbox onClick={this.handleCheckboxClick} label="Current" />
            <FormTextArea // Description
              name="description"
              placeholder="Program Description"
              info="Tell us about the program you were in"
              value={this.state.description}
              onChange={this.handleChange}
              error={errors.description}
            />

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
  { addEducation }
)(AddEducation)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Header } from 'semantic-ui-react'
import { deleteExperience } from '../../actions/profileActions'
import Moment from 'react-moment'

class Experience extends Component {
  handleDeleteClick = id => this.props.deleteExperience(id)

  render() {
    const { experience } = this.props

    return (
      <>
        <Header>Experience</Header>
        <Table basic="very" celled>
          <Table.Header>
            <Table.Row>
              {this.props.experience.length ? (
                <>
                  <Table.HeaderCell>Company</Table.HeaderCell>
                  <Table.HeaderCell>Title</Table.HeaderCell>
                  <Table.HeaderCell>Years</Table.HeaderCell>
                </>
              ) : (
                'You currently have no experience credentials listed'
              )}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.experience.map(item => (
              <Table.Row key={item._id}>
                <Table.Cell>{item.company}</Table.Cell>
                <Table.Cell>{item.title}</Table.Cell>
                <Table.Cell>
                  <Moment format="YYYY/MM/DD">{item.from}</Moment> -
                  {item.to === null ? (
                    ' Now'
                  ) : (
                    <Moment format=" YYYY/MM/DD">{item.to}</Moment>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Button
                    icon="trash alternate outline"
                    basic
                    negative
                    onClick={() => this.handleDeleteClick(item._id)}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </>
    )
  }
}

export default connect(
  null,
  { deleteExperience }
)(Experience)

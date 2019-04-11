import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Header } from 'semantic-ui-react'
import { deleteExperience } from '../../actions/profileActions'
import formatDate from '../../utils/formatDate'

class Experience extends Component {
  handleDeleteClick = id => this.props.deleteExperience(id)

  render() {
    return (
      <>
        <Header>Experience</Header>
        {this.props.experience.length ? (
          <Table basic="very" celled padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Company</Table.HeaderCell>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Years</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.experience.map(item => (
                <Table.Row key={item._id}>
                  <Table.Cell>{item.company}</Table.Cell>
                  <Table.Cell>{item.title}</Table.Cell>
                  <Table.Cell>
                    {item.to === null
                      ? `${formatDate(item.from)} - Now`
                      : `${formatDate(item.from)} - ${formatDate(item.to)}`}
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
        ) : (
          'You currently have no experience credentials listed'
        )}
      </>
    )
  }
}

export default connect(
  null,
  { deleteExperience }
)(Experience)

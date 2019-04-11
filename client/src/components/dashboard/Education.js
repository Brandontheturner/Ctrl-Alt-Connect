import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Header, Segment } from 'semantic-ui-react'
import { deleteEducation } from '../../actions/profileActions'
import formatDate from '../../utils/formatDate'

class Education extends Component {
  handleDeleteClick = id => this.props.deleteEducation(id)

  render() {
    return (
      <Segment>
        <Header>Education</Header>
        {this.props.education.length ? (
          <Table basic="very" celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>School</Table.HeaderCell>
                <Table.HeaderCell>Degree</Table.HeaderCell>
                <Table.HeaderCell>Field of Study</Table.HeaderCell>
                <Table.HeaderCell>Years</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.education.map(item => (
                <Table.Row key={item._id}>
                  <Table.Cell>{item.school}</Table.Cell>
                  <Table.Cell>{item.degree}</Table.Cell>
                  <Table.Cell>{item.fieldofstudy}</Table.Cell>
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
          'You currently have no education credentials listed'
        )}
      </Segment>
    )
  }
}

export default connect(
  null,
  { deleteEducation }
)(Education)

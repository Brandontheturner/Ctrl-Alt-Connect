import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Header } from 'semantic-ui-react'
import { deleteEducation } from '../../actions/profileActions'
import Moment from 'react-moment'

class Education extends Component {
  handleDeleteClick = id => this.props.deleteEducation(id)

  render() {
    return (
      <>
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
        ) : (
          'You currently have no education credentials listed'
        )}
      </>
    )
  }
}

export default connect(
  null,
  { deleteEducation }
)(Education)

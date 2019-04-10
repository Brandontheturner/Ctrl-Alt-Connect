import React, { Component } from 'react'
import Moment from 'react-moment'
import { Grid, List, Header, Segment } from 'semantic-ui-react'

class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props
    return (
      <Grid columns={2}>
        <Grid.Column>
          <Header content="Experience" color="blue" textAlign="center" />
          <Segment>
            <List relaxed divided>
              {experience.map(item => (
                <List.Item key={item._id}>
                  <List.Header content={item.company} />
                  <List.Description>
                    <Moment format="YYYY/MM/DD">{item.from}</Moment> -
                    {item.to === null ? (
                      ' Now'
                    ) : (
                      <Moment format=" YYYY/MM/DD">{item.to}</Moment>
                    )}
                  </List.Description>
                  <List.Content
                    content={item.location === '' ? null : item.location}
                  />
                  <List.Content
                    content={item.description === '' ? null : item.description}
                  />
                </List.Item>
              ))}
            </List>
          </Segment>
        </Grid.Column>

        <Grid.Column>
          <Header content="Education" color="blue" textAlign="center" />
          <Segment>
            <List relaxed divided>
              {education.map(item => (
                <List.Item key={item._id}>
                  <List.Header content={item.school} />
                  <List.Description>
                    <Moment format="YYYY/MM/DD">{item.from}</Moment> -
                    {item.to === null ? (
                      ' Now'
                    ) : (
                      <Moment format=" YYYY/MM/DD">{item.to}</Moment>
                    )}
                  </List.Description>
                  <List.Content content={item.degree} />
                  <List.Content content={item.fieldofstudy} />
                  <List.Content
                    content={item.description === '' ? null : item.description}
                  />
                </List.Item>
              ))}
            </List>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

export default ProfileCreds

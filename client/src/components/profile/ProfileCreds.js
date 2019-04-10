import React, { Component } from 'react'
import Moment from 'react-moment'
import { Grid, Item, Header, Segment } from 'semantic-ui-react'

class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props
    const experienceItems = experience.map(item => ({
      childKey: item._id,
      header: item.company,
      meta: item.location === '' ? null : item.location,
      extra: item.description === '' ? null : item.description
    }))
    const educationItems = education.map(item => ({
      childKey: item._id,
      header: item.school,
      meta: item.degree,
      description: item.fieldofstudy,
      extra: item.description === '' ? null : item.description
    }))
    return (
      <Grid columns={2}>
        {/* EXPERIENCE */}
        <Grid.Column>
          <Header content="Experience" color="blue" textAlign="center" />
          <Segment>
            <Item.Group relaxed divided items={experienceItems} />
          </Segment>
        </Grid.Column>

        {/* EDUCATION */}
        <Grid.Column>
          <Header content="Education" color="blue" textAlign="center" />
          <Segment>
            <Item.Group relaxed divided items={educationItems} />
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

export default ProfileCreds

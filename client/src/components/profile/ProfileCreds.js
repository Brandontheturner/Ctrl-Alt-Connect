import React, { Component } from 'react'
import { Grid, Item, Header, Segment } from 'semantic-ui-react'
import formatDate from '../../utils/formatDate'

class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props
    const experienceItems =
      experience.length > 0
        ? experience.map(item => {
            item.from = formatDate(item.from)
            item.to = item.to === null ? 'Now' : formatDate(item.to)
            return {
              childKey: item._id,
              header: item.company,
              meta: `${item.from} - ${item.to}`,
              description: item.title,
              extra: item.description === '' ? null : item.description
            }
          })
        : [
            {
              description: 'No experience listed'
            }
          ]
    const educationItems =
      education.length > 0
        ? education.map(item => {
            item.from = formatDate(item.from)
            item.to = item.to === null ? 'Now' : formatDate(item.to)
            return {
              childKey: item._id,
              header: item.school,
              meta: `${item.from} - ${item.to}`,
              description: item.fieldofstudy,
              extra: item.degree
            }
          })
        : [
            {
              description: 'No education listed'
            }
          ]
    return (
      <Grid columns={2}>
        {/* EXPERIENCE */}
        <Grid.Column>
          <Header content="Experience" inverted attached="top" />
          <Segment attached="bottom">
            <Item.Group relaxed divided items={experienceItems} />
          </Segment>
        </Grid.Column>

        {/* EDUCATION */}
        <Grid.Column>
          <Header content="Education" inverted attached="top" />
          <Segment attached="bottom">
            <Item.Group relaxed divided items={educationItems} />
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

export default ProfileCreds

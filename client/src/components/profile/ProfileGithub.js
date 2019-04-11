import React, { Component } from 'react'
import { Header, Grid, Label, Segment } from 'semantic-ui-react'

class ProfileGithub extends Component {
  state = {
    clientId: '494e090bb85e49db5090',
    clientSecret: 'f15641da523f52ff7e6c8ff21abaece872d2a972',
    count: 5,
    sort: 'created: asc',
    repos: []
  }

  componentDidMount() {
    const { username } = this.props
    const { count, sort, clientId, clientSecret } = this.state

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(repos => {
        if (this.refs.myRef) {
          this.setState({ repos })
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    const { repos } = this.state
    return (
      <Segment>
        <Header content="Latest Github Repositories" />
        <div ref="myRef">
          {repos.map(repo => (
            <Segment key={repo.id}>
              <Grid columns={2}>
                <Grid.Column>
                  <Header>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {repo.name}
                    </a>
                  </Header>
                </Grid.Column>
                <Grid.Column>
                  <Label
                    content="Watchers"
                    detail={repo.watchers_count}
                    icon="eye"
                    color="blue"
                  />
                  <Label
                    content="Stars"
                    detail={repo.stargazers_count}
                    icon="star"
                    color="grey"
                  />

                  <Label
                    content="Forks"
                    detail={repo.forks_count}
                    icon="fork"
                    color="green"
                  />
                </Grid.Column>
              </Grid>
            </Segment>
          ))}
        </div>
      </Segment>
    )
  }
}

export default ProfileGithub

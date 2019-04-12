import React, { Component } from 'react'
import { Header, Label, Segment, List } from 'semantic-ui-react'

class ProfileGithub extends Component {
  state = {
    clientId: 'e906c713c0f8cc8b22a0',
    clientSecret: '35ade58c71dc940de67c50a2dca7b7e7d981edf1',
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
      <>
        <Header content="Latest Github Repositories" inverted attached="top" />
        <Segment attached="bottom">
          <List relaxed divided ref="myRef">
            {repos.map(repo => (
              <List.Item key={repo.id}>
                <List.Content>
                  <List.Header>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {repo.name}
                    </a>
                  </List.Header>
                </List.Content>
                <List horizontal floated="right">
                  <Label.Group circular>
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
                  </Label.Group>
                </List>
              </List.Item>
            ))}
          </List>
        </Segment>
      </>
    )
  }
}

export default ProfileGithub

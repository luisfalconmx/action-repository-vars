import * as core from '@actions/core'
import { Octokit } from "@octokit/core"

type Vars = {
  name: string
  value: string | boolean | number | null | undefined
}[]

async function run() {
  try {
    const GITHUB_TOKEN = <string>process.env['GITHUB_TOKEN']
    const GITHUB_REPOSITORY = <string>process.env['GITHUB_REPOSITORY']
    const OWNER = GITHUB_REPOSITORY.split('/')[0]
    const REPO = GITHUB_REPOSITORY.split('/')[1]

    const octokit = new Octokit({
      auth: GITHUB_TOKEN
    })
    
    const { data } = await octokit.request('GET /repos/{owner}/{repo}', {
      owner: OWNER,
      repo: REPO
    })

    const vars: Vars = [
      {
        name: 'REPOSITORY_FULL_NAME',
        value: data.full_name
      },
      {
        name: 'REPOSITORY_SLUG',
        value: data.name
      },
      {
        name: 'REPOSITORY_NAME',
        value: data.name.replace('-', ' ')
      },
      {
        name: 'REPOSITORY_DESCRIPTION',
        value: data.description
      },
      {
        name: 'REPOSITORY_CREATED_AT',
        value: data.created_at
      },
      {
        name: 'REPOSITORY_UPDATED_AT',
        value: data.updated_at
      },
      {
        name: 'REPOSITORY_PUSHED_AT',
        value: data.pushed_at
      },
      {
        name: 'REPOSITORY_DEFAULT_BRANCH',
        value: data.default_branch
      },
      {
        name: 'REPOSITORY_CODE_OF_CONDUCT_URL',
        value: data.code_of_conduct?.url
      },
      {
        name: 'REPOSITORY_CONTRIBUTING_URL',
        value: data.contributors_url
      },
      {
        name: 'REPOSITORY_LICENSE',
        value: data.license?.name
      },
      {
        name: 'REPOSITORY_LICENSE_URL',
        value: data.license?.url
      },
      {
        name: 'REPOSITORY_README_URL',
        value: `${data.url}/README.md`
      },
      {
        name: 'REPOSITORY_WATCHERS_COUNT',
        value: data.watchers_count
      },
      {
        name: 'REPOSITORY_STARGAZERS_COUNT',
        value: data.stargazers_count
      },
      {
        name: 'REPOSITORY_FORKS_COUNT',
        value: data.forks_count
      },
      {
        name: 'REPOSITORY_OWNER',
        value: data.owner.name
      },
      {
        name: 'OWNER_PROFILE',
        value: data.owner.url
      },
      {
        name: 'OWNER_AVATAR_URL',
        value: data.owner.avatar_url
      },
      {
        name: 'OWNER_TYPE',
        value: data.owner.type
      },
      {
        name: 'OWNER_EMAIL',
        value: data.owner.email
      },
      {
        name: 'REPOSITORY_GITHUB_URL',
        value: data.url
      },
      {
        name: 'REPOSITORY_HOMEPAGE_URL',
        value: data.homepage
      },
      {
        name: 'REPOSITORY_GIT_URL',
        value: data.git_url
      },
      {
        name: 'REPOSITORY_SSH_URL',
        value: data.ssh_url
      },
    ]

    vars.map(variable => {
      core.exportVariable(variable.name, variable.value)
    })
    
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run()

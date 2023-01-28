import * as core from '@actions/core'
import { Octokit } from "@octokit/core"

type Vars = {
  name: string
  value: string | boolean | number
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
      }
    ]

    vars.map(variable => {
      core.exportVariable(variable.name, variable.value)
    })
    
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run()

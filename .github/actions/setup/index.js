const core = require('@actions/core')
const github = require('@actions/github')

try {
  const payload = github.context.payload

  core.exportVariable('BRANCH_NAME', process.env.GITHUB_REF.split('/').slice(2).join('/'))
  core.exportVariable('DEFAULT_BRANCH', payload.repository.default_branch)

  console.log(JSON.stringify(github, undefined, 2))
  console.log(JSON.stringify(process.env, undefined, 2))
} catch (error) {
  core.setFailed(error.message)
}

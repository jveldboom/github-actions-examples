const core = require('@actions/core')
const github = require('@actions/github')
const utilities = require('./domain/utilities')
const exportEnvVars = require('./domain/exportEnvVars').exportEnvVars

async function run () {
  try {
    core.exportVariable('BRANCH_NAME', utilities.getBranchName(github))
    core.exportVariable('DEFAULT_BRANCH', utilities.getDefaultBranch(github))
    core.exportVariable('REPO_OWNER', utilities.getRepoOwner(github))
    core.exportVariable('REPO_NAME', utilities.getRepoName(github))
    exportEnvVars(github)
  } catch (error) {
    core.setFailed(error.stack)
    core.setFailed(error.message)
  }
}

run()

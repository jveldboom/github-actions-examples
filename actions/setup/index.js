const core = require('@actions/core')
const github = require('@actions/github')

const getBranchName = (github) => {
  if (github.context.payload.pull_request) return github.context.payload.pull_request.head.ref
  return github.ref.substr(11)
}

const getDefaultBranch = (github) => {
  return github.context.payload.repository.default_branch
}

const isProduction = (currentBranch) => {
  if (core.getInput('production-branch') === currentBranch) return true
  return false
}

const exportEnvironmentVars = () => {
  const envVarSuffix = isProduction() ? '_PROD' : '_DEV'
  for (const env of Object.keys(process.env)) {
    if (env.endsWith(envVarSuffix)) {
      const newVarName = env.replace(envVarSuffix, '')
      core.exportVariable(newVarName, process.env[env])
    }
  }
}

try {
  core.exportVariable('BRANCH_NAME', getBranchName(github))
  core.exportVariable('DEFAULT_BRANCH', getDefaultBranch(github))
  exportEnvironmentVars()
} catch (error) {
  core.setFailed(error.message)
}

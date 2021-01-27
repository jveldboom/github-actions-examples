const core = require('@actions/core')
const utilities = require('./utilities')

const suffixes = {
  dev: '_DEV',
  prod: '_PROD'
}

const getEnvVarSuffix = (github) => {
  if (core.getInput('production-branch') === utilities.getBranchName(github)) return suffixes.prod
  return suffixes.dev
}

const getEnvVarsToExport = (github) => {
  const envVarSuffix = getEnvVarSuffix(github)

  const envVarsToExport = {}
  for (const envKey of Object.keys(process.env)) {
    if (envKey.endsWith(envVarSuffix)) {
      const newVarName = envKey.replace(envVarSuffix, '')
      envVarsToExport[newVarName] = process.env[envKey]
    }
  }

  return envVarsToExport
}

const exportEnvVars = (github) => {
  // do nothing if input parameter not passed in
  if (core.getInput('production-branch') === '') return false

  const envVarsToExport = getEnvVarsToExport(github)
  for (const envVar of Object.keys(envVarsToExport)) {
    core.exportVariable(envVar, envVarsToExport[envVar])
  }

  return true
}

module.exports = {
  getEnvVarSuffix,
  getEnvVarsToExport,
  exportEnvVars,
  suffixes
}

const assert = require('assert')
const { describe, it } = require('mocha')

const e = require('../domain/exportEnvVars')
const pullRequestEvent = require('./data/github-pr-event.json')
const pushEvent = require('./data/github-push-event.json')

describe('exportEnvVars', () => {
  it('should export an object', async () => {
    assert.deepStrictEqual(typeof e, 'object')
  })

  it('getEnvVarSuffix - should return dev suffix when no input', async () => {
    assert.deepStrictEqual(e.getEnvVarSuffix(pushEvent), e.suffixes.dev)
  })

  it('getEnvVarSuffix - should return dev suffix when non-prod branch', async () => {
    process.env['INPUT_PRODUCTION-BRANCH'] = 'main'
    assert.deepStrictEqual(e.getEnvVarSuffix(pullRequestEvent), e.suffixes.dev)
    process.env['INPUT_PRODUCTION-BRANCH'] = ''
  })

  it('getEnvVarSuffix - should return prod suffix', async () => {
    process.env['INPUT_PRODUCTION-BRANCH'] = 'main'
    assert.deepStrictEqual(e.getEnvVarSuffix(pushEvent), e.suffixes.prod)
    delete process.env['INPUT_PRODUCTION-BRANCH']
  })

  it('getEnvVarsToExport - should return keys w/o suffixes w/o no input', async () => {
    process.env.ENV_NAME_DEV = 'develop'
    process.env.SLACK_CHANNEL_DEV = '#dev-deployments'

    const envVarsToExport = e.getEnvVarsToExport(pushEvent)
    assert.deepStrictEqual(envVarsToExport.ENV_NAME, 'develop')
    assert.deepStrictEqual(envVarsToExport.SLACK_CHANNEL, '#dev-deployments')

    delete process.env.ENV_NAME_DEV
    delete process.env.SLACK_CHANNEL_DEV
  })

  it('getEnvVarsToExport - should return keys w/o suffixes w/ input', async () => {
    process.env['INPUT_PRODUCTION-BRANCH'] = 'main'
    process.env.ENV_NAME_PROD = 'production'
    process.env.SLACK_CHANNEL_PROD = '#prod-deployments'

    const envVarsToExport = e.getEnvVarsToExport(pushEvent)
    assert.deepStrictEqual(envVarsToExport.ENV_NAME, 'production')
    assert.deepStrictEqual(envVarsToExport.SLACK_CHANNEL, '#prod-deployments')

    delete process.env.ENV_NAME_PROD
    delete process.env.SLACK_CHANNEL_PROD
    delete process.env['INPUT_PRODUCTION-BRANCH']
  })

  it('exportEnvVars - should return false w/o input', async () => {
    process.env['INPUT_PRODUCTION-BRANCH'] = ''
    assert.deepStrictEqual(e.exportEnvVars(pushEvent), false)
    process.env['INPUT_PRODUCTION-BRANCH'] = ''
  })

  it('exportEnvVars - should return true when exporting env vars', async () => {
    process.env['INPUT_PRODUCTION-BRANCH'] = 'main'
    process.env.ENV_NAME_PROD = 'production'
    process.env.SLACK_CHANNEL_PROD = '#prod-deployments'

    assert.deepStrictEqual(e.exportEnvVars(pushEvent), true)

    delete process.env.ENV_NAME_PROD
    delete process.env.SLACK_CHANNEL_PROD
    delete process.env['INPUT_PRODUCTION-BRANCH']
  })
})

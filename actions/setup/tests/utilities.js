const assert = require('assert')
const { describe, it } = require('mocha')

const utilities = require('../domain/utilities')
const pullRequestEvent = require('./data/github-pr-event.json')
const pushEvent = require('./data/github-push-event.json')

describe('utilities', () => {
  it('should export an object', async () => {
    assert.deepStrictEqual(typeof utilities, 'object')
  })

  // getBranchName
  it('getBranchName - should return branch name for push event', async () => {
    assert.deepStrictEqual(utilities.getBranchName(pushEvent), 'main')
  })

  it('getBranchName - should return branch name for pr event', async () => {
    assert.deepStrictEqual(utilities.getBranchName(pullRequestEvent), 'feature-branch')
  })

  // getDefaultBranch
  it('getDefaultBranch - should return default branch name', async () => {
    assert.deepStrictEqual(utilities.getDefaultBranch(pushEvent), 'main')
    assert.deepStrictEqual(utilities.getDefaultBranch(pullRequestEvent), 'main')
  })

  // getRepoOwner
  it('getRepoOwner - should return repo owner', async () => {
    assert.deepStrictEqual(utilities.getRepoOwner(pushEvent), 'jveldboom')
    assert.deepStrictEqual(utilities.getRepoOwner(pullRequestEvent), 'jveldboom')
  })

  // getRepoName
  it('getRepoName - should return repo name', async () => {
    assert.deepStrictEqual(utilities.getRepoName(pushEvent), 'github-actions-examples')
    assert.deepStrictEqual(utilities.getRepoName(pullRequestEvent), 'github-actions-examples')
  })
})

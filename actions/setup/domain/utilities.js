const getBranchName = (github) => {
  if (github.context.payload.pull_request) return github.context.payload.pull_request.head.ref
  return github.context.ref.substr(11)
}

const getDefaultBranch = (github) => {
  return github.context.payload.repository.default_branch
}

const getRepoOwner = (github) => {
  return github.context.payload.repository.full_name.split('/')[0]
}

const getRepoName = (github) => {
  return github.context.payload.repository.full_name.split('/')[1]
}

module.exports = {
  getBranchName,
  getDefaultBranch,
  getRepoOwner,
  getRepoName
}

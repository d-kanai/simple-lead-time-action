const request = require("request-promise");
const { graphql } = require('@octokit/graphql');

const query = `query LastPullRequestToMain {
search(
  last: 1
  query: "repo:${process.env.REPOSITORY_NAME} is:pr base:${process.env.PR_BRANCH_TO} head:${process.env.PR_BRANCH_FROM}"
  type: ISSUE
) {
    issueCount
    nodes {
    ... on PullRequest {
        title
        closedAt
        url
        commits(first: 1) {
          edges {
            node {
              commit {
                message
                url
                committedDate
              }
            }
          }
        }
      }
    }
  }
}
`;

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.PERSONAL_ACCESS_TOKEN_FOR_GITHUB_API}`,
  },
});

async function getLeadTime() {
  if(!process.env.PERSONAL_ACCESS_TOKEN_FOR_GITHUB_API) {
    throw Error("it need to set env var 'PERSONAL_ACCESS_TOKEN_FOR_GITHUB_API'")
  }
  if(!process.env.PR_BRANCH_TO) {
    throw Error("it need to set env var 'PR_BRANCH_TO'")
  }
  if(!process.env.PR_BRANCH_FROM) {
    throw Error("it need to set env var 'PR_BRANCH_FROM'")
  }
  if(!process.env.REPOSITORY_NAME) {
    throw Error("it need to set env var 'REPOSITORY_NAME'")
  }
  let res
  try {
    res = await graphqlWithAuth(query);
  } catch(e) {
    throw Error("Bad Credential 'PERSONAL_ACCESS_TOKEN_FOR_GITHUB_API'")
  }
  const closedDate = new Date(res.search.nodes[0].closedAt);
  const firstCommitDate = new Date(res.search.nodes[0].commits.edges[0].node.commit.committedDate);
  const leadTimeHours = (closedDate - firstCommitDate) / 1000 / 60 / 60;
  const result = leadTimeHours.toString().substring(0, 3) + 'h'
  return result
}

module.exports = getLeadTime;

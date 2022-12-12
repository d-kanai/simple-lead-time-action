const request = require("request-promise");
const { graphql } = require('@octokit/graphql');

const query = `query LastPullRequestToMain {
search(
  last: 1
  query: "repo:aisaac-lab/eltea is:pr base:main head:stg"
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
  //const isDebug = process.argv[2] === 'debug' || false;
  const { search } = await graphqlWithAuth(query);
  //if (isDebug) {
  //  console.dir(search, { depth: null });
  //}
  const closedDate = new Date(search.nodes[0].closedAt);
  const firstCommitDate = new Date(search.nodes[0].commits.edges[0].node.commit.committedDate);
  const leadTimeHours = (closedDate - firstCommitDate) / 1000 / 60 / 60;
  const result = leadTimeHours.toString().substring(0, 3) + 'h'
  return result
}

module.exports = getLeadTime;

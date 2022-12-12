const getLeadTime = require("./lead-time");
const core = require("@actions/core");

async function run() {
  const result = await getLeadTime();
  console.log(result);
  core.setOutput("lead-time", result);
}

run();

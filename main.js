const getLeadTime = require("./lead-time");
const core = require("@actions/core");

async function run() {
  let result
  try {
    result = await getLeadTime();
  } catch(e) {
    core.setFailed(e.message);
  }
  console.log(result);
  core.setOutput("lead-time", result);
}

run();

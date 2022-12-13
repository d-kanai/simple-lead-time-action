const getLeadTime = require("./lead-time");
const { exec } = require('child_process')
const core = require("@actions/core");

function updateHistoryFile(leadTime, prLink) {
  exec(`sh updateHistoryFile.sh ${leadTime} ${prLink}`, (err, stdout, stderr) => {
      if (err) {
        console.log(`stderr: ${stderr}`)
        return
      }
      console.log(`stdout: ${stdout}`)
    }
  )
}

async function run() {
  let result
  try {
    result = await getLeadTime();
  } catch(e) {
    core.setFailed(e.message);
  }
  console.log(`🕑 lead time: ${result.leadTime}`);
  core.setOutput("lead-time", result.leadTime);
  updateHistoryFile(result.leadTime, result.prLink)
}

run();

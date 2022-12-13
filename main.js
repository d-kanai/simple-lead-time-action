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
  if(process.env.ENABLE_SAVE_HISTORY_FILE == 'true') {
    if(!process.env.GITHUB_USER) {
      throw Error("it need to set env var 'GITHUB_USER'")
    }
    if(!process.env.RELEASE_BRANCH_NAME) {
      throw Error("it need to set env var 'RELEASE_BRANCH_NAME'")
    }
    if(!process.env.SAVE_HISTORY_FILE_BRANCH) {
      throw Error("it need to set env var 'SAVE_HISTORY_FILE_BRANCH'")
    }
    updateHistoryFile(result.leadTime, result.prLink)
  }
}

run();

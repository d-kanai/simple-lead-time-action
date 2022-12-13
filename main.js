const getLeadTime = require("./lead-time");
const { exec } = require('child_process')
const core = require("@actions/core");
const path = require("path");

function updateHistoryFile(leadTime, prLink) {
  const filePath = [path.join(__dirname, './updateHistoryFile.sh')][0]
  exec(`sh ${filePath} ${leadTime} ${prLink}`, (err, stdout, stderr) => {
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
    updateHistoryFile(result.leadTime, result.prLink)
    core.setOutput("history-link", `https://github.com/${process.env.REPOSITORY_NAME}/tree/simple-lead-time-action/simple-lead-time-action`);
  }
}

run();

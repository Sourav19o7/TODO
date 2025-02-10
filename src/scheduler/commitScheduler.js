const dotenv = require("dotenv");
const simpleGit = require("simple-git");
const fs = require("fs");
const path = require("path");

dotenv.config();

// Configuration
const REPO_PATH = "./"; // Root of the repo
const FILE_PATH = path.join(REPO_PATH, "src/scheduler/daily_update.txt");
const COMMIT_MESSAGE = "Daily commit: ";
const BRANCH_NAME = "main"; // Change if needed

// Function to make a commit
async function makeCommit() {
  try {
    const git = simpleGit(REPO_PATH);

    if (!fs.existsSync(FILE_PATH)) {
      throw new Error(`File does not exist: ${FILE_PATH}`);
    }

    // Step 1: Append timestamp to the file
    const timestamp = new Date().toISOString();
    fs.appendFileSync(FILE_PATH, `Update on ${timestamp}\n`);

    // Step 2: Stage changes
    await git.add(FILE_PATH);

    // Step 3: Commit changes
    const commitMsg = `${COMMIT_MESSAGE}${timestamp}`;
    await git.commit(commitMsg);

    // Step 4: Push changes
    await git.pull("origin", BRANCH_NAME); // Ensure the latest version
    await git.push("origin", BRANCH_NAME);

    console.log(`Commit pushed successfully: ${commitMsg}`);
  } catch (error) {
    console.error("Error making commit:", error);
  }
}

module.exports = makeCommit;

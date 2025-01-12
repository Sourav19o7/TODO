const dotenv = require('dotenv');
const simpleGit = require("simple-git");
const fs = require("fs");
const path = require("path");
dotenv.config();

// Configuration
const REPO_PATH = "."; // Replace with your repo path
const COMMIT_MESSAGE = "Daily commit: "; // Default commit message
const GITHUB_USERNAME = "Sourav19o7"; // Replace with your GitHub username
const GITHUB_TOKEN = process.env.PERSONAL_ACCESS_TOKEN; // Replace with your GitHub token
const BRANCH_NAME = "main"; // Replace with your branch name if not 'main'

// Function to make a commit
async function makeCommit() {
  try {

    if (!fs.existsSync(REPO_PATH)) {
        throw new Error(`Repository path does not exist: ${REPO_PATH}`);
      }

    const git = simpleGit(REPO_PATH);

    // Step 1: Create or update a dummy file
    const filePath = path.join(REPO_PATH, "/src/scheduler/daily_update.txt");
    const timestamp = new Date().toISOString();
    fs.appendFileSync(filePath, `Update on ${timestamp}\n`);

    // Step 2: Stage changes
    await git.add(".");

    // Step 3: Commit changes
    const commitMsg = `${COMMIT_MESSAGE}${timestamp.split("T")[0]}`;
    await git.commit(commitMsg);

    // Step 4: Push changes
    const remoteUrl = `https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/${path.basename(
      REPO_PATH
    )}.git`;
    await git.push(remoteUrl, BRANCH_NAME);

    console.log(`Commit pushed successfully: ${commitMsg}`);
  } catch (error) {
    console.error("Error making commit:", error);
  }
};

module.exports = makeCommit;
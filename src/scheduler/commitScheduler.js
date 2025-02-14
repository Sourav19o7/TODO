const dotenv = require("dotenv");
const simpleGit = require("simple-git");
const fs = require("fs");
const path = require("path");

dotenv.config();

// Configuration
const REPO_PATH = "./";
const FILE_PATH = path.join(REPO_PATH, "src/scheduler/daily_update.txt");
const COMMIT_MESSAGE = "Daily commit: ";
const BRANCH_NAME = "main";

async function makeCommit() {
  try {
    const git = simpleGit(REPO_PATH);

    // Ensure repo URL is set correctly
    const repoURL = `https://Sourav19o7:${process.env.PERSONAL_ACCESS_TOKEN}@github.com/Sourav19o7/TODO.git`;
    await git.remote(['set-url', 'origin', repoURL]);

    // Ensure credentials are stored
    await git.addConfig('credential.helper', 'store');
    await git.addConfig('http.https://github.com/.extraheader', `AUTHORIZATION: basic ${Buffer.from(`Sourav19o7:${process.env.GIT_PAT}`).toString('base64')}`);

    console.log("🔄 Pulling latest changes...");
    await git.pull("origin", BRANCH_NAME);

    // Append timestamp to the file
    const timestamp = new Date().toISOString();
    fs.appendFileSync(FILE_PATH, `Update on ${timestamp}\n`);

    // Stage and commit changes
    await git.add(FILE_PATH);
    await git.addConfig('user.name', 'Sourav Dey');
    await git.addConfig('user.email', 'sourav.dey0147@gmail.com');
    const commitMsg = `${COMMIT_MESSAGE}${timestamp}`;
    await git.commit(commitMsg);

    // Push changes
    await git.push("origin", BRANCH_NAME);
    console.log(`✅ Commit pushed successfully: ${commitMsg}`);
  } catch (error) {
    console.error("❌ Error making commit:", error);
  }
}

module.exports = makeCommit;

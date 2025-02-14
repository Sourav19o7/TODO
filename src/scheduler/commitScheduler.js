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

async function makeCommit() {
  try {
    const git = simpleGit(REPO_PATH);

    if (!fs.existsSync(FILE_PATH)) {
      console.error(`❌ File does not exist: ${FILE_PATH}`);
      return;
    }

    // Step 1: Ensure the latest version is pulled to prevent conflicts
    console.log("🔄 Pulling latest changes...");
    await git.fetch();
    await git.pull("origin", BRANCH_NAME);

    // Step 2: Append timestamp to the file
    const timestamp = new Date().toISOString();
    fs.appendFileSync(FILE_PATH, `Update on ${timestamp}\n`);
    console.log(`✅ File updated: ${FILE_PATH}`);

    // Step 3: Stage changes
    await git.add(FILE_PATH);
    console.log("📌 Changes staged.");

    // Step 4: Set user details
    await git.addConfig("user.name", "Sourav19o7");
    await git.addConfig("user.email", "sourav.dey0147@gmail.com");

    // Step 5: Commit changes
    const commitMsg = `${COMMIT_MESSAGE}${timestamp}`;
    await git.commit(commitMsg);
    console.log(`✅ Commit created: ${commitMsg}`);

    // Step 6: Set HTTPS remote with authentication
    const GIT_USER = 'Sourav19o7';
    const GIT_PAT = process.env.PERSONAL_ACCESS_TOKEN;
    const GITHUB_REPO = 'Sourav19o7/TODO'; // Format: username/repo-name

    if (!GIT_USER || !GIT_PAT || !GITHUB_REPO) {
      throw new Error("Missing required environment variables: GIT_USER, GIT_PAT, or GITHUB_REPO");
    }

    const remoteUrl = `https://${GIT_USER}:${GIT_PAT}@github.com/${GITHUB_REPO}.git`;
    await git.remote(["set-url", "origin", remoteUrl]);

    // Step 7: Push changes
    await git.push("origin", BRANCH_NAME);
    console.log("🚀 Commit pushed successfully.");
  } catch (error) {
    console.error("❌ Error making commit:", error);

    // If there is a merge conflict, attempt to resolve
    if (error.message.includes("CONFLICT")) {
      console.log("⚠️ Merge conflict detected. Trying to resolve...");
      await resolveMergeConflict();
    }
  }
}

// Handle merge conflicts by stashing, pulling, and reapplying changes
async function resolveMergeConflict() {
  try {
    const git = simpleGit(REPO_PATH);

    console.log("🔄 Stashing local changes...");
    await git.stash();

    console.log("🔄 Pulling latest changes...");
    await git.pull("origin", BRANCH_NAME);

    console.log("🔄 Applying stashed changes...");
    await git.stash(["pop"]);

    console.log("✅ Retry committing...");
    await makeCommit();
  } catch (err) {
    console.error("❌ Merge conflict resolution failed:", err);
  }
}

module.exports = makeCommit;

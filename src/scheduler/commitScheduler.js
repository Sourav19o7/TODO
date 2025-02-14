const dotenv = require("dotenv");
const simpleGit = require("simple-git");
const fs = require("fs");
const path = require("path");

dotenv.config();

// Configuration
const REPO_PATH = "./"; // Root of the repo
const FILE_PATH = path.join(REPO_PATH, "src/scheduler/daily_update.txt");
const BRANCH_NAME = "main"; // Change if needed

// Git configuration
const GIT_USER_NAME = process.env.GIT_USER_NAME || "Sourav19o7";
const GIT_USER_EMAIL = process.env.GIT_USER_EMAIL || "sourav.dey0147@gmail.com";
const GITHUB_TOKEN = process.env.PERSONAL_ACCESS_TOKEN;
const REPO_URL = "https://github.com/Sourav19o7/TODO.git";

// Get authenticated URL
function getAuthenticatedUrl() {
    if (!GITHUB_TOKEN) {
        throw new Error('PERSONAL_ACCESS_TOKEN environment variable must be set');
    }
    return REPO_URL.replace('https://', `https://${GITHUB_TOKEN}@`);
}

// Initialize git
function initGit() {
    return simpleGit({
        baseDir: REPO_PATH,
        binary: 'git',
        maxConcurrentProcesses: 1,
    });
}

// Function to setup Git configuration
async function setupGitConfig(git) {
    try {
        // Set user configuration
        await git.addConfig('user.name', GIT_USER_NAME, false, 'local');
        await git.addConfig('user.email', GIT_USER_EMAIL, false, 'local');

        // Get authenticated URL
        const authenticatedUrl = getAuthenticatedUrl();

        // Set the remote URL with authentication
        const remotes = await git.getRemotes();
        if (remotes.find(remote => remote.name === 'origin')) {
            await git.remote(['set-url', 'origin', authenticatedUrl]);
        } else {
            await git.addRemote('origin', authenticatedUrl);
        }

        return true;
    } catch (error) {
        console.error('Error in Git configuration:', error.message);
        throw error;
    }
}

// Function to make a commit
async function makeCommit() {
    try {
      const git = initGit();
      console.log("Git initialized.");
  
      await setupGitConfig(git);
      console.log("Git config set.");
  
      console.log("Pulling changes...");
      await git.pull('origin', BRANCH_NAME, ['--rebase']);
      console.log("Pull complete.");
  
      // Update file
      const timestamp = new Date().toISOString();
      fs.appendFileSync(FILE_PATH, `Update on ${timestamp}\n`);
      console.log("File updated.");
  
      // Stage and commit
      await git.add(FILE_PATH);
      console.log("Changes staged.");
      await git.commit(`Daily commit: ${timestamp}`);
      console.log("Changes committed.");
  
      // Push
      await git.push('origin', BRANCH_NAME);
      console.log("Pushed to remote.");
    } catch (error) {
      console.error("FULL ERROR:", error);
      throw error;
    }
  }

module.exports = makeCommit;
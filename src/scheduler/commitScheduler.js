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

// Git configuration
const GIT_USER_NAME = process.env.GIT_USER_NAME || "Sourav19o7";
const GIT_USER_EMAIL = process.env.GIT_USER_EMAIL || "sourav.dey0147@gmail.com";
const GITHUB_TOKEN = process.env.PERSONAL_ACCESS_TOKEN; // Personal access token
const REPO_URL = "https://github.com/Sourav19o7/TODO.git"

// Initialize git with authentication
function initGit() {
  const options = {
    baseDir: REPO_PATH,
    binary: 'git',
    maxConcurrentProcesses: 1,
  };

  // If we have a GitHub token, add authentication
  if (GITHUB_TOKEN) {
    const remoteUrl = REPO_URL.replace(
      'https://',
      `https://${GITHUB_TOKEN}@`
    );
    options.config = [
      `url."${remoteUrl}".insteadOf="${REPO_URL}"`,
    ];
  }

  return simpleGit(options);
}

// Function to verify Git configuration
async function verifyGitConfig(git) {
  try {
    // Set local repository configuration
    await git.addConfig('user.name', GIT_USER_NAME, false, 'local');
    await git.addConfig('user.email', GIT_USER_EMAIL, false, 'local');
    
    // Verify remote exists
    const remotes = await git.getRemotes();
    if (!remotes.find(remote => remote.name === 'origin')) {
      if (!REPO_URL) {
        throw new Error('REPO_URL environment variable not set');
      }
      await git.addRemote('origin', REPO_URL);
    }
    
    return true;
  } catch (error) {
    console.error('Error verifying Git configuration:', error.message);
    throw error;
  }
}

// Function to make a commit
async function makeCommit() {
  let git;
  
  try {
    // Initialize git with proper configuration
    git = initGit();
    
    // Verify Git configuration before proceeding
    await verifyGitConfig(git);

    // Check if file exists
    if (!fs.existsSync(FILE_PATH)) {
      // Create directory if it doesn't exist
      const dir = path.dirname(FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      // Create file if it doesn't exist
      fs.writeFileSync(FILE_PATH, '# Daily Updates Log\n\n');
    }

    // Step 1: Append timestamp to the file
    const timestamp = new Date().toISOString();
    fs.appendFileSync(FILE_PATH, `Update on ${timestamp}\n`);

    // Step 2: Stage changes
    await git.add(FILE_PATH);

    // Step 3: Commit changes
    const commitMsg = `${COMMIT_MESSAGE}${timestamp}`;
    await git.commit(commitMsg);

    // Step 4: Pull and push changes
    try {
      await git.pull('origin', BRANCH_NAME);
    } catch (pullError) {
      console.warn('Pull failed, attempting to push anyway:', pullError.message);
    }

    await git.push('origin', BRANCH_NAME);
    console.log(`Commit pushed successfully: ${commitMsg}`);
    
  } catch (error) {
    console.error("Error making commit:", error.message);
    console.debug("Full error details:", error);
    throw error;
  }
}

module.exports = makeCommit;
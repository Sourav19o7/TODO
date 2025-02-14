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
    let git;
    
    try {
        // Initialize git
        git = initGit();
        
        // Setup Git configuration
        await setupGitConfig(git);

        // Create directory if it doesn't exist
        const dir = path.dirname(FILE_PATH);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Create file if it doesn't exist
        if (!fs.existsSync(FILE_PATH)) {
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

        // Step 4: Pull and Push changes directly with authenticated URL
        await git.pull('origin', BRANCH_NAME)
        await git.push('origin', BRANCH_NAME);
        
        console.log(`Commit pushed successfully: ${commitMsg}`);
    } catch (error) {
        console.error("Error making commit:", error.message);
        console.debug("Full error details:", error);
        throw error;
    }
}

module.exports = makeCommit;
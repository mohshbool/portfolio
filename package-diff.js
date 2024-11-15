const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

// ANSI escape codes for colors
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

const blacklist = ['@types/react', 'react-test-renderer', 'eslint'];

// Function to read the package.json file
async function readPackageJson() {
  const data = fs.readFileSync('package.json');
  return JSON.parse(data);
}

// Function to fetch the latest package version from npm
async function fetchLatestVersion(packageName) {
  try {
    const {stdout} = await exec(`npm view ${packageName} version`);
    return stdout.trim();
  } catch (error) {
    console.error(
      `${colors.red}Failed to fetch version for ${packageName}: ${error}${colors.reset}`,
    );
    return null;
  }
}

// Function to extract the major version from a version string
function getMajorVersion(version) {
  return version.replace(/^[~^]/, '');
}

// Function to check if package is blacklisted from version checking
function isBlacklisted(_package) {
  return blacklist.includes(_package);
}

// Main function to check for updates
async function checkForUpdates() {
  const packageJson = await readPackageJson();
  const packages = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };
  let currentIndex = 0;
  const packagesToUpgrade = [];

  console.log(`${colors.cyan}Checking packages for updates...${colors.reset}`);

  for (const [packageName, currentVersionSpec] of Object.entries(packages)) {
    currentIndex++;
    console.log(
      `${colors.yellow}Checking [${currentIndex}/${
        Object.keys(packages).length
      }]: ${packageName}${colors.reset}`,
    );
    const latestVersion = await fetchLatestVersion(packageName);
    if (
      latestVersion &&
      getMajorVersion(latestVersion) !== getMajorVersion(currentVersionSpec)
    ) {
      if (!isBlacklisted(packageName)) {
        console.log(
          `${colors.green}[${packageName}]: Current version spec ${currentVersionSpec}, Latest version ${latestVersion}${colors.reset}`,
        );
        packagesToUpgrade.push(
          `${colors.green}${packageName}@${latestVersion}${colors.reset}`,
        );
      }
    }
  }

  console.log(
    '------------------------------------------------------------------------------',
  );

  if (packagesToUpgrade.length === 0) {
    console.log(
      `${colors.green}No packages need to be upgraded${colors.reset}`,
    );
  } else {
    for (const index in packagesToUpgrade) {
      console.log(`yarn add ${packagesToUpgrade[index]}`);
    }
  }

  console.log(
    '------------------------------------------------------------------------------',
  );

  console.log(`${colors.cyan}Check complete!${colors.reset}`);
}

// Run the check
checkForUpdates();

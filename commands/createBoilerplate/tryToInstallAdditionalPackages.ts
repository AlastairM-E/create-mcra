export {};

function tryToInstallAdditionalPackages(
  packageManager: string,
  additionalPackages: null | string[],
): string | boolean {
  const devInstallation = packageManager === 'yarn' ? 'add' : 'install';

  console.log('Any additional packages from mcra imp are being installed');

  if (additionalPackages !== null) {
    return `${packageManager} ${devInstallation} ${additionalPackages.join(' ')}`;
  }
  return false;
}

module.exports = {
  tryToInstallAdditionalPackages,
};

export {};

function newCli(packageManager: string, boilerplateCli: string): string {
  let cli = boilerplateCli;
  switch (packageManager) {
    case 'yarn':
      cli = `${packageManager} ${boilerplateCli.split('').map((item: string, index:number) => (index === 6 ? ' ' : item)).join('')}`;
      break;

    case 'npm':
      cli = `npx ${cli}`;
      break;

    default:
      throw new Error(
        `The package manager should be npm or yarn. 
          - package manager argument: ${packageManager};
          - boilerplateCli argument : ${boilerplateCli};
        `,
      );
  }
  return cli;
}

module.exports = { newCli };

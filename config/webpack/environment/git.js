const { exec } = require("child_process");

const command = cmd =>
  new Promise((resolve, reject) => {
    exec(cmd, { cwd: __dirname }, (error, stdout) =>
      error ? reject(error) : resolve(stdout.split("\n").join(""))
    );
  });

module.exports = async () => {
  const [branch, revision] = await Promise.all([
    command("git rev-parse --abbrev-ref HEAD"),
    command("git rev-parse HEAD")
  ]);

  return { branch, revision };
};

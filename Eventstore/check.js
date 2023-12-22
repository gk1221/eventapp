const { exec, spawn } = require("child_process");
const fs = require("fs");
const moment = require("moment");

let output = [];
const host = ["node1", "node2", "node3"];
let out = "";

const checkhost = async (container_name) => {
  await exec(
    `docker container inspect -f '{{.State.Status}}' ${container_name}.eventstore`,

    async (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        return error;
      }

      await output.push({ host: container_name, status: stdout });
    }
  );
};

const returnhost = async () => {
  host.forEach(async (element) => {
    await checkhost(element);
  });
  console.log(output);
  return output;
};

const hostcheck = async (host, data = null) => {
  const cmd = exec(
    `docker container inspect -f '{{.State.Status}}' ${host}.eventstore`
  );

  cmd.stdout.on("data", async (output) => {
    console.log("host=", host, output);
    fs.appendFileSync(
      `./Eventstore/${host}.txt`,
      `${moment()},${host}, ${output} `
    );
  });

  return { host: host, status: out };
};

module.exports = { returnhost, hostcheck };

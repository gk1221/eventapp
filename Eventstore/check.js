const { exec } = require("child_process");

let output = [];
const host = ["node1", "node2", "node3"];

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

module.exports = returnhost;

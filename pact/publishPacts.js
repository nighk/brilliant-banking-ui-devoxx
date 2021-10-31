const pact = require("@pact-foundation/pact-node");
const path = require("path");
require("dotenv").config();

const pactBrokerUrl =  process.env.PACT_BROKER_URL;
const gitHash = require("child_process").execSync("git rev-parse --short HEAD").toString().trim();

const opts = {
  pactFilesOrDirs: [path.resolve(__dirname, "./pacts/")],
  pactBroker: pactBrokerUrl,
  pactBrokerToken: process.env.PACT_BROKER_TOKEN,
  tags: ["prod", "test"],
  consumerVersion: gitHash
};

pact
  .publishPacts(opts)
  .then(() => {
    console.log("Pact contract publishing complete!");
    console.log(`Head over to ${pactBrokerUrl} and log in to see your published contracts.`);
  })
  .catch((e) => {
    console.log("Pact contract publishing failed: ", e);
  });
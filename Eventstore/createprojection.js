const {
  EventStoreDBClient,
  jsonEvent,
  FORWARDS,
  START,
  BACKWARDS,
  END,
} = require("@eventstore/db-client");
const { randomUUID } = require("crypto");
const { readFileSync } = require("fs");
const path = require("path");

const rootCertificatePath = path.join(
  __dirname,
  "../../project/certs/ca/ca.crt"
);

const ADMIN = "admin";
const PASSWORD = "changeit";
const ENDPOINT = "127.0.0.1:2113";

const client = EventStoreDBClient.connectionString`
esdb://172.30.240.11:2113,172.30.240.12:2113,172.30.240.13:2113?keepAliveTimeout=10000&keepAliveInterval=10000
`;
const projections = async () => await client.listProjections();
projections();

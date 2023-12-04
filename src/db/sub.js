import {
  EventStoreDBClient,
  jsonEvent,
  FORWARDS,
  BACKWARDS,
  END,
  START,
} from "@eventstore/db-client";
import { readFileSync } from "fs";

const client = new EventStoreDBClient(
  {
    endpoints: [
      {
        address: "localhost",
        port: 2111,
      },
      {
        address: "localhost",
        port: 2112,
      },
      {
        address: "localhost",
        port: 2113,
      },
    ],
    nodePreference: "random",
  },
  {
    rootCertificate: readFileSync("../../certs/ca/ca.crt"),
  },
  {
    username: "admin",
    password: "changeit",
  }
);

const subscription = client.subscribeToStream("some-stream");

for await (const resolvedEvent of subscription) {
  console.log(
    `Received event ${resolvedEvent.event?.revision}@${resolvedEvent.event?.streamId}`
  );

  await console.log(resolvedEvent);
}

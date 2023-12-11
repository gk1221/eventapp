import {
  EventStoreDBClient,
  jsonEvent,
  FORWARDS,
  START,
} from "@eventstore/db-client";
import { time } from "console";
import { randomInt } from "crypto";

import { readFileSync } from "fs";

const client = new EventStoreDBClient(
  {
    endpoints: [
      {
        address: "localhost",
        port: 2112,
      },
    ],
    nodePreference: "random",
  },
  {
    rootCertificate: readFileSync("../certs/ca/ca.crt"),
  },
  {
    username: "admin",
    password: "changeit",
  }
);
async function simpleTest() {
  const streamName = "orderconference";

  const event = jsonEvent({
    type: "order-UFO",
    data: {
      increment: randomInt(10),
    },
    metadata: {
      name: "userA",
      upbound: "200",
    },
  });

  const appendResult = await client.appendToStream(streamName, event);

  if (appendResult.success) console.log("Message sent!");
}

setInterval(() => {
  simpleTest();
}, randomInt(5) * 1000);

import { EventStoreDBClient, FORWARDS, START } from "@eventstore/db-client";
import { readFileSync } from "fs";

const fetchEventData = async () => {
  try {
    const client = new EventStoreDBClient(
      {
        endpoints: [{ address: "localhost", port: 2112 }],
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

    const events = client.readStream("some-stream", {
      direction: FORWARDS,
      fromRevision: START,
    });

    const resolvedEvents = [];
    for await (const resolvedEvent of events) {
      resolvedEvents.push(resolvedEvent.event);
    }

    return resolvedEvents;
  } catch (error) {
    return {};
    console.error("讀取資料錯誤:", error);
  }
};

export default fetchEventData;

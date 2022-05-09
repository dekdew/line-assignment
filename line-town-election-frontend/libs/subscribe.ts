import { mutate } from "swr";

let latestData = null;

const headers = { "Content-Type": "application/json" };

const subscribe = async (...args: any) => {
  if (typeof window !== "undefined") {
    const ws = new WebSocket(
      process.env.NEXT_PUBLIC_GRAPHQL_WS_URI || "",
      "graphql-ws"
    );
    const init_msg = {
      type: "connection_init",
      payload: { headers: headers },
    };
    ws.onopen = function (event) {
      ws.send(JSON.stringify(init_msg));
      const msg = {
        id: "1",
        type: "start",
        payload: {
          variables: {},
          extensions: {},
          operationName: null,
          query: args[0],
        },
      };
      ws.send(JSON.stringify(msg));
    };
    ws.onmessage = function (data) {
      const finalData = JSON.parse(data.data);
      if (finalData.type === "data") {
        latestData = finalData.payload.data;
        mutate("subscription", latestData, false);
        return latestData;
      }
    };
  }
};

export default subscribe;

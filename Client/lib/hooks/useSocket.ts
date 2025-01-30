import { useEffect } from "react";
import socket from "../socket-io";

const useSocket = <T>(
  channel: string,
  fn: (recv: T) => void,
  ready = false
) => {
  useEffect(() => {
    if (!ready) return;
    // socket.connect();

    socket.on(channel, (message: T) => {
      fn(message);
    });

    return () => {
      // socket.disconnect();
      socket.off(channel);
    };
  }, [channel, fn, ready]);
};

export default useSocket;

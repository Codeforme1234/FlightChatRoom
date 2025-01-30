import { io } from "socket.io-client";
const socket = io("http://192.168.236.199:5000", {
  extraHeaders: {
    Cookie:
      "user_id=7_X6uV6Twq2E4A2Jgx_KhQ:1729754628541:aff888520d679c833fa37dd83799a30552cd48a9; trackerid=abc; role=user",
  },
  autoConnect: false,
  path: "/p/acko-assist/ws",
  transports: ["websocket", "polling"],
});
export default socket;

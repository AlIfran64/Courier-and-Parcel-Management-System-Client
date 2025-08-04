import { io } from "socket.io-client";
const socket = io("https://goquick-server.vercel.app", {
  transports: ["websocket"],
});
export default socket;

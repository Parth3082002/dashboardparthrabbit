import { io } from "socket.io-client";

const socket = io("https://parthdemorabitmq.onrender.com");

export default socket;
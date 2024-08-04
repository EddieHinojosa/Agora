import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_PROD_APP_URL : import.meta.env.VITE_DEV_APP_URL;
const socket = io(SOCKET_URL);

export default socket;
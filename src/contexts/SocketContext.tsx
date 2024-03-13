import React, {createContext, useContext, useEffect, useState} from 'react';
import {io, Socket} from 'socket.io-client';

interface SocketContextProps {
  children: React.ReactNode;
}

interface DefaultEventsMap {
  // Define your custom events here if needed
}

type SocketType = Socket<DefaultEventsMap, DefaultEventsMap>;

const SocketContext = createContext<SocketType | null>(null);

export const useSocket = (): SocketType | null => useContext(SocketContext);

export const SocketProvider: React.FC<SocketContextProps> = ({children}) => {
  const [socket, setSocket] = useState<SocketType | null>(null);

  useEffect(() => {
    const newSocket = io('http://192.168.18.206:8000');
    setSocket(newSocket);

    // Return a cleanup function
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

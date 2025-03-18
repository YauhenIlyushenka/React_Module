import React, { useEffect, useRef, useState } from 'react';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

interface Notification {
  user: string;
  message: string;
}

const JobNotifications: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const connectionRef = useRef<HubConnection | null>(null);
    const isSubscribed = useRef(false);
  
    useEffect(() => {
      if (connectionRef.current) return;
  
      const newConnection = new HubConnectionBuilder()
        .withUrl('http://localhost:8787/notificationHub')
        .build();
  
    if (!isSubscribed.current) {
        newConnection.on('ReceiveMessage', (user: string, message: string) => {
          setNotifications((prevNotifications) => [
            ...prevNotifications,
            { user, message },
          ]);
        });
  
        isSubscribed.current = true;
      }
  
      newConnection
        .start()
        .then(() => {
          console.log('Connected to SignalR hub!');
          connectionRef.current = newConnection;
        })
        .catch((err) => {
          console.error('Error while starting connection: ', err);
        });
  
      return () => {
        if (connectionRef.current) {
          connectionRef.current.stop();
        }
      };
    }, []);
  
    return (
      <div>
        <h2>Job Notifications</h2>
        <div>
          {notifications.length === 0 && <p>No notifications yet...</p>}
          {notifications.map((notification, index) => (
            <div key={index}>
              <strong>{notification.user}: </strong>
              <span>{notification.message}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default JobNotifications;
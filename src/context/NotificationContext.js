// src/context/NotificationContext.js
import React, { createContext, useState, useEffect } from 'react';
import api from '../services/ApiService';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get('/notifications');
        const unreadNotifications = response.data.filter(notification => !notification.read);
        setNotificationCount(unreadNotifications.length);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      await api.patch(`/notifications/mark-as-read/${id}`);
      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === id ? { ...notif, read: true } : notif
        )
      );
      setNotificationCount((prevCount) => prevCount - 1); // Update counter
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      const notificationToDelete = notifications.find(notif => notif._id === id);
      await api.delete(`/notifications/${id}`);
      setNotifications((prev) => prev.filter((notif) => notif._id !== id));

      if (!notificationToDelete.read) {
        setNotificationCount((prevCount) => prevCount - 1); // Update counter
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications, notificationCount, markAsRead, deleteNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

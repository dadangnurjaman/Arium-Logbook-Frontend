// src/pages/Notifications.js
import React, { useContext } from 'react';
import { NotificationContext } from '../context/NotificationContext';

const Notifications = () => {
    const { notifications, markAsRead, deleteNotification } = useContext(NotificationContext);

    return (
        <div className="p-4">
            <h2 className="text-2xl mb-4">Notifications</h2>
            {notifications.length === 0 ? (
                <p>No notifications available</p>
            ) : (
                <ul className="space-y-4">
                    {notifications.map((notification) => (
                        <li
                            key={notification._id}
                            className={`p-4 rounded shadow ${
                                notification.type === 'info'
                                    ? 'bg-blue-100'
                                    : notification.type === 'warning'
                                    ? 'bg-yellow-100'
                                    : notification.type === 'error'
                                    ? 'bg-red-100'
                                    : 'bg-green-100'
                            } ${notification.read ? 'opacity-75' : ''}`}
                        >
                            <div className="flex justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        {notification.title}
                                    </h3>
                                    <p>{notification.message}</p>
                                    <small className="text-gray-500">
                                        Received: {new Date(notification.createdAt).toLocaleString()}
                                    </small>
                                </div>
                                <div className="flex flex-col items-end">
                                    {!notification.read && (
                                        <button
                                            onClick={() => markAsRead(notification._id)}
                                            className="text-sm text-blue-600 hover:underline mb-2"
                                        >
                                            Mark as Read
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteNotification(notification._id)}
                                        className="text-sm text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Notifications;

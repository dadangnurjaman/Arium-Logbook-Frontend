import React, { useState, useContext } from 'react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigation } from '../context/NavigationContext';
import { NotificationContext } from '../context/NotificationContext';
import { Link, useNavigate } from 'react-router-dom';
import userImage from '../assets/images/user.webp';
import api from '../services/ApiService';

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Notifications', href: '/notifications' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Header = () => {
  const { current, setCurrent } = useNavigation();
  const { notifications, notificationCount } = useContext(NotificationContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const toggleNotificationMenu = () => {
    setNotificationMenuOpen(!notificationMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getCurrentPageName = () => {
    const currentPage = navigation.find((item) => item.href === current);
    return currentPage ? currentPage.name : 'Dashboard';
  };

  const categorizedNotifications = {
    info: [],
    success: [],
    warning: [],
    error: [],
  };

  notifications.forEach(notification => {
    categorizedNotifications[notification.type].push(notification);
  });

  return (
    <nav className="bg-cyan-950">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:bg-gray-200 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-800"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {menuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <span className="text-xl font-semibold text-white">Report Period: January 2024 - June 2024</span>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setCurrent(item.href)}
                    className={classNames(
                      current === item.href
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-500 hover:bg-gray-200 hover:text-gray-800',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                    aria-current={current === item.href ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative">
              <button
                type="button"
                className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-white"
                onClick={toggleNotificationMenu}
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {notificationCount}
                  </span>
                )}
              </button>
              {notificationMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="px-4 py-2">
                    <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {['info', 'success', 'warning', 'error'].map(type => (
                      <div key={type} className="px-4 py-2">
                        <h4 className="text-xs font-semibold text-gray-600 capitalize">{type}</h4>
                        {categorizedNotifications[type].length === 0 ? (
                          <p className="text-xs text-gray-500">No {type} notifications</p>
                        ) : (
                          categorizedNotifications[type].slice(0, 3).map(notification => (
                            <p key={notification._id} className="text-xs text-gray-700">
                              {notification.message}
                            </p>
                          ))
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2">
                    <button
                      onClick={() => {
                        setCurrent('/notifications'); // Set current to notifications
                        navigate('/notifications');
                        setNotificationMenuOpen(false);
                      }}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      See All
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User profile dropdown */}
            <div className="relative ml-3">
              <div>
                <button
                  className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-white"
                  onClick={toggleUserMenu}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={userImage}
                    alt="User"
                  />
                </button>
              </div>
              {userMenuOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Your Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <header className="bg-gray-300 text-black p-3 flex justify-between items-center">
        <h1 className="text-lg font-bold">{getCurrentPageName()}</h1>
      </header>

      {menuOpen && (
        <div className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => {
                  setCurrent(item.href);
                  setMenuOpen(false);
                }}
                className={classNames(
                  current === item.href ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-200 hover:text-gray-800',
                  'block rounded-md px-3 py-2 text-base font-medium'
                )}
                aria-current={current === item.href ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;

import React from 'react';
import { HomeIcon, CogIcon, BellIcon } from '@heroicons/react/24/outline'; // Pastikan Anda mengimpor hanya ikon yang diperlukan
import logo from '../assets/images/brand-logo.png';
import { useNavigation } from '../context/NavigationContext';
import { Link, useNavigate } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, href: '/' },
  { name: 'Notifications', icon: BellIcon, href: '/notifications' },
  // Tambahkan item navigasi lainnya sesuai kebutuhan
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Sidebar = () => {
  const { current, setCurrent } = useNavigation();
  const navigate = useNavigate();

  return (
    <div className="h-full w-20 bg-gray-900 flex flex-col items-center py-4 relative z-40">
      <div className="flex-shrink-0">
        <img className="h-8 w-auto" src={logo} alt="Workflow" />
      </div>
      <div className="mt-5 flex-1 w-full px-2 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            onClick={() => {
              setCurrent(item.href);
              navigate(item.href);
            }}
            className={classNames(
              current === item.href
                ? 'bg-gray-800 text-white cursor-default'
                : 'text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer',
              'group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium relative'
            )}
            aria-current={current === item.href ? 'page' : undefined}
          >
            <item.icon
              className={classNames(
                current === item.href ? 'text-white' : 'text-gray-400 group-hover:text-white',
                'h-6 w-6'
              )}
              aria-hidden="true"
            />
            <div className="absolute left-12 top-1/2 transform -translate-y-1/2 ml-2 hidden group-hover:block z-50 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
              <div className="bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                {item.name}
                <div className="bg-black absolute left-[-5px] top-1/2 transform -translate-y-1/2 rotate-45 w-2.5 h-2.5"></div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="w-full px-2">
        <Link
          to="/settings"
          onClick={() => {
            setCurrent('/settings');
            navigate('/settings');
          }}
          className={classNames(
            current === '/settings'
              ? 'bg-gray-800 text-white cursor-default'
              : 'text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer',
            'group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium relative'
          )}
          aria-current={current === '/settings' ? 'page' : undefined}
        >
          <CogIcon
            className={classNames(
              current === '/settings' ? 'text-white' : 'text-gray-400 group-hover:text-white',
              'h-6 w-6'
            )}
            aria-hidden="true"
          />
          <div className="absolute left-12 top-1/2 transform -translate-y-1/2 ml-2 hidden group-hover:block z-50 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            <div className="bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
              Settings
              <div className="bg-black absolute left-[-5px] top-1/2 transform -translate-y-1/2 rotate-45 w-2.5 h-2.5"></div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

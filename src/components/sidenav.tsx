'use client';

import React from 'react';
import { SIDENAV_ITEMS } from '@/constants';
import { SideNavItem } from '@/types';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Tooltip } from "@nextui-org/tooltip";
import "@/styles/sidenav.scss";

const SideNav = () => {
  // Dividir los elementos del menú
  const navigationItems = SIDENAV_ITEMS.slice(0, -2); // Todos menos los últimos dos
  const settingsItems = SIDENAV_ITEMS.slice(-2);     // Solo los últimos dos

  return (
    <div className="contenedorSidebar">
      <aside className="sidebar">

        <div className="navegacion">
          {navigationItems.map((item, idx) => (
            <MenuItem key={idx} item={item} />
          ))}
        </div>


        <div className="ajustes">
          {settingsItems.map((item, idx) => (
            <MenuItem key={idx} item={item} />
          ))}
        </div>
      </aside>
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(item.path);

  return (
    <Tooltip content={item.title} placement="right" color="primary">
      <Link
        href={item.path}
        className={`menuItem ${isActive ? 'menuItemActive' : ''}`}
      >
        <div className="opcion">
        {item.icon}
        </div>
      </Link>
    </Tooltip>
  );
};

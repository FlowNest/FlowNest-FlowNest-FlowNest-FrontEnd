import { Icon } from '@iconify/react';

import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
    {
        title: 'Chats',
        path: '#',
        icon: <Icon icon="fluent:chat-28-regular" width="24" height="24" />,
    },
    {
        title: 'Estados',
        path: '#',
        icon: <Icon icon="fluent:record-28-regular" width="24" height="24" />,
    },
    {
        title: 'Canales',
        path: '#',
        icon: <Icon icon="fluent:chat-multiple-28-regular" width="24" height="24" />,
    },
    {
        title: 'Comunidades',
        path: '#',
        icon: <Icon icon="fluent:people-team-28-regularr" width="24" height="24" />,
    },
    {
        title: 'Ajustes',
        path: '#',
        icon: <Icon icon="fluent:people-team-28-regularr" width="24" height="24" />,
    },
];
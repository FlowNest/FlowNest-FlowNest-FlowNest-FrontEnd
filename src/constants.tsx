import { Icon } from '@iconify/react';

import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
    {
        title: 'Chats',
        path: '/chats',
        icon: <Icon icon="fluent:chat-28-regular" width="28" height="28" />,
    },
    {
        title: 'Estados',
        path: '/chats/estados',
        icon: <Icon icon="fluent:record-28-regular" width="28" height="28" />,
    },
    {
        title: 'Canales',
        path: '/chats/canales',
        icon: <Icon icon="fluent:chat-multiple-28-regular" width="28" height="28" />,
    },
    {
        title: 'Comunidades',
        path: '/chats/comunidades',
        icon: <Icon icon="fluent:people-team-28-regular" width="28" height="28" />,
    },
    {
        title: 'Ajustes',
        path: '/chats/ajustes',
        icon: <Icon icon="fluent:settings-28-regular" width="28" height="28" />,
    },
    {
        title: 'Perfil',
        path: '/chats/perfil',
        icon: <Icon icon="fluent:person-circle-28-regular" width="28" height="28" />,
    },
];
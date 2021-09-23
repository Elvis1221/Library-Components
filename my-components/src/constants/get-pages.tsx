import { FC } from 'react';

import { ROOT_URL, ROUTING_URLS } from './urls.const';
import Relocation from '../pages/relocation/relocation';
import EditRequest from '../pages/edit-request/edit-request';
import Waves from '../pages/waves/waves';
import RelocationRequestForm from '../pages/relocation-request-form/relocation-request-form';
import WaveDetails from '../pages/wave-details/wave-details';
import { PermissionsType } from 'components/user-info/user-info';
import { NotFoundPage } from 'pages/error-page/error-page';

export type PageType = {
  name: string;
  title: string;
  path: string;
  icon: string;
  hasSidebar: boolean;
  component: FC;
  exact: boolean;
  navMenuVisibility?: boolean;
  routesVisibility?: boolean;
};

export const getPages = (permissions: PermissionsType): PageType[] => [
  {
    name: 'All requests',
    title: 'All requests',
    path: ROOT_URL,
    icon: '<MyRequestsIcon />',
    hasSidebar: true,
    component: Relocation,
    exact: true,
    navMenuVisibility: true,
    routesVisibility: true,
  },
  {
    name: 'Relocation Form request',
    title: 'Relocation Form request',
    path: ROUTING_URLS.relocationRequest,
    icon: '<MyRequestsIcon />',
    hasSidebar: true,
    component: RelocationRequestForm,
    exact: true,
    navMenuVisibility: true,
    routesVisibility: true,
  },
  {
    name: 'Edit request',
    title: 'Edit request',
    path: ROUTING_URLS.requestEdit,
    icon: '<MyRequestsIcon />',
    hasSidebar: true,
    component:
      permissions?.root || permissions?.adc || permissions?.sdm
        ? EditRequest
        : NotFoundPage,
    exact: false,
  },

  {
    name: 'All waves',
    title: 'All waves',
    path: ROUTING_URLS.waves,
    icon: '<MyRequestsIcon />',
    hasSidebar: true,
    component: permissions?.root ? Waves : NotFoundPage,
    exact: true,
    navMenuVisibility: true,
    routesVisibility: true,
  },
  {
    name: 'Wave details',
    title: 'Wave details',
    path: ROUTING_URLS.waveDetails,
    icon: '<MyRequestsIcon />',
    hasSidebar: true,
    component: permissions?.root ? WaveDetails : NotFoundPage,
    exact: false,
  },
];

export const ROOT_URL = '/relocation';

export const NAVIGATION_URLS = {
  relocators: 'relocators',
  locations: 'locations',
  familyOption: 'familyOption',
  relocationInterest: 'relocationInterest',
  currentPerson: 'currentPerson',
  avatar: 'avatar',
  request: 'request',
  wave: 'wave',
  status: 'status',
  waveStatus: 'waveStatus',
  externalFilters: 'externalFilters',
  note: 'note',
};

export const PAGES_URLS = {
  waves: 'waves',
  requestEdit: 'edit/:id',
  relocationRequest: 'relocation-request',
  waveDetails: 'waves/:id',
};

export const ROUTING_URLS = {
  requestEdit: `${ROOT_URL}/${PAGES_URLS.requestEdit}`,
  waves: `${ROOT_URL}/${PAGES_URLS.waves}`,
  relocationRequest: `${ROOT_URL}/${PAGES_URLS.relocationRequest}`,
  waveDetails: `${ROOT_URL}/${PAGES_URLS.waveDetails}`,
};

export const REDIRECT_KEYS = {
  search: 'redirect_search',
  uri: 'redirect_uri',
};

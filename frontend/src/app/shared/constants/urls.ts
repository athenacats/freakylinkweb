import { environment } from 'src/environments/environment';

export const BASE_URL = environment.production ? '' : 'http://localhost:5000';

export const LINGERIES_URL = BASE_URL + '/api/lingeries';
export const LINGERIES_TAGS_URL = LINGERIES_URL + '/tags';
export const LINGERIES_BY_SEARCH_URL = LINGERIES_URL + '/search/';
export const LINGERIES_BY_TAG_URL = LINGERIES_URL + '/tag/';
export const LINGERIES_BY_ID_URL = LINGERIES_URL + '/';
export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const USER_REGISTER_URL = BASE_URL + '/api/users/register';
export const USER_UPDATE = BASE_URL + '/api/users/update/';
export const ORDERS_URL = BASE_URL + '/api/orders';
export const ORDERS_CREATE_URL = ORDERS_URL + '/create';
export const ORDERS_NEW_FOR_CURRENT_USER =
  ORDERS_URL + '/newOrderForCurrentUser';
export const ORDERS_PAY_URL = ORDERS_URL + '/pay';
export const ORDERS_TRACK_URL = ORDERS_URL + '/track/';

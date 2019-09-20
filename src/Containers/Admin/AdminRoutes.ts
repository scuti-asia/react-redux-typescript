import Example from '../Example';
import { Logout } from '../Auth';

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/admin', exact: true, name: 'Example', component: Example },
  { path: '/admin/logout', name: 'Logout', component: Logout }
];

export default routes;

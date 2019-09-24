import Example from '../Example';
import UserManagement from '../UserManagement'

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/admin', exact: true, name: 'Example', component: Example },
  { path: '/admin/user-management', exact: true, name: 'UserManagement', component: UserManagement }
];

export default routes;

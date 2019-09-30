import React, { Component, Suspense } from 'react';
import {injectIntl} from 'react-intl';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
  // @ts-ignore
} from '@coreui/react';

import { AdminFooter } from '../../Components/AdminLayout';
import AdminHeader from './Header';
import { Authority } from '../../Containers/Auth'
import routes from './AdminRoutes';
import { navigation } from './AdminNavigation';

interface Props {
  intl: any
}

class AdminLayoutComponent extends Component<Props> {
  loading() {
    return (
      <div className="animated fadeIn pt-1 text-center">
        <div className="sk-spinner sk-spinner-pulse"/>
      </div>
    );
  };

  render() {
    return (
      <Authority>
        <div className="app">
          <AppHeader fixed>
            <Suspense fallback={this.loading()}>
              <AdminHeader />
            </Suspense>
          </AppHeader>
          <div className="app-body">
            <AppSidebar fixed display="lg">
              <AppSidebarHeader/>
              <AppSidebarForm/>
              <Suspense fallback={this.loading()}>
                <AppSidebarNav navConfig={{items: navigation(this.props.intl)}} {...this.props} />
              </Suspense>
              <AppSidebarFooter/>
              <AppSidebarMinimizer/>
            </AppSidebar>
            <Switch>
              {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      render={props => (
                        <route.component {...props} />
                      )}
                    />)
                    : (null);
                },
              )}
              <Redirect from="/" to="/admin" />
            </Switch>
          </div>
          <AppFooter>
            <Suspense fallback={this.loading()}>
              <AdminFooter/>
            </Suspense>
          </AppFooter>
        </div>
      </Authority>
    )
  }
}

export default injectIntl(AdminLayoutComponent);

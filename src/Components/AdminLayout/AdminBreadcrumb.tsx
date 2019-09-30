import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

export interface Props {
  pageTitle: string
}

const Breadcrumbs: FunctionComponent<Props> = (props) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item active><FormattedMessage id={props.pageTitle} /></Breadcrumb.Item>
    </Breadcrumb>
  )
}

export default Breadcrumbs;

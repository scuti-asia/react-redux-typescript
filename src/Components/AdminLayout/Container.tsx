import React, { FunctionComponent, ReactNode } from 'react';
import Container from 'react-bootstrap/Container';
import BreadCrumb from './AdminBreadcrumb';

export interface Props {
  children: ReactNode,
  pageTitle: string
}

const ContainerComponent: FunctionComponent<Props> = props => {
  return (
    <main className="main">
      <nav>
        <BreadCrumb pageTitle={props.pageTitle}/>
      </nav>
      <Container fluid>
          {props.children}
      </Container>
    </main>
  );
}

export default ContainerComponent;

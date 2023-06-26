import { useRouteError } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

import PageContent from '../components/PageContent';
import React from 'react';
import { ErrorObj } from '../models/types';

function ErrorPage() {
  const error = useRouteError() as ErrorObj;

  let title = 'An error occurred!';
  let message = 'Something went wrong!';
  if (error.status === 500 || error.status === 401 || error.status === 422) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page.';
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;

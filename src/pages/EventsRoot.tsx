import { Outlet } from 'react-router-dom';

import EventsNavigation from '../components/EventsNavigation';
import React from 'react';

function EventsRootLayout() {
  return (
    <>
      <EventsNavigation />
      <Outlet />
    </>
  );
}

export default EventsRootLayout;

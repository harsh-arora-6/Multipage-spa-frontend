import { useRouteLoaderData } from 'react-router-dom';

import EventForm from '../components/EventForm';
import React from 'react';
import { EventObj } from '../models/types';

function EditEventPage() {
  const {event} = useRouteLoaderData('event-detail') as {event:EventObj};

  return <EventForm method="patch" event={event} />;
}

export default EditEventPage;

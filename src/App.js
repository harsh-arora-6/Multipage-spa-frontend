import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import RootLayout from './pages/Root';
import HomePage from './pages/Home';
import EventsPage,{loader as eventsLoader} from './pages/Events';
import EventDetailPage,{loader as eventDetailLoader} from './pages/EventDetail';
import NewEventPage from './pages/NewEvent';
import EditEventPage from './pages/EditEvent';
import EventRootLayout from './pages/EventRoot';
import ErrorPage from './pages/ErrorPage';
const router = createBrowserRouter([
  {
    path:'/',
    element:<RootLayout />,
    errorElement:<ErrorPage />,
    // below are relative paths.
    children:[
      {index:true,element:<HomePage />},
      {
        path:'events',
        element:<EventRootLayout />,
        children:[
          {path:'',element:<EventsPage />, loader:eventsLoader},
          {
            path:':eventId',
            id:'event-detail',
            loader:eventDetailLoader,
            children:[
              {index:true,element:<EventDetailPage />,loader:eventDetailLoader},
              {path:'edit',element:<EditEventPage />},
            ]
          },
          {path:'new',element:<NewEventPage />},
          
        ]
      }
  ]},
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;

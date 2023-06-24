import { useNavigate,Form,useNavigation,useActionData, json, redirect } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  // using hook similar to useLoaderData
  const data = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  let isSubmitting = navigation.state === 'submitting';
  function cancelHandler() {
    navigate('..');
  }
  // we use 'Form' instead of 'form' so that we can get access to properties in the action property of route
  // for that make share each property has name attribute 
  return (
    //     <Form method='post' action='<route-path> className={classes.form}> the route mentioned in action will be triggerred and if not mentioned then current route is considered

    <Form method={method} className={classes.form}>
      {data && data.errors && <ul>
        {Object.values(data.errors).map(err => <li key={err}>{err}</li>)}
        </ul>}
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event?event.title:''}/>
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event?event.image:''}/>
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event?event.date:''}/>
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event?event.description:''} />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting?'Submitting...':'Save'}</button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function action({request,params}){
  // access Form properties from EventForm
  const data = await request.formData();
  const eventData = {
      title:data.get('title'),
      image:data.get('image'),
      date:data.get('date'),
      description:data.get('description')
  };
  let url = 'http://localhost:8080/events/';
  if(request.method === 'PATCH'){
    const eventId = params.eventId;
    url = url + eventId;
  }
  // console.log(eventData);
  const response = await fetch(url,{
      method:request.method,
      body:JSON.stringify(eventData),
      headers:{'Content-Type':'application/json'}
  });
  // validation error from backend as client side checks in eventForm can be disable from browser.
  if(response.status === 422){
      return response;
  }
  if(!response.ok){
      throw json({message:'Could not save event'},{status:500});
  }
  // navigate away to some page after saving 
  return redirect('/events');
}
import { useNavigate,Form,useNavigation } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
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

    <Form method='post' className={classes.form}>
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

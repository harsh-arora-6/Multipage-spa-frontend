import EventForm from "../components/EventForm";
import {json,redirect} from 'react-router-dom';
export default function NewEventPage(){
    return <EventForm />;
}

export async function action({request,params}){
    // access Form properties from EventForm
    const data = await request.formData();
    const eventData = {
        title:data.get('title'),
        image:data.get('image'),
        date:data.get('date'),
        description:data.get('description')
    };
    // console.log(eventData);
    const response = await fetch('http://localhost:8080/events',{
        method:'POST',
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
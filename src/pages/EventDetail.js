import {useRouteLoaderData,json,redirect} from 'react-router-dom'
import EventItem from '../components/EventItem';
export default function EventDetailPage(){
    const data = useRouteLoaderData('event-detail');
    return <EventItem event={data.event}/>
}
export async function loader({request,params}){
    const response = await fetch('http://localhost:8080/events/' + params.eventId);
    if(!response.ok){
        throw json({message:'Could not fetch details of the event asked.'},{status:500});
    }else{
        return response;
    }
}
export async function action({request,params}){
    // const data = await request.formData();
    // console.log('data: ',data.get('name'));
    const eventId = params.eventId;

    const response = await fetch('http://localhost:8080/events/' + eventId,{
        method:request.method,
        headers:{'Content-Type':'application/json'}
    });
    if(!response.ok){
        throw json({message:'Could not delete event.'},{status:500});
    }
    return redirect('/events');
}
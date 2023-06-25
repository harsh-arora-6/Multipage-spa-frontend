import {useRouteLoaderData,json,redirect,defer,Await} from 'react-router-dom';
import { Suspense } from 'react';
import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';
export default function EventDetailPage(){
    const {event,events} = useRouteLoaderData('event-detail');
    return (
        <>
            <Suspense fallback={<p style={{textAlign:'center'}}>Loading...</p>}>
                <Await resolve={event}>
                    {(loadedEvent)=><EventItem event={loadedEvent}/>}
                </Await>
            </Suspense>
            <Suspense fallback={<p style={{textAlign:'center'}}>Loading...</p>}>
                <Await resolve={events}>
                    {(loadedEvents) => <EventsList events={loadedEvents}/>}
                </Await>
            </Suspense>
        </>
    )
}
export async function loadEvent(id){
    const response = await fetch('http://localhost:8080/events/' + id);
    if(!response.ok){
        throw json({message:'Could not fetch details of the event asked.'},{status:500});
    }else{
        const resData = await response.json();
        return resData.event;
    }
}
export async function loadEvents(){
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        // throw new Response(JSON.stringify({message:'Could not fetch events'}),{status: 500})
        throw json({message:'Could not fetch events'},{status:500});
    } else {
        const resData = await response.json();
        return resData.events;
    }
}
export async function loader({request,params}){
    const id = params.eventId;
    // here since we put await in front of event so page won't load until loadEvent is resolved so we will never see fallback
    //  but events will be deferred
    return defer({
        event:await loadEvent(id),
        events:loadEvents()
    })
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
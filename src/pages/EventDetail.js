import {useLoaderData,json} from 'react-router-dom'
import EventItem from '../components/EventItem';
export default function EventDetailPage(){
    const data = useLoaderData();
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
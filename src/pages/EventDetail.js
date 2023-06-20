import {useParams} from 'react-router-dom'
export default function EventDetailPage(){
    const params = useParams();
    return <>
        <h1>EventDetail Page</h1>
        <p>{params.eventId}</p>
    </>
}
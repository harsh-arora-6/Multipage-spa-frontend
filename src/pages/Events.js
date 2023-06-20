import {Link} from 'react-router-dom'
const Events = [
    {id:'e1',title:'Event - 1'},
    {id:'e2',title:'Event - 2'},
    {id:'e3',title:'Event - 3'},
]
export default function EventsPage(){
    return <>
        <h1>Event Page</h1>
        <ul>
            {Events.map(event => <li><Link to={event.id}>{event.title}</Link></li>)}
        </ul>
    </>
}
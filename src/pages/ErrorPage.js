
import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";
import {useRouteError} from 'react-router-dom';

export default function ErrorPage(){
    const error = useRouteError();
    let title = 'An Error Occurred';
    let message;
    // console.log('status ' , error.status);
    if(error.status === 500){
        // message = JSON.parse(error.data).message;
        message = error.data.message;
    }
    // default for errorElement.
    if(error.status === 404){
        title='Not Found!'
        message = 'Could not find Page or Resource.'
    }
    return (
        <>
            <MainNavigation />
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </>
    )
}
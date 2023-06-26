import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';
import { getTokenExpiration } from '../util/auth';
import React from 'react';

function RootLayout() {
  // const navigation = useNavigation();
  // to programmatically submit to action function of '/logout' route 
  const submit = useSubmit();

  const token = useLoaderData();
  useEffect(()=>{
    if(!token)return;
    if(token === 'EXPIRED'){
      submit(null,{action:'/logout',method:'post'});
      return;
    }
    const tokenDuration = getTokenExpiration();
    console.log(tokenDuration);
    setTimeout(()=>{
      submit(null,{action:'/logout',method:'post'});
    },tokenDuration);
  },[submit,token])
  
  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;

import React from 'react'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import {Link} from 'react-router-dom'
import { useAuth0 } from "../react-auth0-wrapper";
import PropertyContainer from '../components/PropertyContainer';




function Property() {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    return( 
        <>
    <Hero hero="roomsHero">
         <Banner title="Nearby Listings">
              {/* <Link to='/' className="btn-primary"> */}
              {isAuthenticated && <button className="btn-primary" onClick={() => logout()}>Log out</button>}
              {/* </Link> */}
              </Banner>
    </Hero>
    <PropertyContainer />
    </>
    );
};

export default Property

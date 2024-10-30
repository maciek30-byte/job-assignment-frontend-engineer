import React from 'react';
import { Footer } from '../shared/Footer';
import { LoggedUserNavBar } from '../shared/LoggedUser';
import { NavBar } from '../shared/NavBar';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
export const Layout = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
    const { user } = useAuth();
    return (
        <>
            {user ? <LoggedUserNavBar /> : <NavBar />}
            {children}
            <Footer />
        </>
    );
};
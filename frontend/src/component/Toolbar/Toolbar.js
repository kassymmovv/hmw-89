import React from 'react';

import {NavLink as RouterNavLink} from 'react-router-dom';
import {Nav, Navbar, NavbarBrand, NavItem, NavLink} from 'reactstrap';
import {useSelector} from "react-redux";
import UserMenu from "./UserMenu";
import AnonymousMenu from "./AnonynousMenu";

const Toolbar = () => {
    const user = useSelector(state => state.users.user);

    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand tag={RouterNavLink} to="/">LAST FM</NavbarBrand>

            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink tag={RouterNavLink} to="/" exact>All</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={RouterNavLink} to="/track_history" exact>Track History</NavLink>
                </NavItem>
                {user ? (
                    <UserMenu user={user}/>

                ) : (
                    <AnonymousMenu/>
                )}
            </Nav>
        </Navbar>
    );
};

export default Toolbar;
import React from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";

const UserMenu = ({user}) => {
    return (
        <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
                <img src={user.avatar} alt="User" style={{borderRadius: "50%", width: "40px", height: "40px"}}/>

                Hello, {user.displayName}!
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem>
                    View profile
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                    Logout
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
};

export default UserMenu;
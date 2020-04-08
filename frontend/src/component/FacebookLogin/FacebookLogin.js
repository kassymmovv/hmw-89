import React from 'react';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props';
import {Button} from "reactstrap";
import {useDispatch} from "react-redux";
import {loginWithFacebook} from "../../store/userActions";

const FacebookLogin = () => {
    const dispatch = useDispatch();

    const callback = (facebookData) => {
        if (facebookData.id) {
            dispatch(loginWithFacebook(facebookData))
        }
    };

    return (
        <FacebookLoginButton
            appId="917854481986603"
            callback={callback}
            fields="name,email,picture"
            render={renderProps => (
                <Button
                    onClick={renderProps.onClick}
                >
                    Login with Facebook
                </Button>
            )}
        />
    );
};

export default FacebookLogin;
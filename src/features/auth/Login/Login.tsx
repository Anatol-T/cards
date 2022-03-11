import React, {useEffect, useState} from 'react';
import styles from './login.module.css';
import SuperButton from "../../../main/ui/common/SuperButton/SuperButton";
import SuperInputText from "../../../main/ui/common/SuperInputText/SuperInputText";
import SuperCheckbox from "../../../main/ui/common/SuperCheckbox/SuperCheckbox";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../main/bll/store";
import {loginTC} from "../../../main/bll/loginReducer";
import {Navigate, NavLink} from "react-router-dom"
import {PATH} from "../../../main/ui/routes/Routes";
import {Frame} from "../../../main/ui/common/Frame/Frame";
import SuperInputPassword from "../../../main/ui/common/SuperInputPassword/SuperInputPassword";
import Preloader from "../../../main/ui/common/Preloader/Preloader";
import {setRegister} from "../../../main/bll/registerReducer";

export const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    const loginStatus = useSelector<AppRootStateType, boolean>(state => state.login.status);
    const loading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading);
    const error = useSelector<AppRootStateType, string>(state => state.app.error);
    const dispatch = useDispatch();

    const loginHandler = () => {
        dispatch(loginTC(email, password, rememberMe));
    };

    useEffect(() => {
        dispatch(setRegister(false));
    }, [])

    if (loginStatus) {
        return <Navigate to={PATH.PROFILE}/>
    }

    return (
        <>
            {loading && <Preloader/>}
            <Frame>
                <span><strong>It-incubator</strong></span>
                <h2>Sign In</h2>
                {error && <div className={styles.error}>{error}</div>}
                <div className={styles.input}>
                    <label>
                        Email
                    </label>
                    <SuperInputText error={error}
                                    value={email}
                                    onChange={e => setEmail(e.currentTarget.value)}
                    />
                </div>
                <div className={styles.input}>
                    <label>
                        Password
                    </label>
                    <SuperInputPassword error={error}
                                        value={password}
                                        onChange={e => setPassword(e.currentTarget.value)}
                    />
                </div>
                <div className={styles.containerCheckbox}>
                    <SuperCheckbox checked={rememberMe}
                                   onChange={() => setRememberMe(!rememberMe)}/>
                    <p>Remember me</p>
                </div>
                <NavLink to={PATH.FORGOT_YOUR_PASSWORD} className={styles.linkLogin}><p
                    className={styles.forgotText}>Forgot Password</p></NavLink>
                <SuperButton onClick={loginHandler}>Login</SuperButton>
                <p>Don’t have an account?</p>
                <NavLink to={PATH.REGISTRATION} className={styles.linkLogin}>
                    <p className={styles.signUpText}>Sign Up</p>
                </NavLink>
            </Frame>
        </>
    );
};

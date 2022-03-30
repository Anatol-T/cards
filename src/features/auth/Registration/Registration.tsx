import React, {useEffect, useState} from 'react';
import SuperButton from "../../../main/ui/common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {registerTC, setRegister} from "../../../main/bll/registerReducer";
import {AppRootStateType} from "../../../main/bll/store";
import {Navigate, NavLink} from "react-router-dom";
import s from './Registration.module.css';
import SuperInputText from "../../../main/ui/common/SuperInputText/SuperInputText";
import SuperInputPassword from "../../../main/ui/common/SuperInputPassword/SuperInputPassword";
import {PATH} from "../../../main/ui/routes/Routes";
import {setErrorAC} from "../../../main/bll/appReducer";
import {Frame} from "../../../main/ui/common/Frame/Frame";
import Preloader from "../../../main/ui/common/Preloader/Preloader";

export const Registration = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const isRegistered = useSelector<AppRootStateType, boolean>(state => state.register.isRegistered)
    const error = useSelector<AppRootStateType, string>(state => state.app.error)
    const loading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setRegister(false));
            dispatch(setErrorAC(''))
        }
    }, [])

    const onClickHandler = () => {
        if (password !== confirmPassword) {
            dispatch(setErrorAC('Password and confirmation password do not match'))
        } else {
            dispatch(registerTC(email, password))
        }
    }

    if (isRegistered) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <>
            {loading && <Preloader/>}
            <Frame>
                <span><strong>It-incubator</strong></span>
                <h2>Sign up</h2>
                {error && <div className={s.error}>{error}</div>}
                <div className={s.input}>
                    <label>
                        Email
                    </label>
                    <SuperInputText value={email} onChangeText={setEmail}/>
                </div>
                <div className={s.input}>
                    <label>
                        Password
                    </label>
                    <SuperInputPassword value={password} onChangeText={setPassword}/>
                </div>
                <div className={s.input}>
                    <label>
                        Confirm password
                    </label>
                    <SuperInputPassword value={confirmPassword} onChangeText={setConfirmPassword}/>
                </div>
                <SuperButton onClick={onClickHandler} style={{padding: '10px 60px'}}>Register</SuperButton>
                <p>
                    <NavLink to={PATH.LOGIN} className={s.linkLogin}>
                        <p className={s.signUpText}>To login</p>
                    </NavLink>
                </p>
            </Frame>
        </>
    );
};

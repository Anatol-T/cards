import React, {useEffect, useState} from 'react';
import SuperButton from "../../../../main/ui/common/SuperButton/SuperButton";
import {passwordForgotTC} from "../../../../main/bll/passwordReducer";
import {useDispatch, useSelector} from "react-redux";
import {Navigate, NavLink} from "react-router-dom";
import {AppRootStateType} from "../../../../main/bll/store";
import s from "./ForgotYourPassword.module.css";
import SuperInputText from "../../../../main/ui/common/SuperInputText/SuperInputText";
import {PATH} from "../../../../main/ui/routes/Routes";
import {Frame} from "../../../../main/ui/common/Frame/Frame";
import styles from "../../Login/login.module.css";
import Preloader from "../../../../main/ui/common/Preloader/Preloader";
import {setErrorAC} from "../../../../main/bll/appReducer";


const ForgotYourPassword = () => {

    const isSend = useSelector<AppRootStateType, boolean>(state => state.recovery.isSend);
    const isError = useSelector<AppRootStateType, string>(state => state.app.error);
    const loading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading);

    // ????? НУЖНО РАЗДЕЛЕНИЕ ОШИБОК ?????
    useEffect(() => {
        dispatch(setErrorAC(''))
    }, [])

    const [email, setEmail] = useState('')

    const dispatch = useDispatch()

    let onClickHandler = () => {
        dispatch(passwordForgotTC(email))
    }

    if (isSend) {
        return <Navigate to={PATH.CHECK_EMAIL}/>
    }

    return (
        <>
            {loading && <Preloader/>}
            <Frame>
                <span><strong>It-incubator</strong></span>
                <h2>Forgot your password?</h2>
                {isError && <div className={s.error}>{isError}</div>}
                <div className={s.input}>
                    <label>
                        Email
                    </label>
                    <SuperInputText error={isError}
                                    value={email}
                                    onChangeText={setEmail}
                    />
                </div>
                <p>Enter your email address and we will send you further instructions</p>
                <SuperButton onClick={onClickHandler} style={{padding: '10px 60px'}}>Send instructions</SuperButton>
                <p>Did you remember your password?</p>
                <NavLink to={PATH.LOGIN} className={styles.linkLogin}>
                    <p className={styles.signUpText}>Try logging in</p>
                </NavLink>
            </Frame>
        </>
    )
}
export default ForgotYourPassword




















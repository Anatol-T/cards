import React, {ChangeEvent, useEffect, useState} from 'react';
import SuperButton from "../../../main/ui/common/SuperButton/SuperButton";
import {passwordForgotTC} from "../../../main/bll/passwordReducer";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {AppRootStateType} from "../../../main/bll/store";
import s from "./ForgotYourPassword.module.css";
import SuperInputPassword from "../../../main/ui/common/SuperInputPassword/SuperInputPassword";


const ForgotYourPassword = () => {

    const isSend = useSelector<AppRootStateType, boolean>(state => state.recovery.isSend);
    const isError = useSelector<AppRootStateType, string>(state => state.recovery.error);

    const [email, setEmail] = useState('')

    const dispatch = useDispatch()

    let onClickHandler = () => {
        dispatch(passwordForgotTC(email))
    }

    if (isSend) {
        return <Navigate to={'/check-email'}/>
    }

    return (
        <div className={s.page}>
            <div className={s.container}>
                <span><strong>It-incubator</strong></span>
                <h2>Forgot your password?</h2>
                {isError && <div className={s.error}>{isError}</div>}
                <div className={s.input}>
                    <label>
                        Email
                    </label>
                    <SuperInputPassword error={isError}
                                    value={email}
                                    onChangeText={setEmail}
                    />
                </div>

                <label>Enter your email address and we will send you further instructions</label>

                <SuperButton onClick={onClickHandler}>Send instructions</SuperButton>

                <h5>Did you remember your password?</h5>
                <a>Try logging in</a>
            </div>

        </div>


    )
}
export default ForgotYourPassword




















import React, {ChangeEvent} from 'react';
import email2 from '../../../assets/images/email2.svg'
import s from './CheckEmail.module.css'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../main/bll/store";


const CheckEmail = () => {

    const emailName = useSelector<AppRootStateType, string>(state => state.recovery.email);



    return (
        <div className={s.wrap}>
            <div className={s.container}>
                <img src={email2} alt=""/>

                <h1>Check Email</h1>

                <h5>We've sent an Email with instructions to <span>{emailName}</span></h5>
            </div>
        </div>
    );
};
export default CheckEmail

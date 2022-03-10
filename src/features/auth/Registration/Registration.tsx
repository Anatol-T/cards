import React, {useState} from 'react';
import SuperButton from "../../../main/ui/common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {registerTC, setRegisterError} from "../../../main/bll/registerReducer";
import {AppRootStateType} from "../../../main/bll/store";
import {Navigate} from "react-router-dom";
import s from './Registration.module.css';
import SuperInputText from "../../../main/ui/common/SuperInputText/SuperInputText";
import SuperInputPassword from "../../../main/ui/common/SuperInputPassword/SuperInputPassword";
import {PATH} from "../../../main/ui/routes/Routes";

export const Registration = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const isRegistered = useSelector<AppRootStateType, boolean>(state => state.register.isRegistered)
  const error = useSelector<AppRootStateType, string>(state => state.register.errorRegister)
  const dispatch = useDispatch();


  const onClickHandler = () => {
    if (password !== confirmPassword) {
      dispatch(setRegisterError('Password and confirmation password do not match'))
    } else {
      dispatch(registerTC(email, password))
    }
  }

  if (isRegistered) {
    return <Navigate to={PATH.LOGIN}/>
  }

  return (
    <div className={s.page}>
      <div className={s.container}>
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
        <SuperButton onClick={onClickHandler}>Register</SuperButton>
      </div>

    </div>
  );
};

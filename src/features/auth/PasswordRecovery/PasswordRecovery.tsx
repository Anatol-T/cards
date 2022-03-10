import React, {ChangeEvent, useState} from 'react';
import SuperButton from "../../../main/ui/common/SuperButton/SuperButton";
import SuperInputText from "../../../main/ui/common/SuperInputText/SuperInputText";
import {passwordRecoveryTC} from "../../../main/bll/passwordReducer";
import { useParams } from 'react-router-dom';

const PasswordRecovery = () => {

    const [password, setPassword] = useState<string>('');


    const params = useParams<'password-recovery' | '*'>()
    const res = params["password-recovery"]

    let onChangeText = (value: string) => {
        return setPassword(value)
    }

    // let submitHandler = (newPassword: string) => {
    //
    // }
    //
    // // useEffect(() => {
    // //     dispatch(passwordRecoveryTC())
    // // }, [])

    return (
        <div>
            <h1>Create new password</h1>
            <SuperInputText onChangeText={onChangeText} />
            <h3>Create new password and we will send you further instructions to email</h3>
            <div>
                <SuperButton >Create new password</SuperButton>

            </div>

        </div>
    );
};
export default PasswordRecovery

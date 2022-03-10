import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {Navigate} from 'react-router-dom';
import SuperButton from "../../main/ui/common/SuperButton/SuperButton";
import styles from "./Profile.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../main/bll/store";
import noAvatar from './noAvatar.png'
import {updateProfile} from "../../main/bll/profileReducer";
import {Frame} from "../../main/ui/common/Frame/Frame";
import {logoutTC} from "../../main/bll/loginReducer";
import {SuperLoading} from "../../main/ui/common/SuperLoading/SuperLoading";
import SuperEditableSpan from "../../main/ui/common/SuperEditableSpan/SuperEditableSpan";

export const Profile = () => {
  const dispatch = useDispatch();
  const profileName = useSelector<AppRootStateType, string>(state => state.profilePage.name);
  const profileAvatar = useSelector<AppRootStateType, string>(state => state.profilePage.avatar);
  const profileEmail = useSelector<AppRootStateType, string>(state => state.profilePage.email);
  const error = useSelector<AppRootStateType, string | undefined>(state => state.profilePage.error);
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.status);
  const loading = useSelector<AppRootStateType, boolean>(state => state.login.loading);

  const [name, setName] = useState(profileName);
  //const [editName, setEditName] = useState(false);

  //const onDoubleClickNameHandler = () => setEditName(true);
  const onBlurNameHandler = () => {
    //setEditName(false);
    onSubmitName();
  }
  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value.trim())
  };

  const onEnterHandler = () => {
    onSubmitName();
  }

  const onSubmitName = () => {
    if (name && (name !== profileName)) {
      dispatch(updateProfile({name}));
    }
    if (name.trim() === '') {
      setName(profileName);
    }
  }

  const logOutHandler = () => {
    dispatch(logoutTC())
  }

  if (!isLoggedIn) {
    return <Navigate to={'/login'}/>
  }
  return (
    <>
      {loading && <SuperLoading/>}
      <Frame>
        <span><strong>It-incubator</strong></span>
        <h3>Your profile</h3>
        <div>
          <div className={styles.avatar}>
            <img src={profileAvatar ? profileAvatar : noAvatar}
                 alt="avatar"/>
          </div>
          <div className={styles.info}>
            <span>
              Name: &#160;
              {
                <SuperEditableSpan value={name} type="text"
                                   style={{height: "27px", width: "150px"}}
                                   onChange={changeNameHandler}
                                   onBlur={onBlurNameHandler}
                                   onEnter={onEnterHandler}
                                   autoFocus
                />
              }
            </span>
            {
              // editName ?
              //   <SuperEditableSpan value={name} type="text"
              //          onChange={changeNameHandler}
              //          onBlur={onBlurNameHandler}
              //          onFocus={selectAllHandler}
              //          onKeyPress={onEnterHandler}
              //          autoFocus
              //   />
              //   :
              //   <span onDoubleClick={onDoubleClickNameHandler}>
              //                       Name: {profileName}
              //                   </span>
            }
          </div>
          <div className={styles.info}>Email: {profileEmail}</div>
        </div>
        {error && <div>error: {error}</div>}
        <div>
          <SuperButton onClick={logOutHandler}>Log Out</SuperButton>
        </div>
      </Frame>
    </>
  );
};
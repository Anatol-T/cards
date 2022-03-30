import React, {ChangeEvent, useState} from 'react';
import {Navigate} from 'react-router-dom';
import styles from "./Profile.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../main/bll/store";
import noAvatar from './noAvatar.png'
import {updateProfile} from "../../main/bll/profileReducer";
import {Frame} from "../../main/ui/common/Frame/Frame";
import SuperEditableSpan from "../../main/ui/common/SuperEditableSpan/SuperEditableSpan";
import {PATH} from "../../main/ui/routes/Routes";
import Preloader from "../../main/ui/common/Preloader/Preloader";
import Header from "../../main/ui/header/Header";
import SuperButton from "../../main/ui/common/SuperButton/SuperButton";
import Modal from "../../main/ui/common/Modal/Modal";
import {AvatarFileReader} from "./AvatarFileReader";

export const Profile = () => {
  const dispatch = useDispatch();
  const profileName = useSelector<AppRootStateType, string>(state => state.profilePage.name);
  const profileAvatar = useSelector<AppRootStateType, string>(state => state.profilePage.avatar);
  const profileEmail = useSelector<AppRootStateType, string>(state => state.profilePage.email);
  const packsNumber = useSelector<AppRootStateType, number>(state => state.profilePage.publicCardPacksCount);
  const error = useSelector<AppRootStateType, string | undefined>(state => state.profilePage.error);
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.status);
  const loading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading);

  const [name, setName] = useState(profileName)
  const [localErr, setLocalErr] = useState<string>('')


  const onBlurNameHandler = () => {
    onSubmitName();
  }
  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (localErr) setLocalErr('')
    setName(e.currentTarget.value.trim())
  };

  const onEnterHandler = () => {
    onSubmitName();
  }

  const onSubmitName = () => {
    if (name.length > 10) {
      setLocalErr('Name should be less then 11 symbols!')
      setName(profileName)
      return
    }
    if (name && (name !== profileName)) {
      dispatch(updateProfile({name}));
    }
    if (name.trim() === '') {
      setName(profileName);
    }
  }
//Modal
  const [isModal, setIsModal] = useState<boolean>(false)
  const showModal = () => setIsModal(true);
  const closeModal = () => setIsModal(false);

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN}/>
  }
  return (
    <>
      <Header/>
      {loading && <Preloader/>}
      <Frame>
        <span><strong>It-incubator</strong></span>
        <p className={styles.profileTitle}>Your profile</p>
        <div>
          <div className={styles.avatar}>
            <img src={profileAvatar ? profileAvatar : noAvatar}
                 alt="avatar"/>
          </div>
          <div className={styles.info}>
            <span>Name: &#160;</span>
            {
              <SuperEditableSpan value={name} type="text"
                                 style={{height: "27px", width: "150px"}}
                                 onChange={changeNameHandler}
                                 onBlur={onBlurNameHandler}
                                 onEnter={onEnterHandler}
                                 autoFocus
              />
            }
          </div>
          <div className={styles.info}>Email: {profileEmail}</div>
          <div className={styles.info}>Your packs: {packsNumber} </div>
        </div>
        <div className={styles.error}>
          {error && <span>error: {error}</span>}
          {localErr && <span>Note: {localErr}</span>}
        </div>
        <SuperButton onClick={showModal} light={true}>Change avatar</SuperButton>
      </Frame>
      <Modal title={'Profile Avatar'} show={isModal} closeModal={closeModal}>
        <AvatarFileReader closeModal={closeModal}/>
      </Modal>
    </>
  );
};

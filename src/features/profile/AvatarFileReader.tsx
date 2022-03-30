import React, {ChangeEvent, useRef, useState} from 'react';
import SuperInputText from "../../main/ui/common/SuperInputText/SuperInputText";
import SuperButton from "../../main/ui/common/SuperButton/SuperButton";
import styles from "./Profile.module.css";
import noAvatar from "./noAvatar.png";
import icon from "./Union.png"
import ModalButtonsWrap from "../../main/ui/common/Modal/ModalButtonsWrap";
import {updateProfile} from "../../main/bll/profileReducer";
import {useDispatch} from "react-redux";
import stl from "./AvatarFileReader.module.css"

type propsType = {
  closeModal: () => void
}
export const AvatarFileReader = ({closeModal}: propsType) => {
  const dispatch = useDispatch();
  const [newLink, setNewLink] = useState<string>('')

  const inRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File>()
  const [file64, setFile64] = useState<string | ArrayBuffer | null>();

  const upload = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setFile64(reader.result);
    }
    const newFile = e.target.files && e.target.files[0];

    if (newFile) {
      setFile(newFile);
      reader.readAsDataURL(newFile);
    }
    setNewLink('')
  }

  const onChangeLink = (e: ChangeEvent<HTMLInputElement>) => {
    setNewLink(e.currentTarget.value)
    setFile(undefined)
    setFile64(null)
  }

  const saveAvatarHandler = () => {
    if (!newLink && !file64) return
    if (file && file.size > 524288) return;
    typeof (file64) === 'string' && dispatch(updateProfile({avatar: file64}))
    newLink && dispatch(updateProfile({avatar: newLink}))
    closeModal()
  }
  return (
    <div>
      <label><b>Insert a link:</b></label>
      <SuperInputText value={newLink} onChange={onChangeLink} placeholder={'New link'}/>
      <div className={stl.addFileBlock}>
        <input
          ref={inRef}
          type={'file'}
          style={{display: 'none'}}
          onChange={upload}
        />
        <span className={stl.spanStl}> <b>or add image file : </b></span>
        <img src={icon} alt={'load'} className={stl.icon} onClick={() => inRef && inRef.current && inRef.current.click()} />
      </div>
      <div className={styles.avatar}>
        <img src={typeof (file64) === 'string' ? file64 : noAvatar}
             alt="avatar"/>
      </div>
      <div>name: {file && file.name}</div>
      <div style={file && file?.size > 524288 ? {color: "red"} : {}}>size (max 500 KB): {file && returnFileSize(file.size)}</div>
      <div>type: {file && file.type}</div>
      <ModalButtonsWrap closeModal={closeModal}>
        <SuperButton onClick={saveAvatarHandler}>Save</SuperButton>
      </ModalButtonsWrap>
    </div>
  );
};

const returnFileSize = (n: number) => {
  if (n < 1024) {
    return n + 'bytes';
  } else if (n > 1024 && n < 1048576) {
    return (n / 1024).toFixed(2) + 'KB';
  } else if (n > 1048576) {
    return (n / 1048576).toFixed(2) + 'MB';
  }
};


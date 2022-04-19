import React, {useEffect, useRef, useState} from 'react';
import styles from "./Chat.module.css";
import Modal from "../../main/ui/common/Modal/Modal";
import ModalButtonsWrap from "../../main/ui/common/Modal/ModalButtonsWrap";
import SuperButton from "../../main/ui/common/SuperButton/SuperButton";
import io  from "socket.io-client";
import chatImg from "./chat2.png";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../main/bll/store";
import SuperTextArea from "../../main/ui/common/SuperTextArea/SuperTextArea";


type MessageType = {
  _id: string
  message: string
  user: {
    _id: string
    name: string
  }
}

let socket: SocketIOClient.Socket | null = null

export const Chat = () => {
  const userName = useSelector<AppRootStateType, string>(state => state.profilePage.name);

  const [messages, setMessages] = useState<MessageType[]>([])
  const [newMessage, setNewMessage] = useState<string>('');
  const [unread, setUnread] = useState<number>(0)
  const [isModal, setIsModal] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState<number>(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)

  const showModal = () => {
    setIsModal(true);
    setUnread(0)
  }
  const closeModal = () => setIsModal(false);

  useEffect(()=> {
    socket = io("https://neko-back.herokuapp.com/")
    socket.emit("init",  (answer: string) => console.log(answer));
    socket.emit("client-name-sent", userName, (answer: string) => console.log(answer));
    socket.on('init-messages-published', (messages: MessageType[]) => {
      console.log(messages)
      setMessages(prevState => [...prevState, ...messages])
    })

    socket.on('new-message-sent', (mes:MessageType)=>{
      console.log(mes)
      setMessages(prevState => [...prevState, mes])
      if (isModal) {
        setUnread(prevState => prevState + 1)
      }
    })
    return () => {
      socket?.close()
    }
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: "smooth"})

  }, [messages])
  useEffect(() => {
    tableRef.current?.scrollTo(0, scrollPosition)

  }, [isModal])
  const sendMassage = () => {
    if(socket?.connected && newMessage){
      socket?.emit("client-message-sent", newMessage, (answer: string) => {
        console.log(answer)
      })
      setNewMessage('')
    }

  }
  const messagesList = messages.map(m => {
    return (
      <div  key={m._id}>
        <span className={styles.pre}><b>{m.user.name}: </b> {m.message} </span>
      </div>
    )
  })
  return (
    <>
      <div className={styles.chatContainer}>
        <button className={styles.btnChat} onClick={showModal}>
          <img src={chatImg} alt="chat" className={styles.chatSymbol}/>
          &nbsp; Chat
          {unread ? <div className={styles.unread}>{unread}</div> : null}
        </button>
      </div>
      <Modal title={'Chat'} show={isModal} closeModal={closeModal}>
        <div className={styles.chatTable} onScroll={(e)=>{
          //e.currentTarget.scrollTo(0, 100)
          setScrollPosition(e.currentTarget.scrollTop)
        }} ref={tableRef}>
          {messagesList}
          <div ref={scrollRef}></div>
        </div>
        <label>New massage</label>
        <SuperTextArea value={newMessage} onChangeText={setNewMessage} placeholder={'New message ...'}/>

        <ModalButtonsWrap closeModal={closeModal}>
          <SuperButton onClick={sendMassage}>Sand</SuperButton>
        </ModalButtonsWrap>
      </Modal>
    </>
  )
}
//elem.scrollTop = elem.scrollHeight;


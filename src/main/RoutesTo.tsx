import React from 'react'
import {Routes, Route, Navigate} from "react-router-dom";
import {Profile} from "../pages/p1-profile/Profile";
import {Error404} from "../pages/p6-error404/Error404";
import {Login} from "../pages/p2-login/login";
import {SignUp} from "../pages/p3-signup/SignUp";
import {PasswordReset} from "../pages/p4-password-reset/PasswordReset";
import {Demo} from "../pages/p5-demo/Demo";

export const PATH = {
  LOGIN: '/p2-login',
  PROFILE: '/p1-profile',
  SIGN_UP: '/p3-signup',
  RESET_PASSWORD: '/reset-password',
  DEMO: '/p5-demo'
}

export function RoutesTo() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate replace to='/profile'/>}/>
        <Route path={PATH.PROFILE} element={<Profile/>}/>
        <Route path={PATH.LOGIN} element={<Login/>}/>
        <Route path={PATH.SIGN_UP} element={<SignUp/>}/>
        <Route path={PATH.RESET_PASSWORD} element={<PasswordReset/>}/>
        <Route path={PATH.DEMO} element={<Demo/>}/>

        <Route path='*' element={<Error404/>}/>
      </Routes>
    </div>
  )
}



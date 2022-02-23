import React from 'react'
import {Routes, Route, Navigate} from "react-router-dom";
import {Profile} from "../pages/profile/Profile";
import {Error404} from "../pages/error/Error404";
import {Login} from "../pages/login/login";
import {SignUp} from "../pages/signup/SignUp";
import {PasswordReset} from "../pages/restore-password/PasswordReset";
import {Demo} from "../pages/demo/Demo";

export const PATH = {
  LOGIN: '/login',
  PROFILE: '/profile',
  SIGN_UP: '/signup',
  RESET_PASSWORD: '/reset-password',
  DEMO: '/demo'
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



import {instance} from "./api";

export const registrationAPI =  {
  register(email: string, password: string) {
    return instance.post<RegistrationResponseType>('/auth/register', {email, password })
  }
}

type RegistrationResponseType = {
  addedUser: any,
  error?: string
}
import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
//firebase imports
import { auth } from '../firebase-config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

const UserContext = createContext({})

export function UserProvider({children}) {

  const navigate = useNavigate()

  const [user, setUser] = useState({})
  const [isLogged, setIsLogged] = useState(false)

  //função que loga o usuário
  async function loginUser(email, password){
      try {
          const user = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          navigate(`/home`)
        } catch (error) {
          console.log(error.message);
        }
  }

  return (
      <UserContext.Provider value={{user, registerUser, loginUser, isLogged}}>
          {children}
      </UserContext.Provider>
  )
}

//função p/ facilitar as telas Login e Register de puxarem as funções de login/register
export function useUser(){
    const context = useContext(UserContext)
    return context
}

export default UserContext
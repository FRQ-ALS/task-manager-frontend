import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({
  auth: null,
  setAuth: () => {},
  user: null,
});

const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("loggedIn")));
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    const isAuth = async () => {
        const jwt = localStorage.getItem("jwt")
        fetch("/api/v1/account/auth",
        {
          credentials: "include",
          method:"GET",
          headers:{
            "Authorization": `Bearer ${jwt}`
          }
        }).then((response) => {
          if(response.ok){
            response.json().then((responseJson)=> {
              setUser(responseJson)
            })
          }
          if(!response.ok){
            setAuth(false)
            localStorage.setItem("loggedIn",false)
          }

        }).catch((error => {
          setUser(null)
        }))    
    };

    isAuth();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
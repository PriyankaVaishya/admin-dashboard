import React from 'react';
 
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
 
const AccountPage = () => (
  <div style={{
                        backgroundImage: `url("https://i.pinimg.com/originals/4a/94/26/4a94268541d7a0ed95a8be5138e8a288.jpg")`,
                        backgroundRepeat: 'no-repeat',
                        //display: "flex",
                        //justifyContent: "center",
                        //alignItems: "center",
                        backgroundSize: 'cover',
                        height:'480px',//'100vh',
                        margin: 0,
                        color:'white',
                        backgroundPosition: 'center',
                     }}>
    <h1>Account Page</h1>
    <PasswordForgetForm />
    <PasswordChangeForm />
  </div>
);
 
export default AccountPage;
import React from "react";
import FirebaseContext from "../../firebase/context";

function ForgotPassword() {
  const { firebase } = React.useContext(FirebaseContext);
  const [resetPasswordEmail, setResetPasswordEmail] = React.useState("");
  const [isPasswordReset, setIsPasswordReset] = React.useState(false);// to see if it was sucsses or not 
  const [passwordResetError, setPasswordResetError] = React.useState(null); // to handle the error maseges 

  async function handleResetPassword() {
    try {
      await firebase.resetPassword(resetPasswordEmail);
      setIsPasswordReset(true);
      setPasswordResetError(null); // to reset the old err
    } catch (err) {
      console.error("Error sending email", err);
      setPasswordResetError(err.message);
      setIsPasswordReset(false);// to reset the sucsses meseges 
    }
  }

  return (
    <div>
      <input
        type="email"
        className="input"
        placeholder="Provide your account email"
        onChange={event => setResetPasswordEmail(event.target.value)}
      />
      <div>
        <button className="button" onClick={handleResetPassword}>
          Reset Password
        </button>
      </div>
      {isPasswordReset && <p>Check email to reset password</p>}
      {passwordResetError && <p className="error-text">{passwordResetError}</p>}
    </div>
  );
}

export default ForgotPassword;
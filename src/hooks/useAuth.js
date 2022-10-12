import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux"
import { FirebaseAuth } from "../firebase/config";
import { errorsFirebase } from "../firebase/errors";
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmail, signInWithGoogle } from "../firebase/providers";
import { onChecking, onLogin, onLogout } from "../store/auth/authSlice";
import { startLoadingTrainerInfo } from "../store/trainer/thunks";


export const useAuth = () => {
    const {status, errorMessage, user} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const checkAuth = () => {
        dispatch(onChecking());
        onAuthStateChanged(FirebaseAuth, async (user) => {
            if(!user) return dispatch(onLogout());
            const {uid, email, displayName, photoURL} = user;
            // Datos entrenador desde Firebase
            dispatch(onLogin({uid, email, displayName, photoURL}));
            dispatch(startLoadingTrainerInfo())
        })
    }

    const startLogin = async ({email,password}) => {
        dispatch(onChecking());
        const result = await loginWithEmailPassword({email,password});
        if(!result.ok) {
            result.errorMessage = errorsFirebase[result.errorCode]
            dispatch(onLogout(result));
        }
        else{
            dispatch(onLogin(result));
        }
    }
    
    const startGoogleLogin = async () => {
        dispatch(onChecking());
        const result = await signInWithGoogle();
        if(!result.ok) {
            result.errorMessage = errorsFirebase[result.errorCode]
            dispatch(onLogout(result));
        } 
        else{
            dispatch(onLogin(result));
        }

    }

    const startLogout = async () => {
        await logoutFirebase();
        dispatch(onLogout())
    }

    const startRegister = async ({email,password,displayName}) => {
        dispatch(onChecking());
        const result = await registerUserWithEmail({email,password,displayName});
        if(!result.ok) {
            result.errorMessage = errorsFirebase[result.errorCode]
            dispatch(onLogout(result));
        }
        else{
            dispatch(onLogin(result));
        }
    }
    


    return {
        status,
        errorMessage,
        user,

        checkAuth,
        startLogin,
        startGoogleLogin,
        startRegister,
        startLogout,
    }
}
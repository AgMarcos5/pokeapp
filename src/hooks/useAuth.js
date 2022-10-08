import { useDispatch, useSelector } from "react-redux"

export const useAuth = () => {
    const dispatch = useDispatch();

    const {status, errorMessage, user} = useSelector(state => state.auth);

    const startLogin = async () => {

    }

    return {
        status,
        errorMessage,
        user,
    }
}
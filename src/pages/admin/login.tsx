import axios from 'axios'
import { apiBaseUrl } from '../../api/apiUrl'
import { apiEndpoints } from '../../api/endpoints'
import '../../css/login.css'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { routePaths } from '../../utils/routePaths'
import { useToken } from '../../utils/tokenContext'
import { verifyJwt } from '../../utils/verifyToken'

interface IUserData {
    userName: string
    password: string
}

enum UserData {
    userName = 'userName',
    password = 'password',
}

const Login = (): JSX.Element => {
    const tokenKey = process.env.REACT_APP_TOKEN_KEY
    const navigate = useNavigate()
    const { updateToken } = useToken()
    const [userData, setUserData] = useState<IUserData>({
        userName: '',
        password: '',
    })
    const [error, setError] = useState<boolean>(false)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target

        setUserData({
            ...userData,
            [name]: value,
        })
    }

    const [errorMsg, setErrorMsg] = useState({
        userName: '',
        password: '',
    })

    const validateOnSubmit = (): boolean => {
        let isValid = true

        if (userData.userName.length === 0) {
            errorMsg.userName = 'Användarnamn får inte vara tomt.'
            isValid = false
        } else {
            errorMsg.userName = ''
        }

        if (userData.password.length === 0) {
            errorMsg.password = 'Lösenord får inte vara tomt.'
            isValid = false
        } else {
            errorMsg.password = ''
        }

        setErrorMsg({ ...errorMsg })

        return isValid
    }

    const onLogin = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        if (!validateOnSubmit()) return

        const body = {
            userName: userData.userName,
            passwordHash: userData.password,
        }

        axios
            .post(apiBaseUrl + apiEndpoints.login, body)
            .then((res) => {
                const token = res.data.token
                if (res.status === 200 && token) {
                    const verificationResult = verifyJwt(token, tokenKey)
                    if (verificationResult) {
                        updateToken(token)
                        navigate(routePaths.dashBoard)
                    } else {
                        setError(true)
                    }
                }
            })
            .catch(() => {
                setError(true)
            })
    }

    return (
        <>
            <div className="login">
                <form className="login-container" onSubmit={(e) => onLogin(e)}>
                    <h1>Kjellman Auto Portal</h1>
                    <div className="login-input-container">
                        <label>Användarnamn</label>
                        <input
                            style={
                                errorMsg.userName
                                    ? {
                                          borderColor: 'red',
                                          backgroundColor: '#ffdddd',
                                      }
                                    : {}
                            }
                            type="text"
                            name={UserData.userName}
                            value={userData.userName}
                            onChange={(e) => handleInputChange(e)}
                            autoComplete="off"
                        />
                    </div>
                    <div className="login-input-container">
                        <label>Lösenord</label>
                        <input
                            style={
                                errorMsg.password
                                    ? {
                                          borderColor: 'red',
                                          backgroundColor: '#ffdddd',
                                      }
                                    : {}
                            }
                            type="password"
                            name={UserData.password}
                            value={userData.password}
                            onChange={(e) => handleInputChange(e)}
                            autoComplete="off"
                        />
                    </div>
                    <button className="login-btn" type="submit">
                        Logga in
                    </button>
                    {error && (
                        <h4 style={{ color: 'red' }}>
                            Användaren kunde inte hittas
                        </h4>
                    )}
                </form>
            </div>
        </>
    )
}

export default Login

import axios from "axios"
import { useContext, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { FIREBASE_URL } from '../constants'
import Context from "../context"

function Login() {
    const { setAutenticado, setUser } = useContext(Context)
    const [login, setLogin] = useState({})
    const [loading, setLoading] = useState(false)
    const { perfil } = useParams()
    const redirecionar = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        let dbLogin = []
        
        if(login.usuario && login.senha){
            let logou = false
            axios
                .get(`${FIREBASE_URL}/${perfil}.json`)
                .then(({ data, status }) => {
                    if (status === 200) {
                        dbLogin = Object
                            .entries(data)
                            .map(([key, value]) => { return value })
                        for (let index = 0; index < dbLogin.length; index++) {
                            if (dbLogin[index].usuario === login.usuario && dbLogin[index].senha === login.senha) {
                                logou = true
                                setUser(dbLogin[index])
                                alert(`Bem vindo(a), ${dbLogin[index].nome}`)
                            }
                        }
                        if (logou) {
                            setAutenticado(true)
                            redirecionar(`/${perfil}`)
                        } else {
                            alert("Usuário e/ou Senha Incorretos!")
                        }
                    }
                })
                .catch((err) => alert(err))
                .finally(() => {
                    setLoading(false)
                })
        } else {
            alert("Preencha todos os campos.")
        }
    }

    return (
        <div className="container d-flex justify-content-center">
            <section className="card w-50 shadow my-5 text-center d-flex flex-column">
                <h4>Login - {`${perfil}`}</h4>
                <form action="" method="post" className="form" onSubmit={handleSubmit}>
                    <div className="form-row d-flex flex-row align-items-center my-3 container-fluid">
                        <label htmlFor="txtUsuario" className="form-label col-2">Usuário</label>
                        <input type="text" className="form-control" id="txtUsuario" onChange={({ target: { value } }) => setLogin({ ...login, usuario: value })} />
                    </div>
                    <div className="form-row d-flex flex-row align-items-center mb-2 container-fluid">
                        <label htmlFor="pwdSenha" className="form-label col-2">Senha</label>
                        <input type="password" className="form-control" id="pwdSenha" onChange={({ target: { value } }) => setLogin({ ...login, senha: value })} />
                    </div>
                    <div className="container d-flex flex-row justify-content-around">
                        <input type="submit" className="btn btn-primary mb-3" value="Acessar" />
                        {perfil === 'cliente' && <Link to="/cliente/new" className="btn btn-secondary mb-3">Novo Usuário</Link>}
                        <Link to="/" className="btn btn-danger mb-3">Voltar</Link>
                    </div>
                </form>
                {loading && <div className="container">Carregando ...</div>}
            </section>
        </div>
    )
}


export default Login
import { useState } from "react"
import { Link, Outlet } from "react-router-dom"
import Context from "../context"
import logo from '../img/suporte.png'


const Layout = () => {

    const [autenticado, setAutenticado] = useState(false)
    const [user, setUser] = useState({})

    return (
        <Context.Provider
            value={{
                user, setUser,
                autenticado, setAutenticado
            }}
        >

            <div className="d-flex flex-column vh-100" style={{ flex: 1 }}>

                <header>
                    <div className="container">
                        <nav className="navbar bg-light navbar-expand-lg">
                            <div className="container-fluid">
                                <Link className="navbar-brand" to='/'>
                                    <img src={logo} style={{width:"110px", margin: "-35px 0"}} alt="Logo Suporte" />
                                </Link>
                            </div>
                        </nav>
                    </div>
                </header>

                <main>
                    <div className="container">
                        <Outlet />
                    </div>
                </main>
                <footer className="mt-5">
                    <div className="container text-center" >
                        <p style={{margin: 0}}>Desenvolvido na Disciplina de Desenvolvimento Web</p>
                        <p style={{margin: 0}}>Thiago Lima de Oliveira</p>
                        <p style={{margin: 0}}>&copy; 2022 - Estacio</p>
                    </div>
                </footer>
            </div>
        </Context.Provider>
    )
}

export default Layout
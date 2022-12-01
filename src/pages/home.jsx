import { Link } from "react-router-dom"
import suporte from '../img/suporte-tecnico.png'
import cliente from '../img/cliente.png'

const Home = () => {

    return (
        <div className="container mt-5">
            <div className="card shadow">
                <div className="card-header text-center">
                    <h2>Login | Ticket-Suporte</h2>
                </div>
                <div className="card-body">
                    <table className="container">
                        <tbody className="text-center">
                            <tr>
                                <td>Escolha o seu perfil</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr className="d-flex justify-content-around">
                                <td>
                                    <Link className="btn btn-light" to='/login/cliente'><img src={cliente} style={{width: "40px"}}/> Cliente</Link>
                                </td>
                                <td>
                                    <Link className="btn btn-light" to='/login/suporte'><img src={suporte} style={{width: "40px"}}/> Suporte</Link>
                                    
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Home
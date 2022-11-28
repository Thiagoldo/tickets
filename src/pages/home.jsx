import { Link } from "react-router-dom"

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
                                    <Link className="btn btn-primary" to='/login/cliente'>Cliente</Link>
                                </td>
                                <td>
                                    <Link className="btn btn-primary" to='/login/suporte'>Suporte</Link>
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
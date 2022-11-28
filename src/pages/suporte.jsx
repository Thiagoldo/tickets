import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { FIREBASE_URL } from '../constants'
import Context from "../context"

function SuporteLogado() {
    const { autenticado, setAutenticado, user, setUser } = useContext(Context)
    const [tickets, setTickets] = useState([]);
    const redirecionar = useNavigate()
    
    function BuscarTickets() {
        if (autenticado) {
            axios
                .get(`${FIREBASE_URL}/tickets.json`)
                .then(({ data, status }) => {
                    if (status === 200) {
                        const retorno = Object.entries(data).map(([key, value]) => { return { ...value, key: key } })
                        setTickets(retorno.reverse())
                    } else {
                        setTickets([])
                    }
                })
                .catch((err) => alert(err))
        } else {
            redirecionar('/suporte')
        }
    }

    function Loggout() {
        setAutenticado(false)
        setUser({})
        alert(`Volte sempre, ${user.nome}`)
        redirecionar('/')
    }

    useEffect(() => BuscarTickets, [])

    return (
        <div>
            {autenticado &&
                <h1>Bem vindo, {`${user.nome}`}</h1>
            }
            <div className="container">

                <section>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Assunto</th>
                                <th>Data de Abertura</th>
                                <th>Data de Conclusao</th>
                                <th>Operador</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map((el, ix) => {
                                if (el.status === "Em aberto") {
                                    return (
                                        <tr key={ix}>
                                            <td><Link className='text-danger' to={`/suporte/${el.key}`}>{el.id}</Link></td>
                                            <td><Link className='text-danger' to={`/suporte/${el.key}`}>{el.assunto}</Link></td>
                                            <td><Link className='text-danger' to={`/suporte/${el.key}`}>{el.dtAbertura}</Link></td>
                                            <td><Link className='text-danger' to={`/suporte/${el.key}`}>{el.dtConclusao}</Link></td>
                                            <td><Link className='text-danger' to={`/suporte/${el.key}`}>{el.operador}</Link></td>
                                            <td><Link className='text-danger' to={`/suporte/${el.key}`}>{el.status}</Link></td>
                                        </tr>
                                    )
                                } else if (el.status === "Concluído") {
                                    return (
                                        <tr key={ix}>
                                            <td><Link className='text-success' to={`/suporte/${el.key}`}>{el.id}</Link></td>
                                            <td><Link className='text-success' to={`/suporte/${el.key}`}>{el.assunto}</Link></td>
                                            <td><Link className='text-success' to={`/suporte/${el.key}`}>{el.dtAbertura}</Link></td>
                                            <td><Link className='text-success' to={`/suporte/${el.key}`}>{el.dtConclusao}</Link></td>
                                            <td><Link className='text-success' to={`/suporte/${el.key}`}>{el.operador}</Link></td>
                                            <td><Link className='text-success' to={`/suporte/${el.key}`}>{el.status}</Link></td>
                                        </tr>
                                    )
                                } else {
                                    return (
                                        <tr key={ix}>
                                            <td><Link className='text-secondary' to={`/suporte/${el.key}`}>{el.id}</Link></td>
                                            <td><Link className='text-secondary' to={`/suporte/${el.key}`}>{el.assunto}</Link></td>
                                            <td><Link className='text-secondary' to={`/suporte/${el.key}`}>{el.dtAbertura}</Link></td>
                                            <td><Link className='text-secondary' to={`/suporte/${el.key}`}>{el.dtConclusao}</Link></td>
                                            <td><Link className='text-secondary' to={`/suporte/${el.key}`}>{el.operador}</Link></td>
                                            <td><Link className='text-secondary' to={`/suporte/${el.key}`}>{el.status}</Link></td>
                                        </tr>
                                    )
                                }
                            })
                            }
                        </tbody>
                    </table>
                </section>
                <section className='container d-flex justify-content-around'>
                    <button className='btn btn-secondary mt-3' onClick={BuscarTickets} >Atualizar</button>
                    <button onClick={Loggout} className="btn btn-danger mt-3">Sair</button>
                </section>
            </div>
        </div>
    )
}

function SuporteTickets() {
    const { key } = useParams();
    const { autenticado, user } = useContext(Context);
    const [ticket, setTicket] = useState({});
    const [fim, setFim] = useState();
    const redirecionar = useNavigate()
    
    useEffect(() => {
        if (key) {
            setFim(false)
            axios
                .get(`${FIREBASE_URL}/tickets/${key}.json`)
                .then(({ data }) => { setTicket(data) })
                .catch((err) => alert(err))
        }
    }, [])
    
    function ConcluirTicket(){
        let time = new Date();
        let agora = time.toLocaleString();
        setTicket({...ticket, operador: user.usuario, status: "Concluído", dtConclusao: agora});
        setFim(true)
    };

    useEffect(() => {
        if (fim){
            axios
                .put(`${FIREBASE_URL}/tickets/${key}.json`, ticket)
                .then(() => {
                    alert("Alterado com sucesso!")
                    redirecionar('/suporte')
                })
                .catch((err) => alert(err))
        }
    }, [fim])

    return (
        <div className='container'>
            {autenticado &&
                <h1>Suporte: {`${user.usuario}`}</h1>
            }
            <div className="container">
                <nav className='my-3 navbar bg-light container-fluid'>
                    <table>
                        <thead>
                            <tr>
                                <td className='navbar-brand'>Ticket - {`${ticket.assunto}`}</td>
                            </tr>
                        </thead>
                    </table>
                </nav>


                <section>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Usuário</th>
                                <th>Status</th>
                                <th>Data de Abertura</th>
                                <th>Data de Conclusao</th>
                                <th>Operador</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{ticket.id}</td>
                                <td>{ticket.usuario}</td>
                                <td>{ticket.status}</td>
                                <td>{ticket.dtAbertura}</td>
                                <td>{ticket.dtConclusao}</td>
                                <td>{ticket.operador}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section>
                    <label className="form-label" htmlFor="txtDescricao">Descrição do Ticket</label>
                    <textarea className='form-control' id="textDescricao" rows={5} value={`${ticket.descricao}`} />
                    <label className="form-label" htmlFor="txtResposta">Resposta do Operador</label>
                    {
                        ticket.status === "Em aberto" ?
                        <textarea className='form-control' id="txtResposta" rows={5} value={`${ticket.resposta}`} onChange={({target: {value}}) => { setTicket({...ticket, resposta: value, operador:user.usuario}) }} /> :
                        <textarea className='form-control' id="txtResposta" rows={5} value={`${ticket.resposta}`} />
                    }
                </section>
                <section className='container d-flex justify-content-between'>
                    {
                        ticket.status === "Em aberto" &&
                        <button onClick={() => ConcluirTicket()} className="btn btn-success mt-3">Concluir</button>
                    }
                    {
                        ticket.status === "Em aberto" &&
                        <button onClick={() => setFim(true)} className="btn btn-secondary mt-3">Alterar</button>
                    }
                    <Link to="/suporte" className="btn btn-danger mt-3">Voltar</Link>
                </section>
            </div>
        </div>
    )
}

export { SuporteLogado, SuporteTickets }
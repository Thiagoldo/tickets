import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { FIREBASE_URL } from '../constants'
import Context from "../context"

function Suporte() {
    const { setAutenticado, setUser } = useContext(Context)
    const [suporte, setSuporte] = useState({})
    const [dbSuporte, setDbSuporte] = useState([])
    const [loading, setLoading] = useState(false)
    const redirecionar = useNavigate()
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        axios
            .get(`${FIREBASE_URL}/suporte.json`)
            .then(({ data, status }) => {
                if (status === 200) {
                    const retorno = Object
                        .entries(data)
                        .map(([key, value]) => {return value})
                    setDbSuporte(retorno)
                }
            })
            .catch((err) => alert(err))
            .finally(() => {
                setLoading(false)
            })

    }

    useEffect(() => {
        for (let index = 0; index < dbSuporte.length; index++) {
            if (dbSuporte[index].usuario === suporte.usuario && dbSuporte[index].senha === suporte.senha) {
                setUser(dbSuporte[index])
                setAutenticado(true)
                alert(`Bem vindo(a), ${dbSuporte[index].nome}`)
                redirecionar('/suporte/autenticado')
            }
        }
    }, [dbSuporte])

    return (
        <div className="container d-flex justify-content-center">
            <section className="card w-50 shadow my-5 text-center d-flex flex-column">
                <h4>Login - Suporte</h4>
                <form action="" method="post" className="form" onSubmit={handleSubmit}>
                    <div className="form-row d-flex flex-row align-items-center my-3 container-fluid">
                        <label htmlFor="txtUsuario" className="form-label col-2">Usuário</label>
                        <input type="text" className="form-control" id="txtUsuario" onChange={({ target: { value } }) => setSuporte({ ...suporte, usuario: value })} />
                    </div>
                    <div className="form-row d-flex flex-row align-items-center mb-2 container-fluid">
                        <label htmlFor="pwdSenha" className="form-label col-2">Senha</label>
                        <input type="password" className="form-control" id="pwdSenha" onChange={({ target: { value } }) => setSuporte({ ...suporte, senha: value })} />
                    </div>
                    <div className="container d-flex flex-row justify-content-around">
                        <input type="submit" className="btn btn-primary mb-3" value="Acessar" />
                        <Link to="/" className="btn btn-danger mb-3">Voltar</Link>
                    </div>
                </form>
                {loading && <div className="container">Carregando ...</div>}

            </section>
        </div>
    )
}

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
        redirecionar('/suporte')
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
                                            <td><Link className='text-danger' to={`/suporte/autenticado/${el.key}`}>{el.id}</Link></td>
                                            <td><Link className='text-danger' to={`/suporte/autenticado/${el.key}`}>{el.assunto}</Link></td>
                                            <td><Link className='text-danger' to={`/suporte/autenticado/${el.key}`}>{el.dtAbertura}</Link></td>
                                            <td><Link className='text-danger' to={`/suporte/autenticado/${el.key}`}>{el.dtConclusao}</Link></td>
                                            <td><Link className='text-danger' to={`/suporte/autenticado/${el.key}`}>{el.operador}</Link></td>
                                            <td><Link className='text-danger' to={`/suporte/autenticado/${el.key}`}>{el.status}</Link></td>
                                        </tr>
                                    )
                                } else if (el.status === "Concluído") {
                                    return (
                                        <tr key={ix}>
                                            <td><Link className='text-success' to={`/suporte/autenticado/${el.key}`}>{el.id}</Link></td>
                                            <td><Link className='text-success' to={`/suporte/autenticado/${el.key}`}>{el.assunto}</Link></td>
                                            <td><Link className='text-success' to={`/suporte/autenticado/${el.key}`}>{el.dtAbertura}</Link></td>
                                            <td><Link className='text-success' to={`/suporte/autenticado/${el.key}`}>{el.dtConclusao}</Link></td>
                                            <td><Link className='text-success' to={`/suporte/autenticado/${el.key}`}>{el.operador}</Link></td>
                                            <td><Link className='text-success' to={`/suporte/autenticado/${el.key}`}>{el.status}</Link></td>
                                        </tr>
                                    )
                                } else {
                                    return (
                                        <tr key={ix}>
                                            <td><Link className='text-secondary' to={`/suporte/autenticado/${el.key}`}>{el.id}</Link></td>
                                            <td><Link className='text-secondary' to={`/suporte/autenticado/${el.key}`}>{el.assunto}</Link></td>
                                            <td><Link className='text-secondary' to={`/suporte/autenticado/${el.key}`}>{el.dtAbertura}</Link></td>
                                            <td><Link className='text-secondary' to={`/suporte/autenticado/${el.key}`}>{el.dtConclusao}</Link></td>
                                            <td><Link className='text-secondary' to={`/suporte/autenticado/${el.key}`}>{el.operador}</Link></td>
                                            <td><Link className='text-secondary' to={`/suporte/autenticado/${el.key}`}>{el.status}</Link></td>
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
                    redirecionar('/suporte/autenticado')
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
                    <Link to="/suporte/autenticado" className="btn btn-danger mt-3">Voltar</Link>
                </section>
            </div>
        </div>
    )
}

export { Suporte, SuporteLogado, SuporteTickets }
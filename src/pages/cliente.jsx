import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { FIREBASE_URL } from '../constants'
import Context from "../context"

function NovoCliente() {
    const [cliente, setCliente] = useState()
    const [loading, setLoading] = useState(false)
    const [novoUsuario, setNovoUsuario] = useState()
    const [dbUsuarios, setDbUsuarios] = useState()
    const redirecionar = useNavigate()

    useEffect(() => {
        setNovoUsuario(true)
        axios
            .get(`${FIREBASE_URL}/cliente.json`)
            .then(({ data, status }) => {
                if (status === 200) {
                    const retorno = Object.entries(data).map(([key, value]) => {return value})
                    setDbUsuarios(retorno)
                    setCliente({...cliente, id: retorno.length+1})
                }
            })
            .catch((err) => alert(err))
    }, [])

    useEffect(() => {
        if (dbUsuarios){
            let tamanho = dbUsuarios.length
            let contador = 0
            for (let index = 0; index < tamanho; index++) {
                if (dbUsuarios[index].usuario === cliente.usuario) {
                    contador++
                }
            }
            if (contador){
                setNovoUsuario(false)
            } else {
                setNovoUsuario(true)
            }
        }
    }, [cliente])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        if (!novoUsuario) {
            alert("Usuário já existe.")
            setLoading(false)
        } else if (cliente.usuario && cliente.senha && cliente.nome) {
            axios
            .post(`${FIREBASE_URL}/cliente.json`, cliente)
            .then(() => {
                alert(`Cadastro bem sucedido.`)
                redirecionar('/cliente')
            })
            .catch((err) => alert(err))
            .finally(() => {
                setLoading(false)
            })
        } else {
            alert("Preencha todos os campos do formulário.")
        }
    }

    return (
        <div className="container d-flex justify-content-center">
            <section className="card w-50 shadow my-5 text-center d-flex flex-column">
                <h4>Novo Cadastro</h4>
                <form action="" method="post" className="form" onSubmit={handleSubmit}>
                    <div className="form-row d-flex flex-row align-items-center my-3 container-fluid">
                        <label htmlFor="txtNome" className="form-label col-2">Nome</label>
                        <input type="text" className="form-control" id="txtNome" placeholder="Digite seu nome" onChange={({ target: { value } }) => setCliente({ ...cliente, nome: value })} />
                    </div>
                    <div className="form-row d-flex flex-row align-items-center my-3 container-fluid">
                        <label htmlFor="txtUsuario" className="form-label col-2">Usuário</label>
                        <input type="text" className="form-control" id="txtUsuario" placeholder="Digite seu usuário" onChange={({ target: { value } }) => setCliente({ ...cliente, usuario: value })} />
                    </div>
                    <div className="form-row d-flex flex-row align-items-center mb-2 container-fluid">
                        <label htmlFor="pwdSenha" className="form-label col-2">Senha</label>
                        <input type="password" className="form-control" id="pwdSenha" placeholder="Digite sua senha" onChange={({ target: { value } }) => setCliente({ ...cliente, senha: value })} />
                    </div>
                    <div className="container d-flex flex-row justify-content-around">
                        <input type="submit" className="btn btn-dark mb-3" value="Cadastrar" />
                        <Link to="/cliente" className="btn btn-danger mb-3">Voltar</Link>
                    </div>
                </form>
                {loading && <div className="container">Carregando ...</div>}
            </section>
        </div>
    )
}

function ClienteLogado() {
    const { autenticado, setAutenticado, user, setUser } = useContext(Context);
    const [tickets, setTickets] = useState([]);
    const redirecionar = useNavigate();

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
            redirecionar('/cliente')
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
        <div className='container'>
            {autenticado &&
                <h2>Bem vindo, {`${user.nome}`}</h2>
            }
            <div className="container">
                <nav className='my-3 navbar container-fluid'>
                    <table>
                        <thead>
                            <tr>
                                <td><Link to={`/cliente/newticket`} className='btn btn-light'>Novo Ticket</Link></td>
                                <td></td>
                            </tr>
                        </thead>
                    </table>
                </nav>

                <section>
                    <table className="table table-sm table-striped table-hover">
                        <thead className="">
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
                                if (el.usuario === user.usuario) {
                                    if (el.status === "Em aberto") {
                                        return (
                                            <tr className="bg-light" key={ix}>
                                                <td><Link className='text-dark' to={`/cliente/${el.key}`}>{el.id}</Link></td>
                                                <td><Link className='text-dark' to={`/cliente/${el.key}`}>{el.assunto}</Link></td>
                                                <td><Link className='text-dark' to={`/cliente/${el.key}`}>{el.dtAbertura}</Link></td>
                                                <td><Link className='text-dark' to={`/cliente/${el.key}`}>{el.dtConclusao}</Link></td>
                                                <td><Link className='text-dark' to={`/cliente/${el.key}`}>{el.operador}</Link></td>
                                                <td><Link className='text-dark' to={`/cliente/${el.key}`}>{el.status}</Link></td>
                                            </tr>
                                        )

                                    } else if (el.status === "Concluído") {
                                        return (
                                            <tr className="bg-secondary" key={ix}>
                                                <td><Link className='text-dark' to={`/cliente/${el.key}`}>{el.id}</Link></td>
                                                <td><Link className='text-dark' to={`/cliente/${el.key}`}>{el.assunto}</Link></td>
                                                <td><Link className='text-dark' to={`/cliente/${el.key}`}>{el.dtAbertura}</Link></td>
                                                <td><Link className='text-dark' to={`/cliente/${el.key}`}>{el.dtConclusao}</Link></td>
                                                <td><Link className='text-dark' to={`/cliente/${el.key}`}>{el.operador}</Link></td>
                                                <td><Link className='text-dark' to={`/cliente/${el.key}`}>{el.status}</Link></td>
                                            </tr>
                                        )

                                    }
                                }
                            })
                            }
                        </tbody>
                    </table>
                </section>
                <section className='container d-flex justify-content-around'>
                    <button className='btn btn-dark mt-3' onClick={BuscarTickets} >Atualizar</button>
                    <button onClick={Loggout} className="btn btn-danger mt-3">Sair</button>
                </section>
            </div>
        </div>
    )
}

function NovoTicket() {
    const { user } = useContext(Context)
    const [ticket, setTicket] = useState({});
    const redirecionar = useNavigate()
    const defaultTicket = {
        id: "",
        usuario: "",
        status: "",
        dtAbertura: "",
        dtConclusao: "",
        assunto: "",
        descricao: "",
        operador: "",
        resposta: ""
    }

    function handleSubmitForm(e) {
        e.preventDefault()
        axios
            .post(`${FIREBASE_URL}/tickets.json`, ticket)
            .then(() => {
                alert(`Ticket criado. ID: ${ticket.id}`)
                setTicket(defaultTicket)
                redirecionar(`/cliente`)
            })
            .catch((err) => alert(err))
    }

    useEffect(() => {
        axios
            .get(`${FIREBASE_URL}/tickets.json`)
            .then(({ data, status }) => {
                if (status === 200) {
                    const d = Object.entries(data)
                    let time = new Date();
                    let agora = time.toLocaleString();
                    setTicket({
                        ...ticket,
                        id: d.length+1,
                        usuario: user.usuario,
                        status: "Em aberto",
                        dtConclusao: "",
                        assunto: "",
                        descricao: "",
                        operador: "",
                        resposta: "",
                        dtAbertura: agora
                    })
                }
            })
            .catch((err) => alert(err))
    }, [])

    return (
        <div className="container">
            <section>
                <h5 className='mt-2'>Novo Cadastro</h5>
                <form method="post" onSubmit={handleSubmitForm} >
                    <div className="form-row d-flex flex-row align-items-center my-3 container-fluid">
                        <label htmlFor="txtAssunto" className="form-label col-2">Assunto</label>
                        <input type="text" className="form-control" id="txtAssunto" onChange={({ target: { value } }) => setTicket({ ...ticket, assunto: value })} />
                    </div>
                    <div className="form-row d-flex flex-row align-items-center my-3 container-fluid">
                        <label htmlFor="txtDescricao" className="form-label col-2">Descriçao</label>
                        <textarea rows={5} className="form-control" id="txtDescricao" onChange={({ target: { value } }) => setTicket({ ...ticket, descricao: value })} />
                    </div>
                    <div className="container d-flex flex-row justify-content-around">
                        <input type="submit" className="btn btn-dark mb-3" value="Cadastrar" />
                        <Link to={`/cliente`} className="btn btn-danger mb-3">Voltar</Link>
                    </div>
                </form>
            </section>
        </div>
    )
}

function ClienteTickets() {
    const { autenticado, user } = useContext(Context)
    const [ticket, setTicket] = useState({})
    const { key } = useParams()

    useEffect(() => {
        if (key) {
            axios
                .get(`${FIREBASE_URL}/tickets/${key}.json`)
                .then(({ data }) => { setTicket(data) })
                .catch((err) => alert(err))
        }
    }, [key])

    return (
        <div className='container'>
            {autenticado &&
                <h1>Cliente: {`${user.nome}`}</h1>
            }
            <div className="container">
                <nav className='my-3 navbar bg-light container-fluid'>
                    <table>
                        <thead>
                            <tr>
                                <td className='navbar-brand'>Assunto: {`${ticket.assunto}`}</td>
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
                    <textarea className='form-control' id="txtResposta" rows={5} value={`${ticket.resposta}`} />
                </section>
                <section className='container d-flex justify-content-center'>
                    <Link to={`/cliente`} className="btn btn-danger mt-3">Voltar</Link>
                </section>
            </div>
        </div>
    )
}

export { NovoCliente, ClienteLogado, NovoTicket, ClienteTickets }
import { useContext } from 'react'
import Context from '../../../../context'

const ClienteLogado = () => {
    const {clienteAutenticado} = useContext(Context)

    return (
        <div>
            {clienteAutenticado &&
                <h1>Autenticado</h1>
            }
        </div>
    )
}

export default ClienteLogado
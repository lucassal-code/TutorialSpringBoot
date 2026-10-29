import { useEffect, useState } from 'react'

function App() {
  const [mercadorias, setMercadorias] = useState([])
  const [erro, setErro] = useState('')

  useEffect(() => {
    fetch('/api/mercadorias')
      .then(resposta => {
        if (!resposta.ok) {
          throw new Error('Falha na consulta')
        }
        return resposta.json()
      })
    .then(dados => setMercadorias(dados))
    .catch(() => setErro('Nao foi possivel carregar as mercadorias'))
  }, [])

  return (
  <main>
    <h1>Estoque de mercadorias</h1>
    {erro && <p>{erro}</p>}

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Preco</th>
        </tr>
      </thead>
      <tbody>
        {mercadorias.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.nome}</td>
            <td>
              {item.preco.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </main>
  )
}
export default App
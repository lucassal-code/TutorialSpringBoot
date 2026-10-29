import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarFornecedores } from "../services/fornecedorService";
import "../styles/fornecedores.css";

export default function FornecedorLista() {
  const [fornecedores, setFornecedores] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarFornecedores() {
      try {
        const dados = await listarFornecedores();
        setFornecedores(dados);
      } catch (error) {
        setErro(
          error.message || "Não foi possível carregar os fornecedores."
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarFornecedores();
  }, []);

  return (
    <main className="container">
      <header className="cabecalho-pagina">
        <div>
          <h1>Fornecedores</h1>
          <p>Consulte os fornecedores cadastrados.</p>
        </div>

        <div className="acoes-cabecalho">
          <Link to="/" className="botao botao-secundario">
            Início
          </Link>

          <Link to="/fornecedores/novo" className="botao botao-primario">
            + Novo fornecedor
          </Link>
        </div>
      </header>

      {carregando && <p>Carregando fornecedores...</p>}

      {erro && <p className="mensagem erro">{erro}</p>}

      {!carregando && !erro && fornecedores.length === 0 && (
        <section className="vazio">
          <h2>Nenhum fornecedor cadastrado</h2>
          <p>Cadastre o primeiro fornecedor para começar.</p>
          <Link to="/fornecedores/novo" className="botao botao-primario">
            Cadastrar fornecedor
          </Link>
        </section>
      )}

      {!carregando && !erro && fornecedores.length > 0 && (
        <div className="tabela-container">
          <table className="tabela-fornecedores">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome fantasia</th>
                <th>Razão social</th>
                <th>CNPJ</th>
                <th>Telefone</th>
                <th>E-mail</th>
                <th>Cidade</th>
                <th>UF</th>
                <th>Data de cadastro</th>
              </tr>
            </thead>

            <tbody>
              {fornecedores.map((fornecedor) => (
                <tr key={fornecedor.idFornecedor}>
                  <td>{fornecedor.idFornecedor}</td>
                  <td>{fornecedor.nomeFantasia}</td>
                  <td>{fornecedor.razaoSocial}</td>
                  <td>{fornecedor.cnpj}</td>
                  <td>{fornecedor.telefone}</td>
                  <td>{fornecedor.email}</td>
                  <td>{fornecedor.cidade}</td>
                  <td>{fornecedor.estado}</td>
                  <td>
                    {fornecedor.dataCadastro
                      ? new Date(
                          fornecedor.dataCadastro
                        ).toLocaleString("pt-BR")
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
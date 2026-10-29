import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cadastrarFornecedor } from "../services/fornecedorService";
import "../styles/fornecedores.css";

const formularioInicial = {
  nomeFantasia: "",
  razaoSocial: "",
  cnpj: "",
  telefone: "",
  email: "",
  cidade: "",
  estado: "",
};

export default function FornecedorCadastro() {
  const [fornecedor, setFornecedor] = useState(formularioInicial);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [salvando, setSalvando] = useState(false);

  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;

    setFornecedor((anterior) => ({
      ...anterior,
      [name]: name === "estado" ? value.toUpperCase() : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setErro("");
    setSucesso("");
    setSalvando(true);

    try {
      const dados = {
        ...fornecedor,
        estado: fornecedor.estado.trim().toUpperCase(),
      };

      await cadastrarFornecedor(dados);

      setSucesso("Fornecedor cadastrado com sucesso!");
      setFornecedor(formularioInicial);

      // Aguarda um breve momento para exibir a confirmação.
      // O redirecionamento pode ser feito imediatamente, se preferir.
      navigate("/fornecedores");
    } catch (error) {
      setErro(error.message || "Não foi possível cadastrar o fornecedor.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <main className="container">
      <header className="cabecalho-pagina">
        <div>
          <h1>Cadastrar fornecedor</h1>
          <p>Preencha os dados abaixo.</p>
        </div>

        <Link to="/" className="botao botao-secundario">
          Página inicial
        </Link>
      </header>

      <form className="formulario" onSubmit={handleSubmit}>
        <div className="campo">
          <label htmlFor="nomeFantasia">Nome fantasia</label>
          <input
            id="nomeFantasia"
            name="nomeFantasia"
            value={fornecedor.nomeFantasia}
            onChange={handleChange}
            maxLength={100}
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="razaoSocial">Razão social</label>
          <input
            id="razaoSocial"
            name="razaoSocial"
            value={fornecedor.razaoSocial}
            onChange={handleChange}
            maxLength={150}
            required
          />
        </div>

        <div className="grade-campos">
          <div className="campo">
            <label htmlFor="cnpj">CNPJ</label>
            <input
              id="cnpj"
              name="cnpj"
              value={fornecedor.cnpj}
              onChange={handleChange}
              maxLength={18}
              placeholder="00.000.000/0000-00"
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="telefone">Telefone</label>
            <input
              id="telefone"
              name="telefone"
              value={fornecedor.telefone}
              onChange={handleChange}
              maxLength={15}
              placeholder="(31) 3333-4444"
            />
          </div>
        </div>

        <div className="campo">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            value={fornecedor.email}
            onChange={handleChange}
            maxLength={100}
          />
        </div>

        <div className="grade-campos">
          <div className="campo">
            <label htmlFor="cidade">Cidade</label>
            <input
              id="cidade"
              name="cidade"
              value={fornecedor.cidade}
              onChange={handleChange}
              maxLength={50}
            />
          </div>

          <div className="campo">
            <label htmlFor="estado">Estado (UF)</label>
            <input
              id="estado"
              name="estado"
              value={fornecedor.estado}
              onChange={handleChange}
              maxLength={2}
              minLength={2}
              pattern="[A-Za-z]{2}"
              title="Informe a sigla do estado com duas letras."
              placeholder="MG"
            />
          </div>
        </div>

        {erro && <p className="mensagem erro">{erro}</p>}
        {sucesso && <p className="mensagem sucesso">{sucesso}</p>}

        <div className="acoes">
          <button
            type="submit"
            className="botao botao-primario"
            disabled={salvando}
          >
            {salvando ? "Salvando..." : "Salvar fornecedor"}
          </button>

          <Link to="/fornecedores" className="botao botao-secundario">
            Cancelar
          </Link>
        </div>
      </form>
    </main>
  );
}
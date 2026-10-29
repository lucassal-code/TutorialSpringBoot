import { Link } from "react-router-dom";
import "../styles/fornecedores.css";
export default function Home() {
  return (
    <main className="container">
      <header className="topo">
        <h1>ControleMerc</h1>
        <p>Listagem e Cadastro de fornecedores</p>
      </header>
      <section className="menu-principal">
        <Link to="/fornecedores" className="card-menu">
          <h2>Listagem de fornecedores</h2>
          <p>Consultar os fornecedores cadastrados no sistema.</p>
          <span className="link-texto">Acessar listagem →</span>
        </Link>
        <Link to="/fornecedores/novo" className="card-menu">
          <h2>Cadastrar fornecedor</h2>
          <p>Adicionar um novo fornecedor ao sistema.</p>
          <span className="link-texto">Novo cadastro →</span>
        </Link>
      </section>
    </main>
  );
}
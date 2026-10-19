import { useState } from "react";
import Cadastro from "./Cadastro";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mostrarCadastro, setMostrarCadastro] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setErro("");

    // Validação do usuário
    if (!usuario.trim()) {
      setErro("Digite seu usuário.");
      return;
    }

    // validação da senha
    if (!senha) {
      setErro("Digite sua senha.");
      return;
    }

    if (!/^\d+$/.test(senha)) {
      setErro("A senha deve conter apenas números.");
      return;
    }

    if (senha.length < 6 || senha.length > 8) {
      setErro("A senha deve ter entre 6 e 8 números.");
      return;
    }

    try {
      setCarregando(true);

      const resposta = await fetch("INSIRA_A_URL_DA_API_AQUI", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          usuario: usuario,
          senha: senha,
        }),
      });

      /*
        RESPOSTA DA API

        Ajuste conforme o formato definido
        pelo backend.
      */

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(resultado.mensagem || "Usuário ou senha incorretos.");
      }

      // Login realizado com sucesso
      console.log("Login realizado com sucesso!");

      /*
        Aqui poderá ser feito o redirecionamento
        para a próxima tela após a integração
        com o sistema de rotas.
      */
    } catch (error) {
      setErro(error.message || "Não foi possível realizar o login.");
    } finally {
      setCarregando(false);
    }
  };

 
return (
  <main className="min-h-screen bg-[var(--color-light-purple)] flex items-center justify-center p-5">
    <div className="relative w-full max-w-[900px] h-[600px] bg-[var(--color-off-white)] rounded-[30px] overflow-hidden shadow-[0_20px_45px_rgba(71,25,109,0.25)]">

      {/* Formulário de login */}
      <section
        className={`absolute top-0 left-0 w-1/2 h-full flex items-center justify-center p-10 transition-all duration-700 ${
          mostrarCadastro
            ? "translate-x-full opacity-0 pointer-events-none"
            : "translate-x-0 opacity-100"
        }`}
      >
        <form
          onSubmit={handleLogin}
          className="w-full max-w-[350px] flex flex-col items-center"
        >
          <h1 className="text-[34px] font-bold text-[var(--color-dark-purple)] mb-5">
            Entrar
          </h1>

          <p className="text-[13px] text-[var(--color-dark-purple)] mb-6">
            Entre com seu usuário e senha
          </p>

          <input
            type="text"
            placeholder="Usuário"
            value={usuario}
            onChange={(e) => {
              setUsuario(e.target.value);
              setErro("");
            }}
            disabled={carregando}
            autoComplete="username"
            required
            className="w-full h-[46px] bg-[#e4e2e5] rounded-[7px] px-[15px] mb-3 text-[14px] text-[var(--color-dark-purple)] outline-none focus:ring-2 focus:ring-[var(--color-light-purple)]"
          />

          <input
            type="password"
            placeholder="Senha (6 a 8 números)"
            value={senha}
            onChange={(e) => {
              const valor = e.target.value;
              if (/^\d{0,8}$/.test(valor)) {
                setSenha(valor);
                setErro("");
              }
            }}
            maxLength={8}
            inputMode="numeric"
            disabled={carregando}
            autoComplete="current-password"
            required
            className="w-full h-[46px] bg-[#e4e2e5] rounded-[7px] px-[15px] mb-3 text-[14px] text-[var(--color-dark-purple)] outline-none focus:ring-2 focus:ring-[var(--color-light-purple)]"
          />

          {erro && (
            <p role="alert" className="w-full text-center text-sm text-red-700 mb-2">
              {erro}
            </p>
          )}

          <button
            type="submit"
            disabled={carregando}
            className="w-[125px] h-[42px] mt-4 rounded-[7px] bg-[var(--color-digital-orange)] text-[var(--color-off-white)] text-[13px] font-bold uppercase transition duration-200 hover:scale-105 disabled:opacity-60"
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </section>

      {/* Formulário de cadastro */}
      <section
        className={`absolute top-0 right-0 w-1/2 h-full flex items-center justify-center p-8 transition-all duration-700 ${
          mostrarCadastro
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        <Cadastro />
      </section>

      {/* Painel roxo deslizante */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full z-10 bg-[var(--color-dark-purple)] text-[var(--color-off-white)] flex items-center justify-center p-10 transition-transform duration-700 ease-in-out ${
          mostrarCadastro ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="max-w-[360px] text-center">
          <h1 className="text-[34px] font-bold mb-5">
            {mostrarCadastro ? "Bem-vinda de volta!" : "Crie sua conta!"}
          </h1>

          <p className="text-[14px] leading-relaxed text-[var(--color-light-purple)] mb-7">
            {mostrarCadastro
              ? "Já tem uma conta? Entre para continuar respondendo aos quizzes e acompanhando seu desempenho."
              : "Cadastre-se para acessar o QuizMaster, responder aos quizzes e acompanhar seu desempenho."}
          </p>

          <button
            type="button"
            onClick={() => {
              setMostrarCadastro(!mostrarCadastro);
              setErro("");
            }}
            className="w-[145px] h-[42px] border-2 border-[var(--color-off-white)] rounded-[7px] bg-transparent text-[12px] font-bold uppercase cursor-pointer transition duration-200 hover:bg-[var(--color-off-white)] hover:text-[var(--color-dark-purple)]"
          >
            {mostrarCadastro ? "Entrar" : "Cadastrar-se"}
          </button>
        </div>
      </div>

    </div>
  </main>
);
}

export default Login;

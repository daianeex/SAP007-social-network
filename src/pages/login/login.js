import { loginGoogle, userLogin } from '../../lib/auth-firebase.js';

export default () => {
  const containerLogin = document.createElement('div');

  const templateLogin = `
      <form class="logContainer">
      <p class="loginParagraph">Entre na sua conta</p>
      <input type="email" class="input Email" id="inputEmail" placeholder="Insira seu Email" /><br>
      <input type="password" class="input Senha" id="inputSenha" placeholder="Insira sua senha" /><br>
      <a href="" > <p class='reset-password'>Esqueceu sua senha?</p></a><br>
      <p id="message" class="successMessage menssage"></p>
      <br><button class="btn entrar" id="btn-Entrar">Entrar</button><br>
      <button class="btn google" id="buttonGoogle">Entrar com o Google
      </button>
      <p> Não tem conta?
      <a href="#register">Criar</a></p><br>
      </form>
       
    `;
  containerLogin.innerHTML = templateLogin;

  const loginButtonGoogle = containerLogin.querySelector('#buttonGoogle');
  const loginEmail = containerLogin.querySelector('#inputEmail');
  const loginSenha = containerLogin.querySelector('#inputSenha');
  const btnEntrar = containerLogin.querySelector('#btn-Entrar');
  const msgAlert = containerLogin.querySelector('#message');
  const btReset = containerLogin.querySelector('.reset-password');

  loginButtonGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    loginGoogle()
      .then(() => {
        window.location.hash = '#feed';
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        msgAlert.innerHTML = 'Login não deu certo, tente novamente!';
      });
  });

  btnEntrar.addEventListener('click', (e) => {
    e.preventDefault();
    if (loginEmail.value) {
      userLogin(loginEmail.value, loginSenha.value)
        .then(() => {
          window.location.hash = '#feed';
        })
        .catch((error) => {
          const errorCode = error.code;
          let messageError = error.message;

          switch (errorCode) {
            case 'auth/wrong-password':
              messageError = 'Senha errada.';
              msgAlert.innerHTML = messageError;
              break;
            case 'auth/invalid-email':
              messageError = 'Insira um email válido.';
              msgAlert.innerHTML = messageError;
              break;
            case 'auth/user-not-found':
              messageError = 'Usuário não encontrado.';
              msgAlert.innerHTML = messageError;
              break;
            case 'auth/internal-error':
              messageError = 'Insira a senha.';
              msgAlert.innerHTML = messageError;
              break;
            default:
              messageError = 'Erro desconhecido';
              msgAlert.innerHTML = messageError;
          }
        });
    }
  });

  btReset.addEventListener('click', (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-undef
    sendPasswordResetEmail(auth, email)
      .then(() => {
        msgAlert.innerHTML = 'E-mail enviado para recurar senha!';
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        // eslint-disable-next-line default-case, no-undef
        switch (errorCode) {
          case 'auth/invalid-email':
            // eslint-disable-next-line no-undef
            messageError = 'Insira um email válido.';
            // eslint-disable-next-line no-undef
            msgAlert.innerHTML = messageError;
            break;
        }
      });
  });

  return containerLogin;
};

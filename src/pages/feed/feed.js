/* eslint-disable arrow-parens */
/* eslint-disable quote-props */
import '../../lib/config-firebase.js';
import { addPosts, getPost } from '../../lib/config-firestore.js';
import { createCard } from '../../componentes/card.js';
import { auth, userLogout } from '../../lib/auth-firebase.js';

export default () => {
  const containerFeed = document.createElement('div');
  const templateFeed = `
    <section class='feedcontainer'>
    <section class='headerFeed'>
    <button id='btnLogout' type='submit'>Sair</button><br>
    </section>
    <section class='postt'>
    <p class='tituloFeed'>Publique sua teoria &#x1F441</p>
    <input id='titulo' class='inputArea tituloArea' type='text' placeholder='Título' maxlength='90'/><br>
    <input id='postText' class='inputArea' type='text' placeholder='Sua teoria aqui' maxlength='280' /><br>
    <span id='error-message' class='error-writepost'></span>
    <br><button id='btnPost' class='btnStyle tituloArea' type='submit'>Postar</button><br>
    </section>
    <section class='sectionFeedContainer'>
    <section id='sectionNewPost' class='sectionPostClass'></section>
    <section id='sectionPost' class='sectionPostClass'></section>
    </section></section>
    `;

  containerFeed.innerHTML = templateFeed;

  const inputTitulo = containerFeed.querySelector('#titulo');
  const inputPost = containerFeed.querySelector('#postText');
  const postBtn = containerFeed.querySelector('#btnPost');
  const sectionAllPost = containerFeed.querySelector('#sectionPost');
  const sectionNewPost = containerFeed.querySelector('#sectionNewPost');
  const msgAlert = containerFeed.querySelector('#error-message');
  const logout = containerFeed.querySelector('#btnLogout');

  postBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (inputTitulo.value === '' || inputPost.value === '') {
      msgAlert.innerHTML = 'Escreva sua teoria';
    } else {
      // eslint-disable-next-line no-unused-vars
      addPosts(inputTitulo.value, inputPost.value, auth.currentUser.email).then((id) => {
        let titulo = inputTitulo.value;
        let post = inputPost.value;
        const date = new Date().toLocaleString('pt-br');
        const item = {
          userEmail: auth.currentUser.email,
          'titulo': titulo,
          'post': post,
          date,
          likes: [],
        };
        sectionNewPost.appendChild(createCard(item));
        titulo = '';
        post = '';
      });
    }
  });

  const getPosts = async () => {
    const arrayPosts = await getPost();
    // eslint-disable-next-line array-callback-return
    arrayPosts.map(posts => {
      const elemento = createCard(posts);
      sectionAllPost.appendChild(elemento);
    });
  };

  logout.addEventListener('click', (e) => {
    e.preventDefault();
    userLogout().then(() => {
      window.location.hash = '';
    });
  });

  getPosts();
  return containerFeed;
  // eslint-disable-next-line semi
}

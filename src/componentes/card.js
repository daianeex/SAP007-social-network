import { auth } from '../lib/auth-firebase.js';
import { modalEditPost } from './modal.js';
import { modalDeletePost } from './modaldelete.js';
import { like, dislike } from '../lib/config-firestore.js';

export const createCard = (post) => {
  const divCard = document.createElement('div');
  divCard.innerHTML = `
  <section class="divPost">
    <section class="titlePost">${post.titulo}</section><br>   
      <h4 class="post-itens">Autor(a):${post.userEmail} </h4>
    <section id="data${post.id}" class="date">${post.date}
    </section> 
    <section id="postText-${post.id}" class="postText">${post.post}</section>
      <section class="linePost"></section><br>
    <section class="likeContainer containerBtn" id="like">
      <button id="${post.id}" class="like iconBtn">
      <i class="fa-brands fa-gratipay"></i> 
      <label id="contlikes" class="contlikes">${post.likes.length}</label>
      </button>  
      <button class='iconLike iconBtn' id='modal-btn-edit'>
          <i class="fa-solid fa-pencil"></i>
        </button>
        <button id="delete${post.id}" class="iconDelete iconBtn">        
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </section>
      <hr><br>
        </section>
`;
  const btnHeart = divCard.querySelector('.like');
  const contLike = divCard.querySelector('#contlikes');
  const btnEditPost = divCard.querySelector('#modal-btn-edit');

  btnEditPost.addEventListener('click', (e) => {
    e.preventDefault();
    divCard.appendChild(modalEditPost(post, divCard));
  });

  btnHeart.addEventListener('click', () => {
    if (btnHeart.style.color === 'red') {
      dislike(post.id, auth.currentUser.email);
      btnHeart.style.color = 'black';
      const addContLike = Number(contLike.innerHTML) - 1;
      contLike.innerHTML = addContLike;
    } else {
      like(post.id, auth.currentUser.email);
      btnHeart.style.color = 'red';
      const addContLike = Number(contLike.innerHTML) + 1;
      contLike.innerHTML = addContLike;
    }
  });

  const buttonDelete = divCard.querySelector('.iconDelete');
  buttonDelete.addEventListener('click', (e) => {
    e.preventDefault();
    divCard.appendChild(modalDeletePost(post, divCard));
  });

  return divCard;
};

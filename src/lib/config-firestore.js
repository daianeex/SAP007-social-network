import "../lib/config-firebase.js";
import {
    collection,
    addDoc,
    getFirestore,
    getDocs,
    orderBy,
    query,
    doc,
    deleteDoc,
    updateDoc,
    arrayUnion,
    arrayRemove
} from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js';
//import { async } from "regenerator-runtime";

const db = getFirestore();

export async function addPosts(inputTitulo, inputPost, userEmail) {
    try {
        const ref = await addDoc(collection(db, 'posts'), {
            "titulo":inputTitulo,
            "post":inputPost,
            userEmail,
            date: new Date().toLocaleString('pt-br'),
            likes: [],
        });
        return ref.id;
    } catch (e) {
        return e;
    }
}

export const getPost = async () => {
    const arrayPosts = [];
    const queryFirestore = query(collection(db, 'posts'), orderBy('date'));
    const allPosts = await getDocs(queryFirestore);
    console.log(allPosts)
    allPosts.forEach((doc) => {
        const timeline = doc.data(); //ordenando por data
        arrayPosts.push({ ...timeline, id: doc.id });
    });
    return arrayPosts;
};

  export async function like(id, userEmail) {
    try {
        const postId = doc(db, 'posts', id);
        return await updateDoc(postId, {
        likes: arrayUnion(userEmail),
    });
  } catch (e) {
    return console.log("like nao deu certo", e);
  }
}
  export async function dislike(id, userEmail) {
    try {
    const postId = doc(db, 'posts', id);
    await updateDoc(postId, {
      likes: arrayRemove(userEmail),
    });
  } catch (e) {
      return console.log("Dislike não deu certo!")
  }
}
  export const editPosts = async (id, post) => {
    const editPost = doc(db, "posts", id);
    await updateDoc(editPost, {
    post,
    });
    return editPost;
  }
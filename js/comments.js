// const urlC = "https://ineaw.no/the-green-side/wp/v2/comments?post=";

// const postC = document.querySelector("#button");
// const form = document.querySelector("form#comment-field");
// const postID = document.querySelector("#postID");
// const nameID = document.querySelector("#name");

// form.onsubmit = (e) => {
//   e.preventDefault();

//   postID.value = `${id}`;

//   const data = JSON.stringify({
//     post: postID.value,
//     author_name: nameID.value,
//     author_email: email.value,
//     content: comment.value,
//   });

//   fetch(urlC, {
//     method: "post",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: data,
//   })
//     .then((response) => {
//       if (response.ok) {
//         form.reset();
//         postC.disabled = true;
//       }
//       return response.json();
//     })
//     .then((object) => {
//       object.message;
//     })
//     .catch((error) => console.error("Error:", error));
// };

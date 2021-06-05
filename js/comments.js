const urlC = "https://ineaw.no/the-green-side/wp/v2/comments";

const postC = document.querySelector("#button");
const form = document.querySelector("form#comment-field");
const postID = document.querySelector("#postID");
const nameID = document.querySelector("#name");

const fetchComments = async () => {
  const res = await fetch(urlC);
  const json = await res.json();
  const filter = json.filter((comment) => comment.post === +ID);
  return filtered;
};
const displayComments = async () => {
  const commentField = document.querySelector(".comment");
  try {
    const comments = await fetchComments();
    postContainer.innerHTML = "";
    comments.forEach((comment) => (commentField.innerHTML += createComment(comment)));
  } catch (error) {
    commentField.innerHTML = "<p>No comments!</p>";
  }
};

const getFields = () => [form["e"]];

form.onsubmit = (e) => {
  e.preventDefault();

  postID.value = `${id}`;

  const data = JSON.stringify({
    post: postID.value,
    author_name: nameID.value,
    author_email: email.value,
    content: comment.value,
  });

  fetch(urlC, {
    method: "post",
    headers: {
      "Access-Control-Allow-Origin": "",
      "Content-Type": "application/json",
    },
    body: data,
  })
    .then((response) => {
      if (response.ok) {
        cBtn.disabeled = true;
        form.requestFullscreen();
      }

      return response.json();
    })
    .then((object) => {
      object.message;
    })
    .catch((error) => console.error("Error:", error));
};

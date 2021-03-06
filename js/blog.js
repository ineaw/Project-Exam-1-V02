const url = "https://ineaw.no/thegreen-side/wp-json/wp/v2/posts?page=";
const postContainer = document.querySelector(".blog-grid");
const morePosts = document.querySelector("#more");
const loader = document.querySelector(".loader");
const filterCategory = document.getElementById("filter-category");
let optionsCat = "";
let page = 1;

async function getPosts() {
  try {
    const response = await fetch(url + page + `&_embed`);
    const result = await response.json();

    createHTML(result);
  } catch (error) {
    console.log(error);
  }
}
getPosts();

function createHTML(result) {
  for (let i = 0; i < result.length; i++) {
    {
      const img = result[i]._embedded["wp:featuredmedia"]["0"].source_url;
      const alt = result[i]._embedded["wp:featuredmedia"]["0"].alt_text;
      const post = result[i].id;
      const postContent = result[i].excerpt.rendered;
      const title = result[i].title.rendered;
      const postDate = new Date(result[i].date).toLocaleString("en-US", {
        month: "long",
        day: "2-digit",
      });

      postContainer.innerHTML += `
      <figure class="blog-post-card">
       <a href="post.html?id=${post}"> <img src="${img}" alt="${alt}"/></a>
       <p class="blog-date"<time>${postDate}</time> | By <a href="./about.html">Ine AW</a></p>
      <h2 class="blog-title">${title}</h2>
       <a href="post.html?id=${post}" class="blog-link" aria-label="read more about ${title}">Read more</a>
     </figure>
      `;

      loader.style.display = "none";
    }
  }
}

morePosts.addEventListener("click", () => {
  page++;
  getPosts();
  morePosts.style.display = "none";
});

const categoriesUrl = "https://ineaw.no/thegreen-side/wp-json/wp/v2/categories";
const categoriesContainer = document.querySelector(".blog-grid-cat");

async function displayCategories() {
  try {
    const response = await fetch(categoriesUrl);
    const categories = await response.json();

    for (let i = 0; i < categories.length; i++) {
      categoriesContainer.innerHTML += `<a href="category.html?id=${categories[i].id}"class="changeCat">${categories[i].name}</a>`;
    }
  } catch (error) {
    console.log(error);
  }
}

displayCategories();

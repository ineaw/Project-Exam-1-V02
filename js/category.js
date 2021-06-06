const postContainer = document.querySelector(".blog-grid");
const header = document.querySelector(".blog-page-header");
const loader = document.querySelector(".loader");
const filterCategory = document.getElementById("filter-category");

let optionsCat = "";

const queryString = document.location.search;

const params = new URLSearchParams(queryString);
const id = params.get("id");
const catUrl = "https://ineaw.no/thegreen-side/wp-json/wp/v2/";

async function getPosts() {
  try {
    const response = await fetch(catUrl + "posts/" + "?categories=" + id + "&_embed");
    const result = await response.json();
    console.log(result);
    getCategories(result);
  } catch (error) {
    console.log(error);
    postContainer.innerHTML = message("An error occured when trying to load the post", error);
  }
}
getPosts();

function getCategories(result) {
  for (let i = 0; i < result.length; i++) {
    {
      const img = result[i]._embedded["wp:featuredmedia"]["0"].source_url;
      const alt = result[i]._embedded["wp:featuredmedia"]["0"].alt_text;
      const title = result[i].title.rendered;
      const post = result[i].id;
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
     </figure> `;
      loader.style.display = "none";
    }
  }
}

const categoriesContainer = document.querySelector(".blog-grid-cat");

async function displayCategories() {
  try {
    const response = await fetch(catUrl + "categories");
    const categories = await response.json();

    for (let i = 0; i < categories.length; i++) {
      header.innerHTML = `
      <h1>${categories["0"].name}</h1>`;

      categoriesContainer.innerHTML += `<a href="category.html?id=${categories[i].id}" class="changeCat"> ${categories[i].name} </a>`;
    }
  } catch (error) {
    console.log(error);
  }
}

displayCategories();

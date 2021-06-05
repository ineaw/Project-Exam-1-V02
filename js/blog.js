const url = "https://ineaw.no/the-green-side/wp-json/wp/v2/posts/";
const postContainer = document.querySelector(".blog-grid");
const morePosts = document.querySelector("#more");
const loader = document.querySelector(".loader");
const filterCategory = document.getElementById("filter-category");
let optionsCat = "";

async function getPosts() {
  try {
    const response = await fetch(url + `?per_page=100` + `&_embed`);
    const result = await response.json();
    createHTML(result);
  } catch (error) {
    console.log(error);
  }
}
getPosts();

function createHTML(result) {
  for (let i = 0; i < 10; i++) {
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
  async function getPosts(url) {
    try {
      const response = await fetch(url + `?per_page=100` + `&_embed`);
      const results = await response.json();
      console.log(results);
      for (let i = 10; i < results.length; i++) {
        const img = results[i]._embedded["wp:featuredmedia"]["0"].source_url;
        const alt = results[i]._embedded["wp:featuredmedia"]["0"].alt_text;
        const postContent = results[i].excerpt.rendered;
        const title = results[i].title.rendered;
        console.log(results);
        const blogPost = results[i].id;
        const postDate = new Date(results[i].date).toLocaleString("en-US", {
          month: "long",
          day: "2-digit",
        });
        postContainer.innerHTML += `
        <figure class="blog-post-card">
         <a href="post.html?id=${blogPost}"> <img src="${img}" alt="${alt}"/></a>
         <p class="blog-date"<time>${postDate}</time> | By <a href="about.html">Ine AW</a></p>
         <h2 class="blog-title">${title}</h2>
         <a href="post.html?id=${blogPost}" class="blog-link" aria-label="read more about ${title}">Read more</a>
        </figure>`;
        morePosts.style.display = "none";
        loader.style.display = "none";
      }
    } catch (error) {
      console.log(error);
      postContainer.innerHTML = message("An error occured when trying to load", error);
    }
  }
  getPosts(url);
});

let page = 1;
let totalpages = null;

// filterCategory.addEventListener("change", (e) => {
//   const value = e.target.value;

//   switch (value) {
//     case "all":
//       optionsCat = "";
//       break;
//     case "maintenance":
//       optionsCat = "?id";
//       break;
//   }
//   displayCategories();
// });

const categoriesUrl = "https://ineaw.no/the-green-side/wp-json/wp/v2/categories";
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

const postContainer = document.querySelector(".blog-grid");
const morePosts = document.querySelector("#more");
const loader = document.querySelector(".loader");
const filterCategory = document.getElementById("filter-category");
let optionsCat = "";

const queryString = document.location.search;

const params = new URLSearchParams(queryString);
const id = params.get("id");
const catUrl = "https://ineaw.no/the-green-side/wp-json/wp/v2/";

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

const categoriesContainer = document.querySelector(".blog-grid-2");

async function displayCategories() {
  try {
    const response = await fetch(catUrl + "categories");
    const categories = await response.json();

    for (let i = 0; i < categories.length; i++) {
      categoriesContainer.innerHTML += `<a href="category.html?id=${categories[i].id}" class="changeCat"> ${categories[i].name} </a>`;
    }
  } catch (error) {
    console.log(error);
  }
}

displayCategories();

// function getCategories() {
//   for (let i = 0; i < post.length; i++) {
// const img = cat[i]._embedded["wp:featuredmedia"]["0"].source_url;
// const alt = post[i]._embedded["wp:featuredmedia"]["0"].alt_text;
// const post = cat[i].id;
// const postContent = cat[i].excerpt.rendered;
// const title = cat[i].title.rendered;
// const postDate = new Date(cat[i].date).toLocaleString("en-US", {
//   month: "long",
//   day: "2-digit",
// });

//     postContainer.innerHTML += `
//     <figure class="blog-post-card">
//     ${post[i].title.rendered}
//    </figure> `;
//     loader.style.display = "none";
//   }
// }

// getCategories();

// filterCategory.addEventListener("change", (e) => {
//   const value = e.target.value;

//   switch (value) {
//     case "all":
//       optionsCat = "";
//       break;
//     case "maintenance":
//       optionsCat = "?name";
//       break;
//   }
//   displayCategories();
// });
// const newDate = new Date(post.date).toLocaleString("en-US", {
//   month: "long",
//   day: "2-digit",
//   year: "2-digit",
// });

// // const alt = post._embedded["wp:featuredmedia"]["0"].alt_text;
// // const img = post._embedded["wp:featuredmedia"]["0"].source_url;

// changeTitle.innerHTML = `${post.title.rendered} | The Green Side Blog`;

// postImage.innerHTML = `
//  <header class="blog-header">
//  <h1>${post.title.rendered}</h1>
//  <div class="blog-date"> Posted <time datetime="2021-04-21">${newDate}</time> | by Ine AW</div>
//  </header>
//  <figure class="post-image"><img src="${img}" alt="${alt}"/></figure>
// `;
// postContainer.innerHTML = `
//  <article>${post.content.rendered}</article>
// `;
// modalImage.innerHTML = `<section class="modal-content>
// <figure class="post-image-modal">
//  <img src="${img}" alt="${alt}"/>
// </section>
// `;

// breadcrumbs.innerHTML += `
//  <li><a href="index.html">Home</a></li>
//  <li><a href="blog.html">Blog</a></li>
//  <li><p>${post.title.rendered}</p></li>
// `;

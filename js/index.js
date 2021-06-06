const url = "https://ineaw.no/the-green-side/wp-json/wp/v2/posts";

const recentPosts = document.querySelector(".new-post-wrap");
const aside = document.querySelector(".sideposts");
const carouselContainer = document.querySelector(".carousel");
const carouselCard = document.querySelector(".carousel-card");

async function getPosts() {
  try {
    const response = await fetch(url + `?per_page=8&_embed`);
    const posts = await response.json();
    recentPosts.innerHTML = "";
    carouselContainer.innerHTML = "";

    for (let i = 0; i < posts.length; i++) {
      const img = posts[i]._embedded["wp:featuredmedia"]["0"].source_url;
      const alt = posts[i]._embedded["wp:featuredmedia"]["0"].alt_text;
      const post = posts[i].id;
      const postContent = posts[i].excerpt.rendered;
      const title = posts[i].title.rendered;
      const postDate = new Date(posts[i].date).toLocaleString("en-US", {
        month: "long",
        day: "2-digit",
      });

      recentPosts.innerHTML += `
      <figure class="new-post-card">
      <a href="post.html?id=${post}"> <img src="${img}" alt="${alt}"/> </a>
      <figcaption class="blog-date"<time>${postDate}</time> | By <a href="about.html">Ine AW</a></figcaption>
      <h3 class="new-post-title">${title}</h3>
      <a href="post.html?id=${post}" class="blog-link" aria-label="read more about ${title}">Read more</a>
      </figure>`;

      carouselContainer.innerHTML += `
      <li> 
      <figure class="carousel-card">
      <a href="post.html?id=${post}"> <img src="${img}" alt="${alt}"/> </a>
      <figcaption class="blog-date"<time>${postDate}</time> |  By <a href="about.html">Ine AW</a></figcaption>
      <h3 class="carousel-title">${title}</h3>
      <a href="post.html?id=${post}" class="blog-link" aria-label="read more about ${title}">Read more</a>
      </figure> 
      </li>`;
    }
  } catch (error) {
    console.log(error);
    carouselContainer.innerHTML = message("An error occured while trying to load the content", error);
  }
}
getPosts();

const next = document.getElementById("next-btn");
const prev = document.getElementById("prev-btn");

const carouselWidth = carouselContainer.offsetWidth;

next.onclick = function () {
  carouselContainer.scrollLeft += carouselWidth;
};

prev.onclick = function () {
  carouselContainer.scrollLeft -= carouselWidth;
};

let api = "https://ineaw.no/thegreen-side/wp-json/wp/v2/posts?_embed";
const aside = document.querySelector(".sideposts-recent");

async function getRecent() {
  try {
    const response = await fetch(api);
    const recent = await response.json();

    for (let i = 0; i < recent.length; i++) {
      if (i === 3) {
        break;
      }
      const img = recent[i]._embedded["wp:featuredmedia"]["0"].source_url;
      const alt = recent[i]._embedded["wp:featuredmedia"]["0"].alt_text;
      const post = recent[i].id;
      const postContent = recent[i].excerpt.rendered;
      const title = recent[i].title.rendered;
      const postDate = new Date(recent[i].date).toLocaleString("en-US", {
        month: "long",
        day: "2-digit",
      });
      aside.innerHTML += `
      <figure class="recent-image">
       <a href="post.html?id=${post}"> <img src="${img}" alt="${alt}"/> 
       <p class="blog-date">Posted <time>${postDate} | By Ine AW </time></p>
      <h4 class="aside-title">${title}</h4>
       </a>
      </figure> `;
    }
  } catch (error) {
    console.log(error);
    aside.innerHTML = message("An error occured when trying to load", error);
  }
}
getRecent();

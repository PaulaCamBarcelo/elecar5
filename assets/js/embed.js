//Codigo para agregar publicaciones de instagram en la web

fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink&access_token=YOUR_ACCESS_TOKEN`)
  .then(res => res.json())
  .then(data => {
    let container = document.getElementById('insta-feed');
    data.data.forEach(post => {
      container.innerHTML += `
        <a href="${post.permalink}" target="_blank">
          <img src="${post.media_url}" alt="${post.caption}" />
        </a>`;
    });
  });

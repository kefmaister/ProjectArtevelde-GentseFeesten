(() => {
  async function fetchNews() {
    try {
      const newsRes = await fetch(
        "https://www.pgm.gent/data/gentsefeesten/news.json"
      );
      const newsData = await newsRes.json();
      renderNews(newsData);
      console.log(newsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  function renderNews(news) {
    const $newsPageContainer = document.getElementById("newsPageContainer");
    let html = "";
    html += ` <h2 class="newsPage">Ontdek ons nieuws</h2>`;
    news.forEach((newsItem) => {
      html += `<div class="newsItem newsItemContainer">
      <img src="${newsItem.picture.medium}">
      <div class="newsItem">
      <h3 class="newsTitle">${newsItem.title}</h3>
      <svg class="eventArrow newsArrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 85 32">
          <path
              d="m68.393 0-3.434 3.808 9.845 8.881H.001v5.129h74.828l-9.865 8.848 3.424 3.817 16.946-15.2z" />
      </svg>
</div></div>`;
    });

    $newsPageContainer.innerHTML = html;
  }
  function buildUI() {
    fetchNews();
  }
  function eventListeners() {}
  function initialize() {
    buildUI();
    eventListeners();
  }
  initialize();
})();

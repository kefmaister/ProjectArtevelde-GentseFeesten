(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get("id");

  async function fetchDetailsForEvent(id) {
    try {
      const eventsRes = await fetch(
        "https://www.pgm.gent/data/gentsefeesten/events_500.json"
      );
      const eventsData = await eventsRes.json();

      const filteredEvents = eventsData.filter((event) => event.id === id);
      renderEvent(filteredEvents[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  function generator() {
    let n = 1 + Math.floor(Math.random() * 5);
    const headerLogo = document.querySelector(".header-container .logoImg");
    const footerLogo = document.querySelector("footer .logoImg");
    const headerImg = document.querySelector(".headerImg");
    headerLogo.src = `../img/logo/GF-logo-2023-${n}.svg`;
    footerLogo.src = `../img/logo/GF-logo-2023-${n}.svg`;
    if (headerImg) {
      headerImg.style.backgroundImage = `url(./static/img/logo/campagne-${n}.png)`;
    }
    return n;
  }
  function renderEvent(event) {
    const backBtn = document.getElementById("goBack");
    const backBtnTxt = document.getElementById("goBackDate");
    const $eventDetailContainer = document.getElementById("eventDetails");
    console.log(event);
    console.log(event.title);
    backBtn.href = `day.html?day=${event.day}&day_of_week=${event.day_of_week}`;
    backBtnTxt.textContent = `Overzicht ${event.day_of_week} ${event.day} juli`;
    $eventDetailContainer.innerHTML = "";
    let html = "";
    if (event) {
      html += `<h1 class="detail--title">${event.title}</h1>
          <div class="detail--locationTime">
            <p class="detail--location">${event.location}</p>
            <p>${event.start} u. - ${event.end} u.</p>
          </div>
          <p class="detail--description">${
            event.description
              ? event.description
              : "Er is geen beschrijving beschikbaar"
          }</p>`;

      if (event.image && event.image.full) {
        html += `<img class="detail--img" src="${event.image.full}" alt="" srcset="">`;
      } else {
        html += `<img class="detail--img" src="../img/filler.jpg" alt="" srcset="">`;
      }

      html += `
      <div class="detail--group">
      <h3>Organisator:</h3>
          <a href="">${event.organizer}</a> 
          </div>
          <div class="detail--group">
          <h3>Website:</h3>
          <a href="${event.url}">${event.url}</a>
          </div>
          <div class="detail--group">
          <h3>Categorieën:</h3>
          <div>${event.category.map((cat) => `<p>${cat}</p>`).join("")}</div>
          </div>
          `;
    } else {
      html += "<p>Event not found</p>";
    }

    $eventDetailContainer.innerHTML = html;
  }
  function buildUI() {
    fetchDetailsForEvent(eventId);
    generator();
  }
  function eventListeners() {}
  function initialize() {
    buildUI();
    eventListeners();
  }
  initialize();
})();

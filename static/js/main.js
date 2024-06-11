(() => {
  async function fetchData() {
    try {
      const eventsRes = await fetch(
        "https://www.pgm.gent/data/gentsefeesten/events_500.json"
      );
      const eventsData = await eventsRes.json();
      renderData(eventsData);
      generateEvents(eventsData);
      console.log(eventsData);

      const newsRes = await fetch(
        "https://www.pgm.gent/data/gentsefeesten/news.json"
      );
      const newsData = await newsRes.json();
      console.log(newsData);
      renderNews(newsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function generator() {
    let n = 1 + Math.floor(Math.random() * 5);
    const headerLogo = document.querySelector(".header-container .logoImg");
    const footerLogo = document.querySelector("footer .logoImg");
    const headerImg = document.querySelector(".headerImg");
    headerLogo.src = `static/img/logo/GF-logo-2023-${n}.svg`;
    footerLogo.src = `static/img/logo/GF-logo-2023-${n}.svg`;
    if (headerImg) {
      headerImg.style.backgroundImage = `url(./static/img/logo/campagne-${n}.png)`;
    }
    return n;
  }

  function renderData(data) {
    const $container = document.querySelector(".links");
    const $mobileContainer = document.querySelector(".program-container");
    $container.innerHTML = "";
    $mobileContainer.innerHTML = "";
    const mergedDay = [
      ...new Set(data.map((event) => `${event.day_of_week}-${event.day}`)),
    ];

    mergedDay.sort((a, b) => {
      const dayA = parseInt(a.split("-")[1]);
      const dayB = parseInt(b.split("-")[1]);
      return dayA - dayB;
    });

    mergedDay.forEach((combination) => {
      const [dayOfWeek, day] = combination.split("-");
      const listItem = createListItem(dayOfWeek, day, data);
      const programItem = createProgramListItem(dayOfWeek, day, data);
      $mobileContainer.appendChild(programItem);
      $container.appendChild(listItem);
    });
    console.log(mergedDay);
  }
  function createProgramListItem(dayOfWeek, day, data) {
    const programListItem = document.createElement("li");

    const dayEvent = data.find(
      (event) => event.day_of_week === dayOfWeek && event.day === day
    );
    if (dayEvent) {
      const linkElement = createEventLinkElement(dayEvent);
      programListItem.appendChild(linkElement);
      linkElement.textContent = `${dayOfWeek} ${day} juli`;
    }
    return programListItem;
  }

  function createListItem(dayOfWeek, day, data) {
    const listItem = document.createElement("li");

    const dayEvent = data.find(
      (event) => event.day_of_week === dayOfWeek && event.day === day
    );

    if (dayEvent) {
      const linkElement = createEventLinkElement(dayEvent);
      listItem.appendChild(linkElement);

      const dayOfWeekElement = document.createElement("p");
      const spanElement = document.createElement("span");
      spanElement.textContent = dayOfWeek.substring(0, 2);
      dayOfWeekElement.appendChild(spanElement);
      linkElement.appendChild(dayOfWeekElement);

      const dayNumberElement = document.createElement("p");
      dayNumberElement.textContent = day + " juli";
      linkElement.appendChild(dayNumberElement);
      listItem.classList.add("unselected--day");
    }

    return listItem;
  }
  function displayEvents(selectedDay, selectedDayOfWeek) {
    window.location.href = `static/events/day.html?day=${selectedDay}&day_of_week=${selectedDayOfWeek}`;
  }
  function createEventLinkElement(dayEvent) {
    const eventLinkElement = document.createElement("a");
    eventLinkElement.href = "#";

    eventLinkElement.addEventListener("click", () => {
      displayEvents(dayEvent.day, dayEvent.day_of_week);
    });
    return eventLinkElement;
  }

  function generateEvents(data) {
    const randomizeData = data.sort(() => Math.random() - 0.5);
    const usableData = randomizeData.slice(
      0,
      Math.min(8, randomizeData.length)
    );
    createTeaserContainer(usableData);
  }

  const $eventContainer = document.querySelector(".eventTeaserShow");
  if ($eventContainer) {
    function createTeaserContainer(randomizedData) {
      const dateItem = document.querySelector(".eventDate");
      $eventContainer.innerHTML = "";

      let html = "";
      randomizedData.forEach((event) => {
        html += `<a class="imgContainer" href="static/events/detail.html?id=${
          event.id
        }">
          <img src="${
            event.image ? event.image.thumb : "static/img/logo/filler.jpg"
          } "alt="">
          <p class="eventDate">${event.day_of_week.substring(0, 2)} ${
          event.day
        } Juli</p>
        
          <div class="eventDescription">
            <div class = "eventDescription--box">
              <h2 class="eventTitle">${event.title}</h2>
              <p class="eventLocation">${event.location}</p>
              <p class="eventTime">${event.start} u.</p>
            </div>
            <div class="redAfter"></div>
          </div>          
        </a>`;
      });
      $eventContainer.innerHTML = html;
    }
  }
  const rightArrow = document.getElementById("right");
  const leftArrow = document.getElementById("left");

  function renderNews(news) {
    const randomizeNews = news.sort(() => Math.random() - 0.5);
    const usableNews = randomizeNews.slice(
      0,
      Math.min(3, randomizeNews.length)
    );
    const $newsContainer = document.getElementById("newsContainer");
    let html = "";
    html += ` <h2 class="newsHeader">Nieuws</h2>`;
    usableNews.forEach((newsItem) => {
      html += `<div class="newsItem">
      <h3 class="newsTitle">${newsItem.title}</h3>
      <svg class="eventArrow newsArrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 85 32">
          <path
              d="m68.393 0-3.434 3.808 9.845 8.881H.001v5.129h74.828l-9.865 8.848 3.424 3.817 16.946-15.2z" />
      </svg>
</div>`;
    });
    html += `<img src="static/img/logo/filler.jpg" alt="">
    `;
    html += `<button class="btnNews"><a href="">bekijk alle niewsberichten</a></button>`;
    $newsContainer.innerHTML = html;
  }

  function buildUI() {
    generator();
    fetchData();
  }
  function eventListeners() {
    if (rightArrow && leftArrow) {
      rightArrow.addEventListener("click", () => {
        $eventContainer.scrollBy(400, 0);
      });
      leftArrow.addEventListener("click", () => {
        $eventContainer.scrollBy(-400, 0);
      });
    }
  }
  function initialize() {
    buildUI();
    eventListeners();
  }
  initialize();
})();

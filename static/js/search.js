(() => {
  const $searchInput = document.getElementById("input-search");
  let eventsData = [];
  const params = new URLSearchParams(window.location.search);
  const search = params.get("search");

  async function fetchData() {
    try {
      const eventsRes = await fetch(
        "https://www.pgm.gent/data/gentsefeesten/events_500.json"
      );
      eventsData = await eventsRes.json();
      renderData(eventsData);
      console.log(eventsData);
      buildUI();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const filterEvents = (search) => {
    if (!search) {
      return eventsData;
    }

    search = search.toLowerCase();

    return eventsData.filter((event) => {
      const title = event && event.title ? event.title.toLowerCase() : "";
      const description =
        event && event.description ? event.description.toLowerCase() : "";
      const categories =
        event && event.category
          ? event.category.map((cat) => cat.toLowerCase())
          : [];

      return (
        title.includes(search) ||
        description.includes(search) ||
        categories.includes(search)
      );
    });
  };
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
  const renderFilteredEvents = (filteredEvents) => {
    console.log("Filtered Events:", filteredEvents);
    const $searchEventsContainer = document.getElementById("searchedEvents");
    const $resultTxt = document.getElementById("resultsText");
    $resultTxt.textContent = "";
    $searchEventsContainer.innerHTML = "";
    let html = "";
    $resultTxt.textContent = `${filteredEvents.length} Resultaten voor "${search}"`;
    filteredEvents.forEach((event) => {
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
    $searchEventsContainer.innerHTML = html;
  };
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
      const programItem = createProgramListItem(dayOfWeek, day, data);
      $mobileContainer.appendChild(programItem);
      
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

  const buildUI = () => {
    if (search) {
      console.log("Searching for: " + search);
      $searchInput.value = search;

      const filteredEvents = filterEvents(search);
      renderFilteredEvents(filteredEvents);
    }
  };

  const initialize = () => {
    fetchData();
    generator();
  };

  initialize();
})();

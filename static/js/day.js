(() => {
  async function fetchDataForDay(selectedDay, selectedDayOfWeek) {
    try {
      const eventsRes = await fetch(
        "https://www.pgm.gent/data/gentsefeesten/events_500.json"
      );
      const eventsData = await eventsRes.json();

      const filteredEvents = eventsData.filter(
        (event) =>
          event.day === selectedDay && event.day_of_week === selectedDayOfWeek
      );
      renderData(eventsData);
      const categoriesRes = await fetch(
        "https://www.pgm.gent/data/gentsefeesten/categories.json"
      );
      const categoriesData = await categoriesRes.json();

      const eventsByCategory = {};
      categoriesData.forEach((category) => {
        const categoryName = category;

        const categoryEvents = filteredEvents.filter((event) =>
          event.category.includes(categoryName)
        );

        if (categoryEvents.length > 0) {
          eventsByCategory[categoryName] = categoryEvents;
        }
      });

      renderEventsByCategory(eventsByCategory);

      renderCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function renderEventsByCategory(eventsByCategory) {
    const $container = document.getElementById("event-container");
    $container.innerHTML = "";

    for (const category in eventsByCategory) {
      if (eventsByCategory.hasOwnProperty(category)) {
        $container.innerHTML += `<h2 class="categoryTitle" id="${category}">${category}</h2>`;

        const categoryEvents = eventsByCategory[category];
        let html = "";
        categoryEvents.forEach((event) => {
          html += `
            <a class="dayEventContainer" href="detail.html?id=${event.id}">
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

        $container.innerHTML += html;
      }
    }
  }
  const urlParams = new URLSearchParams(window.location.search);
  const selectedDay = urlParams.get("day");
  const selectedDayOfWeek = urlParams.get("day_of_week");

  if (selectedDay && selectedDayOfWeek) {
    fetchDataForDay(selectedDay, selectedDayOfWeek);
  }
  function generator() {
    let n = 1 + Math.floor(Math.random() * 5);

    const headerLogo = document.querySelector(".header-container .logoImg");
    const footerLogo = document.querySelector("footer .logoImg");
    headerLogo.src = `../img/logo/GF-logo-2023-${n}.svg`;
    // footerLogo.src = `../img/logo/GF-logo-2023-${n}.svg`;
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
      if (day === selectedDay && dayOfWeek === selectedDayOfWeek) {
        programListItem.classList.add("selected--day");
      }
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
      if (day === selectedDay && dayOfWeek === selectedDayOfWeek) {
        listItem.classList.remove("unselected--day");
        listItem.classList.add("selected--day");
      }
    }

    return listItem;
  }
  function displayEvents(selectedDay, selectedDayOfWeek) {
    window.location.href = `day.html?day=${selectedDay}&day_of_week=${selectedDayOfWeek}`;
  }
  function createEventLinkElement(dayEvent) {
    const eventLinkElement = document.createElement("a");
    eventLinkElement.href = "#";

    eventLinkElement.addEventListener("click", () => {
      displayEvents(dayEvent.day, dayEvent.day_of_week);
    });
    return eventLinkElement;
  }
  function renderCategories(categories) {
    const $categoriesContainer = document.getElementById("filterContainer");
    let html = "";
    categories.forEach((category) => {
      html += `<a href="#${category}">${category}</a>`;
    });
    $categoriesContainer.innerHTML += html;
  }
  function buildUI() {
    generator();
  }
  function eventListeners() {}
  function initialize() {
    buildUI();
    eventListeners();
  }
  initialize();
})();

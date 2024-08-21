// Add JS here


// document.addEventListener('DOMContentLoaded', loadEvents); // Load events when the page loads

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");
    loadEvents();
});

document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventTime = document.getElementById('eventTime').value;
    const eventLocation = document.getElementById('eventLocation').value;
    console.log("success")
    const eventDetails = {
        name: eventName,
        date: eventDate,
        time: eventTime,
        location: eventLocation
    };

    saveEvent(eventDetails);
    addEventToDOM(eventDetails);

    // Clear the form after submission
    document.getElementById('eventForm').reset();
});

function saveEvent(event) {
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events.push(event);
    localStorage.setItem('events', JSON.stringify(events));
    console.log("Events before adding new one:", events);
}

function loadEvents() {
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events.forEach(event => addEventToDOM(event));
}

function addEventToDOM(event) {
    const eventList = document.getElementById('eventList');

    const li = document.createElement('li');
    li.classList.add('event-item');
    
    
    li.innerHTML = `
    <button class="delete-btn"><i class="fa-solid fa-xmark"></i></button>
        <h1 class="event-title">${event.name}</h1>
        <div class="event-details">
        <i class="fa-solid fa-clock icon"></i>
        <p class="event-date">${event.date} at ${event.time}</p>
        </div>
        <div class="event-details">
        <i class="fa-solid fa-location-dot icon"></i>
        <p class="event-location">${event.location}</p>
        </div>
    `;
    li.classList.add('event-item');

    li.querySelector('.delete-btn').addEventListener('click', function() {
        deleteEvent(event.name, li);
    });

    eventList.appendChild(li);
}

function deleteEvent(eventName, eventElement) {
    // Remove the event from the DOM
    eventElement.remove();

    // Remove the event from local storage
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events = events.filter(event => event.name !== eventName);
    localStorage.setItem('events', JSON.stringify(events));
}
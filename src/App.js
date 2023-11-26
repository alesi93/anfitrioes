import React from "react";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Weather from './weather';
import { ptBR } from 'date-fns/locale';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {
    'pt-BR': ptBR
  }
});

const events = [
  {
    title: "Florianópolis - Airbnb",
    allDay: true,
    start: new Date(2023, 10, 29),
    end: new Date(2023, 11, 2)
  },
  {
    title: "Florianópolis - Booking.com",
    allDay: true,
    start: new Date(2023, 10, 2),
    end: new Date(2023, 10, 28)
  }
];

function eventStyleGetter(event, start, end, isSelected) {
  const style = {
    backgroundColor: '#3174ad',
    borderRadius: '5px',
    opacity: 0.8,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px',
    fontSize: '12px',
    height: '500px !important',
  };
  return {
    style,
  };
}

function monthEventStyleGetter(event, start, end, isSelected) {
  const style = {
    height: 'auto',
    overflow: 'visible',
  };
  return {
    style,
  };
}

function eventPropGetter(event) {
  let color;
  if (event.title.includes("Airbnb")) {
    color = '#FF385C';
  } else if (event.title.includes("Booking.com")) {
    color = '#0A3A7D';
  }

  return {
    style: {
      backgroundColor: color,
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '5px',
      fontSize: '12px',
      height: '500px !important',
    },
  };
}

function App() {
  return (
    <div className="App">
      <Calendar
        culture={"pt-BR"}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "1000px", margin: "50px" }}
        components={{
          event: ({ event }) => (
            <Weather city={event.title.split(' - ')[0]} eventName={event.title.split(' - ')[1]} />
          )
        }}
        eventStyleGetter={eventStyleGetter}
        month={{
          eventContent: ({ event }) => (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {event.title}
            </div>
          ),
          eventStyleGetter: monthEventStyleGetter,
        }}
        eventPropGetter={eventPropGetter}
      />
    </div>
  );
}

export default App;

import { useRouteLoaderData, redirect, Await } from "react-router-dom";
import { Suspense } from "react";

import EventItem from '../components/EventItem';
import EventsList from "../components/EventsList";

export default function EventDetailsPage() {
    const { event, events } = useRouteLoaderData('event-details');

    return (
        <>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Waiting for one event...</p>}>
                <Await resolve={event}>
                    {(fecthedEvent) => <EventItem event={fecthedEvent} />}
                </Await>
            </Suspense>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Waiting to fetch all events...</p>}>
                <Await resolve={events}>
                    {(loadedEvents) => <EventsList events={loadedEvents} />}
                </Await>
            </Suspense>
        </>
    )
}

async function loadEvents() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        throw new Response(
            JSON.stringify({ message: "Could not fetch events." }),
            { status: 500 }
        )
    } else {
        const data = await response.json();
        return data.events;
    }
}

async function loadEvent(eventId) {
    const response = await fetch('http://localhost:8080/events/' + eventId);

    if (!response.ok) {
        throw new Response(JSON.stringify({ message: 'Could not fetch event details.' }), {
            status: 500,
        });
    } else {
        const resData = await response.json();
        return resData.event;
    }
}

export async function loader({ request, params }) {
    const eventId = params.eventId;

    return {
        event: await loadEvent(eventId),
        events: loadEvents(),
    }
}

export async function action({ request, params }) {
    const eventId = params.eventId;

    const response = await fetch('http://localhost:8080/events/' + eventId, {
        method: request.method
    });

    if (!response.ok) {
        throw new Response(JSON.stringify({ message: 'Could not delete event.' }), { status: 500 })
    }

    return redirect('/events');
}
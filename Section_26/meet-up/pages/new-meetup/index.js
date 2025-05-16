import { useRouter } from 'next/router'
import Head from 'next/head'
import { Fragment } from 'react';

import NewMeetupForm from '../../components/meetups/NewMeetupForm'

export default function NewMeetupPage() {
    const router = useRouter();

    async function meetupAddHandler(data) {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const enteredData = await response.json();

        console.log(enteredData);

        router.push('/');
    }

    return (
        <Fragment>
            <Head>
                <title>Add new meetup</title>
            </Head>
            <NewMeetupForm onAddMeetup={meetupAddHandler} />
        </Fragment>
    )
}
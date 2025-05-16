import Head from 'next/head'
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList'

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'Meetup 1',
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Sukiennice_and_Main_Market_Square_Krakow_Poland.JPG',
        address: "Address 1",
        description: "First meetup!"
    },
    {
        id: 'm2',
        title: 'Meetup 2',
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Sukiennice_and_Main_Market_Square_Krakow_Poland.JPG',
        address: "Address 2",
        description: "Second meetup!"
    }
]

export default function HomePage(props) {
    return (
        <>
            <Head>
                <title>React meetups</title>
                <meta name="description" content="Browse events" />
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    )
}

/* export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;

    return {
        props: {
            meetups: DUMMY_MEETUPS
        }
    }
} */

export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://riccardofachin:mypassword@cluster0.etl5s4m.mongodb.net/');

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            })),
            revalidate: 1
        }
    }
}
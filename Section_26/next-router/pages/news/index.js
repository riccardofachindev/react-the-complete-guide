import Link from 'next/link'
import { Fragment } from 'react';

function NewsPage() {
    return (
        <Fragment>
            <h1>The News Page!</h1>
            <ul>
                <li>
                    <Link href="/news/next-is-great">Next is great</Link>
                </li>
                <li>
                    <Link href="/news/another-article">Another article</Link>
                </li>
            </ul>
        </Fragment>
    )
}

export default NewsPage;
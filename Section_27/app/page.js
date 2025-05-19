import { Suspense } from "react";
import UsePromiseDemo from "./components/UsePromisesDemo";

import fs from 'node:fs/promises';
import ErrorBoundary from "./components/ErrorBoundary";

export default async function Home() {
  const fetchUsersPromise = new Promise((resolve, reject) =>
    setTimeout(async () => {
      const data = await fs.readFile('dummy-db.json', 'utf-8');
      const users = JSON.parse(data);
      // resolve(users);
      reject('An error!');
    }, 2000)
  )

  return (
    <main>
      <ErrorBoundary fallback={<p>There was an error</p>}>
        <Suspense fallback={<p>Loading...</p>}>
          <UsePromiseDemo usersPromise={fetchUsersPromise} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}

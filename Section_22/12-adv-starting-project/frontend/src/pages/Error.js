import { useRouteError } from "react-router-dom";

import PageContent from "../components/PageContent"
import MainNavigation from "../components/MainNavigation";

function ErrorPage() {
    const error = useRouteError();

    let title = "Error occurred";
    let message = "Something went wrong.";

    if (error.status === 500) {
        message = JSON.parse(error.data).message;
    }

    if (error.status === 404) {
        message = "Page not found.";
    }

    return (
        <>
            <MainNavigation />
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </>
    )
}

export default ErrorPage;
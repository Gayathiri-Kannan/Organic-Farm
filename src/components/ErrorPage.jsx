import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    return(
        <div className="conatiner">
            <h3>Opps! An error occured</h3>
            <p>{error.message}</p>
        </div>
    );
};

export default ErrorPage;
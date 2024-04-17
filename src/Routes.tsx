import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Weather from "./pages/Weather";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>
    },
    {
        path:"/weather-report/:lat/:lon",
        element:<Weather/>
    }
])
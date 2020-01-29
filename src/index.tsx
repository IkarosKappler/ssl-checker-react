import * as React from "react";
import * as ReactDOM from "react-dom";

import { MainAppContainer } from "./components/MainAppContainer";

ReactDOM.render(
    <MainAppContainer compiler="TypeScript" framework="React" />,
    document.getElementById("example")
);
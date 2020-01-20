// Load monitoring, polyfills and another stuff before the application's code.
import "./bootstrap";

import React from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader/root";

import { getMountPoint } from "./mountPoint";

const Application = hot(() => <h1>React Application</h1>);

ReactDOM.render(<Application />, getMountPoint());

// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import { MainPage } from "./components/MainPage";
// import { App } from './Study.tsx'
// import { App } from './App.tsx'

const rootEl = document.getElementById("root");
const reactRoot = createRoot(rootEl!);

reactRoot.render(<MainPage />);

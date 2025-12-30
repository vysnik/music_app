// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { TracksList } from './components/TracksList.tsx';
import { TrackDetail } from './components/TrackDetail.tsx';
import { PageTitle } from './components/PageTitle.tsx';
// import { App } from './Study.tsx'
// import { App } from './App.tsx'

const rootEl = document.getElementById('root');
const reactRoot = createRoot(rootEl!);

reactRoot.render(
    <MainPage />
)


function MainPage() {
    return (
        <div>
            <PageTitle />
            <div style={{ display: 'flex' }}>
                <TracksList />
                <TrackDetail />
            </div>
        </div>
    )
}
import { useEffect, useState } from "react";

// import './App.css'


export function App() {

  const [selectedTrackId, setSelectedTrackId] = useState(null)
  const [selectedTrack, setSelectedTrack] = useState(null)
  const [tracks, setTracks] = useState(null)

  useEffect(() => {
    fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks', {
      headers: {
        "api-key": "8698cd1f-ce62-4fe5-ad5f-20c0c0180e8d",
      }
    }).then(res => res.json()).then(json => setTracks(json.data))
  }, [])

  useEffect(() => {
    if (!selectedTrackId) {
      return;
    }

    fetch(`https://musicfun.it-incubator.app/api/1.0/playlists/tracks/${selectedTrackId}/`, {
      headers: {
        "api-key": "8698cd1f-ce62-4fe5-ad5f-20c0c0180e8d",
      }
    }).then(res => res.json()).then(json => setSelectedTrack(json.data))
  }, [selectedTrackId])

  if (tracks === null) {
    return <span>loading...</span>
  }

  if (tracks.length === 0) {
    return <span>No tracks</span>
  }

  // let selectedTrack = tracks.find(track => track.id === selectedTrackId);

  return (
    <div>
      <h1>Musicfun player</h1>
      <button onClick={() => {
        setSelectedTrack(null)
        setSelectedTrackId(null)
      }}>reset selection</button>
      <div style={{
        display: "flex",
        gap: "30px"
      }}>
        <ul>
          {tracks.map((track) => {
            return (
              <li key={track.id} style={{
                border: track.id === selectedTrackId ? '1px solid red' : 'none'
              }}>
                <div onClick={() => {
                  setSelectedTrackId(track.id)
                }}>
                  {track.attributes.title}
                </div>
                <audio
                  controls
                  src={track.attributes.attachments[0].url}
                ></audio>
              </li>
            )
          })
          }
        </ul>
        <ul>
          <div>
            <h3>
              Details
            </h3>
            {!selectedTrack && !selectedTrackId && 'Track is not selected'}
            {!selectedTrack && selectedTrackId && 'Loading..'}
            {selectedTrack && selectedTrackId && selectedTrack.id !== selectedTrackId && 'Loading..'}
            {
              selectedTrack &&
              <div>
                <h3>{selectedTrack.attributes.title}</h3>
                <h4>Lyrics</h4>
                <p>
                  {selectedTrack.attributes.lyrics ?? 'no lyrics'}
                </p>
              </div>
            }


          </div>
        </ul>
      </div>
    </div>
  )
}




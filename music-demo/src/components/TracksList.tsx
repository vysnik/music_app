import { useEffect, useState } from "react";

export function TracksList() {
    const [tracks, setTracks] = useState(null)
    const [selectedTrackId, setSelectedTrackId] = useState(null)


    useEffect(() => {
        fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks', {
            headers: {
                "api-key": "8698cd1f-ce62-4fe5-ad5f-20c0c0180e8d",
            }
        }).then(res => res.json()).then(json => setTracks(json.data))
    }, [])

    if (tracks === null) {
        return <span>loading...</span>
    }

    if (tracks.length === 0) {
        return <span>No tracks</span>
    }

    return (
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
    )
}
import { useEffect, useState } from "react";
import { TrackItem } from "./TrackItem";

export function TracksList({ selectedTrackId, onTrackSelect }) {
  const [tracks, setTracks] = useState(null);

  useEffect(() => {
    fetch("https://musicfun.it-incubator.app/api/1.0/playlists/tracks", {
      headers: {
        "api-key": "8698cd1f-ce62-4fe5-ad5f-20c0c0180e8d",
      },
    })
      .then((res) => res.json())
      .then((json) => setTracks(json.data));
  }, []);

  if (tracks === null) {
    return <span>loading...</span>;
  }

  if (tracks.length === 0) {
    return <span>No tracks</span>;
  }

  const handleResetClick = () => {
    onTrackSelect?.(null);
  };

  const handleClick = (trackId) => {
    onTrackSelect?.(trackId);
  };

  return (
    <div>
      <button onClick={handleResetClick}>reset</button>
      <hr />
      <ul>
        {tracks.map((track) => {
          return (
            <TrackItem
              key={track.id}
              track={track}
              isSelected={track.id === selectedTrackId}
              onSelect={handleClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

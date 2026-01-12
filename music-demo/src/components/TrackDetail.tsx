import { useEffect, useState } from "react";

export function TrackDetail({ trackId }) {
  const [selectedTrack, setSelectedTrack] = useState(null);

  useEffect(() => {
    if (!trackId) {
      setSelectedTrack(null);
      return;
    }

    fetch(
      `https://musicfun.it-incubator.app/api/1.0/playlists/tracks/${trackId}/`,
      {
        headers: {
          "api-key": "8698cd1f-ce62-4fe5-ad5f-20c0c0180e8d",
        },
      }
    )
      .then((res) => res.json())
      .then((json) => setSelectedTrack(json.data));
  }, [trackId]);

  return (
    <div>
      <h3>Details</h3>
      {!selectedTrack && !trackId && "Track is not selected"}
      {!selectedTrack && trackId && "Loading.."}
      {selectedTrack && trackId && selectedTrack.id !== trackId && "Loading.."}
      {selectedTrack && (
        <div>
          <h3>{selectedTrack.attributes.title}</h3>
          <h4>Lyrics</h4>
          <p>{selectedTrack.attributes.lyrics ?? "no lyrics"}</p>
        </div>
      )}
    </div>
  );
}

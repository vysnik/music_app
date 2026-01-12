import { useState } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { PageTitle } from "./PageTitle";
import { SiderbarMenu } from "./SiderbarMenu";
import { TrackDetail } from "./TrackDetail";
import { TracksList } from "./TracksList";

export function MainPage() {
  const [trackId, setTrackId] = useState(null);

  const handleTackSelect = (id) => {
    setTrackId(id);
  };

  return (
    <div>
      <Header />
      <SiderbarMenu />
      <PageTitle />
      <div style={{ display: "flex" }}>
        <TracksList
          selectedTrackId={trackId}
          onTrackSelect={handleTackSelect}
        />
        <TrackDetail trackId={trackId} />
      </div>
      <Footer />
    </div>
  );
}

export function TrackItem({ track, isSelected, onSelect }) {
  const handleClick = () => {
    onSelect?.(track.id);
  };

  return (
    <li
      key={track.id}
      style={{
        border: isSelected ? "1px solid red" : "none",
      }}
    >
      <div onClick={handleClick}>{track.attributes.title}</div>
      <audio controls src={track.attributes.attachments[0].url}></audio>
    </li>
  );
}

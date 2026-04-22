export default function ProgressBar({ percent }) {
  return (
    <div style={{ background: "#ddd", height: "10px" }}>
      <div
        style={{
          width: `${percent}%`,
          height: "10px",
          background: "green",
        }}
      />
    </div>
  );
}
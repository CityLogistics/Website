export default function Loader({ dotCount = 3 }) {
  const items = [];
  for (let i = 0; i < dotCount; i++) {
    items.push(i);
  }

  return (
    <div className="loader bg-white p-5 rounded-full flex space-x-3 justify-center">
      {items.map((v) => (
        <div
          key={v}
          className="w-3 h-3 bg-primary rounded-full animate-bounce"
        />
      ))}
    </div>
  );
}

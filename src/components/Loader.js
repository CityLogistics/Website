import { twMerge } from "tailwind-merge";

export default function Loader({
  containerClassess,
  dotClassess,
  dotCount = 3,
}) {
  const items = [];
  for (let i = 0; i < dotCount; i++) {
    items.push(i);
  }

  return (
    <div
      className={twMerge(
        "loader bg-transparent p-5 rounded-full flex space-x-3 justify-center",
        containerClassess
      )}
    >
      {items.map((v) => (
        <div
          key={v}
          className={twMerge(
            "w-3 h-3 bg-primary rounded-full animate-bounce",
            dotClassess
          )}
        />
      ))}
    </div>
  );
}

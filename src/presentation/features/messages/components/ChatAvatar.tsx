import { resolveImageUrl } from "@/presentation/utils/image";

interface ChatAvatarProps {
  name?: string;
  src?: string;
  size?: "sm" | "md";
}

export function ChatAvatar({ name = "Usuario", src, size = "md" }: ChatAvatarProps) {
  const dimension = size === "sm" ? "w-9 h-9 text-xs" : "w-11 h-11 text-sm";
  const initials = name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");

  if (src) {
    return <img src={resolveImageUrl(src)} alt={name} className={`${dimension} rounded-full object-cover shrink-0`} />;
  }
  return (
    <div className={`${dimension} rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0`}>
      {initials || "?"}
    </div>
  );
}

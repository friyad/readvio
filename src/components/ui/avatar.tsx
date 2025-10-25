import { cn } from "@/lib/utils";

type AvatarProps = {
  name?: string;
  className?: string;
};

export default function Avatar({ name, className }: AvatarProps) {
  const initials = (name ?? "Guest")
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full bg-accent-blue/10 text-sm font-medium text-primary-blue",
        className
      )}
    >
      {initials}
    </div>
  );
}

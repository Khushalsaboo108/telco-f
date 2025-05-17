import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  username: string;
  imageUrl?: string;
  size?: "sm" | "md" | "lg";
}

function UserIcon({ username, imageUrl, size = "md" }: UserAvatarProps) {
  const firstLetter = username ? username[0].toUpperCase() : "?";

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };

  // Generate a consistent color based on the username
  const colors = [
    "bg-red-500 dark:bg-red-700",
    "bg-green-500 dark:bg-green-700",
    "bg-blue-500 dark:bg-blue-700",
    "bg-yellow-500 dark:bg-yellow-700",
    "bg-purple-500 dark:bg-purple-700",
    "bg-pink-500 dark:bg-pink-700",
    "bg-indigo-500 dark:bg-indigo-700",
  ];
  const colorIndex =
    username.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    colors.length;
  const bgColor = colors[colorIndex];

  return (
    <Avatar
      className={cn(sizeClasses[size], "ring-2 ring-white dark:ring-gray-800")}
    >
      <AvatarImage src={imageUrl} alt={username} />
      <AvatarFallback
        className={cn("font-medium text-white dark:text-gray-200", bgColor)}
      >
        {firstLetter}
      </AvatarFallback>
    </Avatar>
  );
}

export default UserIcon;

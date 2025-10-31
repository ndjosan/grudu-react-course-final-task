import styles from "./UserAvatar.module.css";

interface UserAvatarProps {
  name?: string;
  credentialsClass?: string;
  nameClass?: string;
}

export default function UserAvatar({
  name,
  credentialsClass,
  nameClass,
}: UserAvatarProps) {
  const credentials = name
    ? name
        .split(" ")
        .map((part) => part[0].toUpperCase())
        .join("")
    : "";

  return (
    <>
      <div className={`${styles.credentials} ${credentialsClass}`}>
        {credentials}
      </div>
      <p className={`${styles.name} ${nameClass}`}>{name}</p>
    </>
  );
}

import type { User } from '@/types/domain';

export function AvatarCluster({ users }: { users: User[] }) {
  return (
    <div className="flex -space-x-2">
      {users.slice(0, 4).map((user) => (
        <img
          key={user.id}
          src={user.avatar}
          alt={user.name}
          className="h-8 w-8 rounded-full border-2 border-bg object-cover"
        />
      ))}
    </div>
  );
}

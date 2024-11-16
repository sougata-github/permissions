export type Comment = {
  id: string;
  body: string;
  authorId: string;
  createdAt: Date;
};

export type Todo = {
  id: string;
  title: string;
  userId: string;
  completed: boolean;
  invitedUsers: string[];
};

export type Role = "admin" | "moderator" | "user";
export type User = { blockedBy: string[]; roles: Role[]; id: string };

type PermissionCheck<Key extends keyof Permissions> =
  | boolean
  | ((user: User, data: Permissions[Key]["dataType"]) => boolean);

export type RolesWithPermissions = {
  [R in Role]: Partial<{
    [Key in keyof Permissions]: Partial<{
      [Action in Permissions[Key]["action"]]: PermissionCheck<Key>;
    }>;
  }>;
};

export type Permissions = {
  comments: {
    dataType: Comment;
    action: "view" | "create" | "update";
  };
  todos: {
    // Can do something like Pick<Todo, "userId"> to get just the rows you use
    dataType: Todo;
    action: "view" | "create" | "update" | "delete";
  };
};

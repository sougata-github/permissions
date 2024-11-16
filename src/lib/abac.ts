import {
  Comment,
  Permissions,
  RolesWithPermissions,
  Todo,
  User,
} from "@/types";

const ROLES = {
  admin: {
    comments: {
      view: true,
      create: true,
      update: true,
    },
    todos: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },
  },
  moderator: {
    comments: {
      view: true,
      create: true,
      update: true,
    },
    todos: {
      view: true,
      create: true,
      update: true,
      delete: (user: User, todo: Todo) => todo.completed,
    },
  },
  user: {
    comments: {
      view: (user: User, comment: Comment) =>
        !user.blockedBy.includes(comment.authorId),
      create: true,
      update: (user: User, comment: Comment) => comment.authorId === user.id,
    },
    todos: {
      view: (user: User, todo: Todo) => !user.blockedBy.includes(todo.userId),
      create: true,
      update: (user: User, todo: Todo) =>
        todo.userId === user.id || todo.invitedUsers.includes(user.id),
      delete: (user: User, todo: Todo) =>
        (todo.userId === user.id || todo.invitedUsers.includes(user.id)) &&
        todo.completed,
    },
  },
} as const satisfies RolesWithPermissions;

//Resource -> Comments or Todos, generic because it can be either of these.
export function hasPermission<Resource extends keyof Permissions>(
  user: User,
  resource: Resource,
  action: Permissions[Resource]["action"],
  data?: Permissions[Resource]["dataType"]
) {
  return user.roles.some((role) => {
    const permission = (ROLES as RolesWithPermissions)[role][resource]?.[
      action
    ];
    if (permission == null) return false;

    if (typeof permission === "boolean") return permission;
    return data != null && permission(user, data);
  });
}

// USAGE:
const user: User = { blockedBy: ["2"], id: "1", roles: ["user"] };

const todo: Todo = {
  completed: false,
  id: "3",
  invitedUsers: [],
  title: "Test Todo",
  userId: "1",
};

// Can create a comment
hasPermission(user, "comments", "create");

// Can view the `todo` Todo
hasPermission(user, "todos", "view", todo);

// Can view all todos
hasPermission(user, "todos", "view");

import { Todo, User } from "@/types";
import { Button } from "./ui/button";
import { hasPermission } from "@/lib/abac";

const ToDoButtonCheck = ({
  action,
  todo,
  user,
}: {
  action: "view" | "update" | "delete" | "create";
  todo: Todo;
  user: User;
}) => {
  return (
    <Button
      variant={
        hasPermission(user, "todos", action, todo) ? "default" : "destructive"
      }
    >
      {action}
    </Button>
  );
};

export default ToDoButtonCheck;

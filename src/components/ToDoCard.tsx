import { CheckIcon, XIcon } from "lucide-react";
import ToDoButtonCheck from "./ToDoCheckButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Todo, User } from "@/types";

const TodoCard = ({ todo, user }: { todo: Todo; user: User }) => {
  const { title, userId, completed, invitedUsers } = todo;

  return (
    <Card className="cursor-pointer mt-2">
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          {completed ? (
            <CheckIcon className="text-green-500" />
          ) : (
            <XIcon className="text-destructive" />
          )}
          {title}
        </CardTitle>
        <CardDescription>
          Access: User {userId}{" "}
          {invitedUsers.length > 0 && `+ User ${invitedUsers.join(", User")}`}
        </CardDescription>
        <CardContent className="flex flex-wrap px-0 py-4 gap-4">
          <ToDoButtonCheck action="view" todo={todo} user={user} />
          <ToDoButtonCheck action="update" todo={todo} user={user} />
          <ToDoButtonCheck action="delete" todo={todo} user={user} />
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default TodoCard;

import { hasPermission } from "@/lib/abac";
import { Button } from "./ui/button";
import { User } from "@/types";

const GeneralButtonCheck = ({
  resource,
  action,
  user,
}: {
  resource: "todos" | "comments";
  action: "view" | "create" | "update" | "delete";
  user: User;
}) => {
  return (
    <Button
      variant={
        hasPermission(user, resource, action) ? "default" : "destructive"
      }
    >
      {action} any
    </Button>
  );
};

export default GeneralButtonCheck;

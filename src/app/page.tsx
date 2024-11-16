import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { hasPermission, Role } from "@/lib/auth";
import { Trash } from "lucide-react";

const user: { id: string; role: Role } = { id: "1", role: "user" };

const authorId = "1";

export default function Home() {
  return (
    <div className="cotainer mx-auto px-4 my-6">
      <Card>
        <CardHeader>Comment</CardHeader>
        <CardContent>Some random comment</CardContent>
        {hasPermission(user, "delete:comments") ||
          (hasPermission(user, "delete:ownComments") &&
            user.id === authorId && (
              <CardFooter>
                <Button variant="destructive">
                  delete <Trash className="text-white size-4" />
                </Button>
              </CardFooter>
            ))}
      </Card>
    </div>
  );
}

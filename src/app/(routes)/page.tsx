import GeneralButtonCheck from "@/components/GeneralButtonCheck";
import TodoCard from "@/components/ToDoCard";

//for rbac
// import { hasPermission } from "@/lib/rbac";

//for abac
import { todos } from "@/data";
import { Todo, User } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// const authorId = "1";
// export default async function Home() {
//   const { sessionClaims, userId } = await auth();

//   if (userId === null || sessionClaims === null) {
//     redirect("/sign-in");
//   }

//   const user = { id: userId, roles: sessionClaims.roles };

//   return (
//     <div className="cotainer mx-auto px-4 my-6">
//       <div className="my-4">{sessionClaims?.roles || "not signed in!"}</div>

//       <Card>
//         <CardHeader>Comment</CardHeader>
//         <CardContent>Some random comment</CardContent>
//         {(hasPermission(user, "delete:comments") ||
//           (hasPermission(user, "delete:ownComments") &&
//             user.id === authorId)) && (
//           <CardFooter>
//             <Button variant="destructive">
//               delete <Trash className="text-white size-4" />
//             </Button>
//           </CardFooter>
//         )}
//       </Card>
//     </div>
//   );
// }

const page = async () => {
  const { sessionClaims, userId } = await auth();

  if (userId === null || sessionClaims === null) {
    redirect("/sign-in");
  }

  const user: User = {
    roles: sessionClaims.roles,
    id: "1",
    blockedBy: [],
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">
        User Info: <span>id = {user.id}</span>,{" "}
        <span>role = {user.roles.join(", ")}</span>
      </h1>

      <div className="flex gap-4 mb-4">
        <GeneralButtonCheck resource="todos" action="view" user={user} />
        <GeneralButtonCheck resource="todos" action="create" user={user} />
        <GeneralButtonCheck resource="todos" action="update" user={user} />
        <GeneralButtonCheck resource="todos" action="delete" user={user} />
      </div>

      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 mt-8">
        {todos.map((todo: Todo) => (
          <li key={todo.id}>
            <TodoCard todo={todo} user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default page;

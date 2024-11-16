import { Todo } from "@/types";

export const todos: Todo[] = [
  {
    id: "1",
    title: "Record Video",
    userId: "1",
    completed: false,
    invitedUsers: [],
  },
  {
    id: "2",
    title: "Learn Auth",
    userId: "1",
    completed: true,
    invitedUsers: [],
  },
  {
    id: "3",
    title: "Build Project",
    userId: "2",
    completed: false,
    invitedUsers: [],
  },
  {
    id: "4",
    title: "Master Auth",
    userId: "2",
    completed: true,
    invitedUsers: ["1", "3"],
  },
];

import { Pencil, Trash2 } from "lucide-react";
import { type RouterOutputs } from "../utils/api";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type Note = RouterOutputs["note"]["getAll"][0];

export const NoteCard = ({
  note,
  onDelete,
}: {
  note: Note;
  onDelete: () => void;
}) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
        </CardHeader>
        <CardContent>{note.content}</CardContent>
        <CardFooter className="flex justify-end gap-x-3">
          <Button variant="outline" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button onClick={onDelete} variant="secondary" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

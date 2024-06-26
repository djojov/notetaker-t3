import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { api, type RouterOutputs } from "../utils/api";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

type Note = RouterOutputs["note"]["getAll"][0];

export const NoteCard = ({ note }: { note: Note }) => {
  const [noteContent, setNoteContent] = useState<string>(note.content);
  const [noteTitle, setNoteTitle] = useState<string>(note.title);
  const [updateNoteDialog, setUpdateNoteDialog] = useState(false);

  const trpc = api.useUtils();
  const { toast } = useToast();

  const { mutate: updateNote } = api.note.update.useMutation({
    onSettled: async () => {
      await trpc.note.getAll.invalidate();
    },
  });

  const { mutate: deleteNote } = api.note.delete.useMutation({
    onSettled: async () => {
      await trpc.note.getAll.invalidate();
    },
  });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
        </CardHeader>
        <CardContent>{note.content}</CardContent>
        <CardFooter className="flex justify-end gap-x-3">
          <Dialog open={updateNoteDialog} onOpenChange={setUpdateNoteDialog}>
            <DialogTrigger asChild>
              <Button
                onSelect={() => {
                  setUpdateNoteDialog(true);
                }}
                variant="outline"
                size="icon"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit your note</DialogTitle>
              </DialogHeader>
              <div className="w-full">
                <Label htmlFor="noteTitle">Title</Label>
                <Input
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.currentTarget.value)}
                  type="text"
                  id="noteTitle"
                  placeholder="Change title..."
                />
              </div>
              <div className="w-full">
                <Label htmlFor="noteContent">Content</Label>
                <Textarea
                  value={noteContent}
                  onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setNoteContent(event.target.value)
                  }
                  placeholder="Change note..."
                  id="noteContent"
                />
              </div>
              <DialogFooter className="mt-6">
                <Button
                  variant="outline"
                  onClick={() => setUpdateNoteDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  onClick={() => {
                    setUpdateNoteDialog(false);
                    updateNote({
                      id: note.id,
                      title: noteTitle,
                      content: noteContent,
                    });
                    toast({
                      title: "ℹ️ Note updated",
                      description: "Your note has been updated successfully.",
                    });
                  }}
                >
                  Update
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="secondary" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your note from your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button
                  variant="destructive"
                  onClick={() => {
                    deleteNote({ id: note.id });
                    toast({
                      title: "🗑️ Note deleted",
                      description: "Your note has been deleted successfully.",
                    });
                  }}
                >
                  Continue
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </>
  );
};

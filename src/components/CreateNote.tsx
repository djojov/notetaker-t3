import { CirclePlus } from "lucide-react";
import { useState } from "react";
import { type RouterOutputs } from "~/utils/api";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

type Folder = RouterOutputs["folder"]["getAll"][0];

export const CreateNote = ({
  onSave,
  selectedFolder,
}: {
  onSave: (note: { title: string; content: string }) => void;
  selectedFolder?: Folder | null;
}) => {
  const [noteContent, setNoteContent] = useState<string>("");
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [addNoteDialog, setAddNoteDialog] = useState(false);

  const { toast } = useToast();

  return (
    <>
      <Dialog open={addNoteDialog} onOpenChange={setAddNoteDialog}>
        <DialogTrigger asChild>
          <Button
            onSelect={() => {
              setAddNoteDialog(true);
            }}
            variant="default"
          >
            <CirclePlus className="mr-2 h-5 w-5" /> New note
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Take a note</DialogTitle>
            <DialogDescription>
              Create a new note in&nbsp;
              <span className="font-bold text-primary">
                {selectedFolder?.title ?? "Notes"}
              </span>
            </DialogDescription>
          </DialogHeader>
          {/* <div className=""> */}
          <div className="w-full">
            <Label htmlFor="noteTitle">Title</Label>
            <Input
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.currentTarget.value)}
              type="text"
              id="noteTitle"
              placeholder="Enter a title..."
            />
          </div>
          <div className="w-full">
            <Label htmlFor="noteContent">Content</Label>
            <Textarea
              value={noteContent}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                setNoteContent(event.target.value)
              }
              placeholder="Type a note..."
              id="noteContent"
            />
          </div>
          {/* </div> */}
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setAddNoteDialog(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={() => {
                setAddNoteDialog(false);
                onSave({
                  title: noteTitle,
                  content: noteContent,
                });
                setNoteTitle("");
                setNoteContent("");
                toast({
                  title: "✅ Note created",
                  description: "Your note has been created successfully.",
                });
              }}
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

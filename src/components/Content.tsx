import { PlusCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { NoteCard } from "~/components/NoteCard";
import { api, type RouterOutputs } from "~/utils/api";
import { NoteEditor } from "./NoteEditor";
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

type Folder = RouterOutputs["folder"]["getAll"][0];

export const Content: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [addLabelDialog, setAddLabelDialog] = useState(false);
  const [initialFolderCreated, setInitialFolderCreated] = useState(false);

  const { data: sessionData } = useSession();

  const { data: folders, refetch: refreshFolders } = api.folder.getAll.useQuery(
    undefined,
    {
      enabled: sessionData?.user !== undefined,
    },
  );

  const createInitialFolder = api.folder.createInitial.useMutation({
    onSuccess: () => {
      void refreshFolders();
    },
  });

  const createFolder = api.folder.create.useMutation({
    onSuccess: () => {
      void refreshFolders();
    },
  });

  useEffect(() => {
    if (folders?.length === 0 && !initialFolderCreated) {
      void createInitialFolder.mutate({});
      setInitialFolderCreated(true);
    }
  }, [folders, initialFolderCreated, createInitialFolder]);

  const { data: notes, refetch: refreshNotes } = api.note.getAll.useQuery(
    {
      folderId: selectedFolder?.id ?? folders?.[0]?.id ?? "",
    },
    {
      enabled: sessionData?.user !== undefined && selectedFolder !== null,
    },
  );

  const createNote = api.note.create.useMutation({
    onSuccess: () => {
      void refreshNotes();
    },
  });

  const deleteNote = api.note.delete.useMutation({
    onSuccess: () => {
      void refreshNotes();
    },
  });

  useEffect(() => {
    setSelectedFolder(selectedFolder ?? folders?.[0] ?? null);
  }, [selectedFolder, folders]);

  return (
    <div className="container mx-auto mt-5 grid grid-cols-4 gap-2">
      <div className="px-2">
        <ul className="menu rounded-box bg-base-100 w-56 p-2">
          {folders?.map((folder) => (
            <li key={folder.id}>
              <a
                href="#"
                onClick={(evt) => {
                  evt.preventDefault();
                  setSelectedFolder(folder);
                }}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  selectedFolder?.id === folder.id
                    ? ""
                    : "text-muted-foreground"
                }`}
              >
                {folder.title}
              </a>
            </li>
          ))}
        </ul>
        <div className="divider"></div>
        <Dialog open={addLabelDialog} onOpenChange={setAddLabelDialog}>
          <DialogTrigger asChild>
            <Button
              onSelect={() => {
                setAddLabelDialog(true);
              }}
              variant="secondary"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add label
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new label</DialogTitle>
              <DialogDescription>
                Add new label to categorize your notes.
              </DialogDescription>
            </DialogHeader>
            <Input
              className="mb-8 mt-5"
              id="newLabelInput"
              type="text"
              placeholder="Create a new label..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  createFolder.mutate({
                    title: e.currentTarget.value,
                  });
                  e.currentTarget.value = "";
                  setAddLabelDialog(false);
                }
              }}
            />
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setAddLabelDialog(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={() => {
                  const newLabelInput = document.getElementById(
                    "newLabelInput",
                  ) as HTMLInputElement;
                  createFolder.mutate({
                    title: newLabelInput.value,
                  });
                  newLabelInput.value = "";
                  setAddLabelDialog(false);
                }}
              >
                Add label
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="col-span-3">
        <NoteEditor
          onSave={({ title, content }) => {
            void createNote.mutate({
              title,
              content,
              folderId: selectedFolder?.id ?? folders?.[0]?.id ?? "",
            });
          }}
        />
        <div>
          {notes?.map((note) => (
            <div key={note.id} className="mt-5">
              <NoteCard
                note={note}
                onDelete={() => void deleteNote.mutate({ id: note.id })}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import { FolderClosed, FolderOpen, FolderPlus } from "lucide-react";
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
    <div className="container mx-auto my-12 grid grid-cols-1 gap-2 md:grid-cols-4">
      <div>
        <ul className="menu rounded-box bg-base-100 w-56">
          {folders?.map((folder) => (
            <li key={folder.id} className="mb-2">
              <a
                href="#"
                onClick={(evt) => {
                  evt.preventDefault();
                  setSelectedFolder(folder);
                }}
                className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
                  selectedFolder?.id === folder.id
                    ? ""
                    : "text-muted-foreground"
                }`}
              >
                {selectedFolder?.id === folder.id ? (
                  <FolderOpen className="mr-2 h-5 w-5" />
                ) : (
                  <FolderClosed className="mr-2 h-5 w-5" />
                )}

                {folder.title}
              </a>
            </li>
          ))}
        </ul>
        <Dialog open={addLabelDialog} onOpenChange={setAddLabelDialog}>
          <DialogTrigger asChild>
            <Button
              className="mt-8"
              onSelect={() => {
                setAddLabelDialog(true);
              }}
              variant="outline"
            >
              <FolderPlus className="mr-2 h-5 w-5" /> Add folder
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create new folder</DialogTitle>
              <DialogDescription>
                Add folder to organize your notes
              </DialogDescription>
            </DialogHeader>
            <Input
              className="mb-8 mt-5"
              id="newFolderInput"
              type="text"
              placeholder="Folder name..."
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
                  const newFolderInput = document.getElementById(
                    "newFolderInput",
                  ) as HTMLInputElement;
                  createFolder.mutate({
                    title: newFolderInput.value,
                  });
                  newFolderInput.value = "";
                  setAddLabelDialog(false);
                }}
              >
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="col-span-3">
        <div className="flex justify-end">
          <NoteEditor
            selectedFolder={selectedFolder}
            onSave={({ title, content }) => {
              void createNote.mutate({
                title,
                content,
                folderId: selectedFolder?.id ?? folders?.[0]?.id ?? "",
              });
            }}
          />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {notes?.map((note) => (
            <div key={note.id}>
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

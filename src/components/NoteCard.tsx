import { useState } from "react";

import ReactMarkdown from "react-markdown";

import { type RouterOutputs } from "../utils/api";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Button } from "./ui/button";
import { Trash, Trash2 } from "lucide-react";

type Note = RouterOutputs["note"]["getAll"][0];

export const NoteCard = ({
  note,
  onDelete,
}: {
  note: Note;
  onDelete: () => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="mt-8 rounded-md border border-zinc-50 bg-base-100 p-6 shadow-lg"
    >
      <CollapsibleTrigger className="text-xl font-bold">
        {note.title}
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-8 flex flex-col">
        {note.content}
        <Button onClick={onDelete} variant="outline" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </CollapsibleContent>
    </Collapsible>
  );
};

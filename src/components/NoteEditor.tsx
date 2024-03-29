import { useState } from "react";

import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import CodeMirror from "@uiw/react-codemirror";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

export const NoteEditor = ({
  onSave,
}: {
  onSave: (note: { title: string; content: string }) => void;
}) => {
  const [code, setCode] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  return (
    <>
      <div className="mb-5 grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="noteTitle">Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          type="text"
          id="noteTitle"
          placeholder="Enter your title"
        />
      </div>

      <div className="grid w-full gap-1.5">
        <Label htmlFor="noteContent">Your note</Label>
        <Textarea
          value={code}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            setCode(event.target.value)
          }
          placeholder="Type your note..."
          id="noteContent"
        />
      </div>
      <div className="card-actions justify-end">
        <button
          onClick={() => {
            onSave({
              title,
              content: code,
            });
            setCode("");
            setTitle("");
          }}
          className="btn btn-primary mb-8 mr-8"
          disabled={title.trim().length === 0 || code.length === 0}
        >
          Save
        </button>
      </div>
    </>
  );
};

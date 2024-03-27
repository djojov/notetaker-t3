import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import React, { useState } from "react";
import Header from "~/components/Header";
import { NoteCard } from "~/components/NoteCard";
import { NoteEditor } from "~/components/NoteEditor";

import { api, type RouterOutputs } from "~/utils/api";

export default function Home() {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Notetaker T3</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        {sessionData?.user ? (
          <Content />
        ) : (
          <div className="flex h-screen flex-col items-center justify-center">
            <p className="mb-10 text-2xl">Sign in to view your notes</p>
            <button className="btn btn-primary" onClick={() => void signIn()}>
              Sign in
            </button>
          </div>
        )}
      </main>
    </>
  );
}

type Topic = RouterOutputs["topic"]["getAll"][0];

const Content: React.FC = () => {
  const { data: sessionData } = useSession();

  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const { data: topics, refetch: refreshTopics } = api.topic.getAll.useQuery(
    undefined,
    {
      enabled: sessionData?.user !== undefined,
    },
  );

  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      void refreshTopics();
    },
  });

  const { data: notes, refetch: refreshNotes } = api.note.getAll.useQuery(
    {
      topicId: selectedTopic?.id ?? "",
    },
    {
      enabled: sessionData?.user !== undefined && selectedTopic !== null,
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

  return (
    <div className="mx-5 mt-5 grid grid-cols-4 gap-2">
      <div className="px-2">
        <ul className="menu w-56 rounded-box bg-base-100 p-2">
          {topics?.map((topic) => (
            <li key={topic.id}>
              <a
                href="#"
                onClick={(evt) => {
                  evt.preventDefault();
                  setSelectedTopic(topic);
                }}
              >
                {topic.title}
              </a>
            </li>
          ))}
        </ul>
        <div className="divider"></div>
        <input
          type="text"
          placeholder="New Topic"
          className="input input-sm input-bordered w-full"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createTopic.mutate({
                title: e.currentTarget.value,
              });
              e.currentTarget.value = "";
            }
          }}
        />
      </div>
      <div className="col-span-3">
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
        <NoteEditor
          onSave={({ title, content }) => {
            void createNote.mutate({
              title,
              content,
              topicId: selectedTopic?.id ?? "",
            });
          }}
        />
      </div>
    </div>
  );
};

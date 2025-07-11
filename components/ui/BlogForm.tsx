"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BlogForm({ onSubmit }: { onSubmit: (url: string) => void }) {
  const [url, setUrl] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(url);
      }}
      className="flex flex-col gap-4 max-w-md mx-auto"
    >
      <Input placeholder="Enter blog URL" value={url} onChange={(e) => setUrl(e.target.value)} />
      <Button type="submit">Summarize Blog</Button>
    </form>
  );
}

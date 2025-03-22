'use client';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function MarkdownEditor({
    initialContent = '',
    onSave
}: {
    initialContent?: string;
    onSave: (content: string) => void;
}) {
    const [content, setContent] = useState(initialContent);

    return (
        <div className="grid grid-cols-2 gap-4">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border p-2 h-64"
                placeholder="Write in markdown..."
            />
            <div className="border p-2">
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
            <button
                onClick={() => onSave(content)}
                className="col-span-2 bg-blue-500 text-white p-2 rounded"
            >
                Save
            </button>
        </div>
    );
}
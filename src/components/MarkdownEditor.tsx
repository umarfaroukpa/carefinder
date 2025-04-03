'use client';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default function MarkdownEditor({
    initialContent = '',
    onSave,
}: {
    initialContent?: string;
    onSave: (content: string) => void;
}) {
    const [content, setContent] = useState(initialContent);

    useEffect(() => {
        setContent(initialContent);
    }, [initialContent]);

    return (
        <div className="grid grid-cols-2 gap-4">
            <textarea
                value={content}
                onChange={(e) => {
                    setContent(e.target.value);
                    onSave(e.target.value); // Update form field in real-time
                }}
                className="border p-2 h-64 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write in markdown (e.g., **bold**, [link](url), etc.)"
            />
            <div className="border p-2 rounded-md h-64 overflow-auto">
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
        </div>
    );
}
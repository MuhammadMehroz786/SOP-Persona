'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { useEffect } from 'react';

interface SOPEditorProps {
    content: any;
    onChange: (content: any) => void;
    readOnly?: boolean;
}

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="border-b border-gray-200 p-2 flex flex-wrap gap-2 sticky top-0 bg-white z-10">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`px-2 py-1 rounded ${editor.isActive('bold') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
                Bold
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={`px-2 py-1 rounded ${editor.isActive('italic') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
                Italic
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={`px-2 py-1 rounded ${editor.isActive('strike') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
                Strike
            </button>
            <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`px-2 py-1 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
                H1
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`px-2 py-1 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
                H2
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`px-2 py-1 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
                H3
            </button>
            <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`px-2 py-1 rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
                Bullet List
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`px-2 py-1 rounded ${editor.isActive('orderedList') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
                Ordered List
            </button>
            <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
            <button
                onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                className="px-2 py-1 rounded hover:bg-gray-100"
            >
                Add Table
            </button>
        </div>
    );
};

export default function SOPEditor({ content, onChange, readOnly = false }: SOPEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
        ],
        content,
        editable: !readOnly,
        onUpdate: ({ editor }) => {
            onChange(editor.getJSON());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[500px] p-6',
            },
        },
    });

    // Update editor content if prop changes externally (e.g., after AI generation)
    useEffect(() => {
        if (editor && content && JSON.stringify(content) !== JSON.stringify(editor.getJSON())) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden min-h-[600px] flex flex-col">
            {!readOnly && <MenuBar editor={editor} />}
            <div className="flex-grow overflow-y-auto bg-white">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}

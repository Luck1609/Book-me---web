
import type { InertiaFormProps } from '@inertiajs/react';
import { Placeholder } from '@tiptap/extensions';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import type { UseHttpProps } from 'node_modules/@inertiajs/react/types/useHttp';
import { useEffect } from 'react';
import { cn, getNestedValue, setNestedValue } from '@/lib/utils';
import { RTHeadings, RTBold, RTItalic, RTUnorderedList, RTOrderedList } from './toolbars';

type Props<T extends object> = {
  name: string;
  className?: string;
  form?: InertiaFormProps<T> | UseHttpProps<T>
};

export default function RichEditor<T extends object>({ name, form, className }: Props<T>) {
  const initialContent = getNestedValue(form?.data, name)
  
  const editor = useEditor({
    content: initialContent,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start writing something...',
      }),
    ],
    onUpdate: ({ editor }) => {
      if (form) {
        setNestedValue(form.data, name, editor.getHTML());
      }
    },
  });

  useEffect(() => {
    if (!editor) return;

    const incomingContent = initialContent || '';

    if (incomingContent !== editor.getHTML()) {
      editor.commands.setContent(incomingContent);
    }
  }, [editor, initialContent]);

  return (
    <div className={cn("border border-border", className)}>
      {editor && (
        <div className="flex items-center gap-2 border-b p-3">
          <RTHeadings editor={editor} />
          <RTBold editor={editor} />
          <RTItalic editor={editor} />
          <RTUnorderedList editor={editor} />
          <RTOrderedList editor={editor} />
        </div>
      )}

      {/* <EditorContent editor={editor} className="prose p-2" /> */}
      <div className="prose max-w-none [&_.ProseMirror]:mt-0 [&_.ProseMirror]:max-h-[500px] [&_.ProseMirror]:min-h-[150px] [&_.ProseMirror]:overflow-auto [&_.ProseMirror]:p-2 [&_.ProseMirror]:outline-none [&_.ProseMirror>p]:mt-0">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

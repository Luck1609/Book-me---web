import type { Editor } from '@tiptap/react';
import { Bold, Heading, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Italic, ListIcon, ListOrdered, Redo, Undo } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'


const toolbarStyle = 'rounded-[6px] p-1 text-gray-500 transition delay-150 hover:bg-black hover:text-white';
const activeStyle = 'bg-black text-white';

type Level = 1 | 2 | 3 | 4 | 5 | 6;
const headings = [
  {
    icon: Heading1,
    label: 'Heading 1',
    level: 1 as Level,
  },
  {
    icon: Heading2,
    label: 'Heading 2',
    level: 2 as Level,
  },
  {
    icon: Heading3,
    label: 'Heading 3',
    level: 3 as Level,
  },
  {
    icon: Heading4,
    label: 'Heading 4',
    level: 4 as Level,
  },
  {
    icon: Heading5,
    label: 'Heading 5',
    level: 5 as Level,
  }, {
    icon: Heading6,
    label: 'Heading 6',
    level: 6 as Level,
  },
]

export const RTHeadings = ({ editor, className = '' }: { editor: Editor, className?: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn('', toolbarStyle)}>
        <Heading size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-12!">
        {
          headings.map(({level, ...heading}, index) => (
            <DropdownMenuItem
              key={index}
              title={heading.label}
              className={cn(
                "h-8",
                toolbarStyle, 
                editor.isActive('heading', { level }) && activeStyle, 
                className
              )}
              onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
            >
              <heading.icon />
            </DropdownMenuItem>
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const RTBold = ({ editor, className = '' }: { editor: Editor, className?: string }) => {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={() => editor.chain().focus().toggleBold().run()}
      className={cn(toolbarStyle, editor.isActive('bold') && activeStyle, 'h-8 w-8', className)}
    >
      <Bold />
    </Button>
  )
}

export const RTItalic = ({ editor, className = '' }: { editor: Editor, className?: string }) => {
  return (
    <Button
      title="Italic"
      type="button"
      variant="ghost"
      onClick={() => editor.chain().focus().toggleItalic().run()}
      className={cn(toolbarStyle, editor.isActive('italic') && activeStyle, 'h-8 w-8', className)}
    >
      <Italic size={20} />
    </Button>
  )
}

export const RTOrderedList = ({ editor, className = '' }: { editor: Editor, className?: string }) => {
  return (
    <Button
      title="Ordered Item"
      type="button"
      variant="ghost"
      onClick={() => editor.chain().focus().toggleOrderedList().run()}
      className={cn(toolbarStyle, editor.isActive('orderedList') && activeStyle, 'h-8 w-8', className)}
    >
      <ListOrdered size={20} />
    </Button>
  )
}

export const RTUnorderedList = ({ editor, className = '' }: { editor: Editor, className?: string }) => {
  return (
    <Button
      title="Unordered Item"
      type="button"
      variant="ghost"
      onClick={() => editor.chain().focus().toggleBulletList().run()}
      className={cn(toolbarStyle, editor.isActive('bulletList') && activeStyle, 'h-8 w-8', className)}
    >
      <ListIcon size={20} />
    </Button>
  )
}

export const RTUndo = ({ editor, className = '' }: { editor: Editor, className?: string }) => {
  return (
    <Button
      title="Undo (Ctrl or Cmd + Z)"
      type="button"
      variant="ghost"
      className={cn(toolbarStyle, editor.isActive('undo') && activeStyle, 'h-8 w-8', className)}
      onClick={() => editor.chain().focus().undo().run()}
    >
      <Undo size={20} />
    </Button>
  )
}

export const RTRedo = ({ editor, className = '' }: { editor: Editor, className?: string }) => {
  return (
    <Button
      title="Redo (Ctrl or Cmd + Y)"
      type="button"
      variant="ghost"
      className={cn(toolbarStyle, editor.isActive('redo') && activeStyle, 'h-8 w-8', className)}
      onClick={() => editor.chain().focus().redo().run()}
    >
      <Redo size={20} />
    </Button>
  )
}


import DOMPurify from 'dompurify';
import { cn } from '@/lib/utils';

export default function RenderRichContent({ content, className }: { content: string; className?: string }) {
  if (!content) {
return;
}

  const purifiedContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['h1', 'h2', 'h3', 'strong', 'italic', 'p', 'em', 'ol', 'ul', 'li'],
  });

  return <div className={cn('prose max-w-2xl', className)} dangerouslySetInnerHTML={{ __html: purifiedContent }}></div>;
}

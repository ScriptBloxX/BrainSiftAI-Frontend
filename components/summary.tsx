import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type SummaryItem = 
    | { text: string; type: 'heading' }
    | { text: string; type: 'paragraph' }
    | { type: 'list'; items: string[] }
    | { text: string; type: 'code'; language?: string };

interface SummaryProps {
    content: SummaryItem[];
}

export default function Summary({ content }: SummaryProps) {
    return (
      <div className="space-y-4">
        {content.map((block, index) => {
          if (block.type === "heading") {
            return <h3 key={index} className="text-xl font-semibold mt-6">{block.text}</h3>;
          } else if (block.type === "paragraph") {
            return <p key={index}>{block.text}</p>;
          } else if (block.type === "list" && block.items) {
            return (
              <ul key={index} className="list-disc pl-6 space-y-1">
                {block.items.map((listItem, i) => (
                  <li key={i}>{listItem}</li>
                ))}
              </ul>
            );
          } else if (block.type === "code") {
            return (
              <pre key={index} className="bg-muted p-2 rounded-md overflow-x-auto my-4">
                <SyntaxHighlighter 
                  key={index} 
                  language={block.language || "javascript"} 
                  style={atomOneDark}
                  customStyle={{ borderRadius: '0.375rem' }}
                >
                  {block.text}
                </SyntaxHighlighter>
              </pre>
            );
          }
          return null;
        })}
      </div>
    );
}


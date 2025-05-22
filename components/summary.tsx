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
        <div>
            {content.map((block, index) => {
        switch (block.type) {
          case "heading":
            return <h2 key={index} className="text-xl font-semibold mt-4">{block.text}</h2>;
          case "paragraph":
            return <p key={index}>{block.text}</p>;
          case "list":
            return (
              <ul key={index} className="list-disc pl-6">
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          case "code":
            return (
              <SyntaxHighlighter key={index} language={block.language || "javascript"} style={atomOneDark}>
                {block.text}
              </SyntaxHighlighter>
            );
          default:
            return null;
        }
      })}
        </div>
    );
}

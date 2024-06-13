import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CodeBlock = ({ children, ...props }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="codeBlock">
      <CopyToClipboard text={String(children).replace(/\n$/, '')} onCopy={handleCopy}>
        <button className="copy-button">{copied ? 'Copied' : 'Copy'}</button>
      </CopyToClipboard>
      <SyntaxHighlighter language="javascript" style={okaidia} {...props}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;

import React from 'react';
import ReactMarkdown from 'react-markdown';
import Editor from './Editor';
import './App.css';

const MIN_TEXTAREA_HEIGHT = 32;
const MAX_TEXTAREA_HEIGHT = 300;

function App() {
  const textareaRef = React.createRef<HTMLTextAreaElement>();
  const [value, setValue] = React.useState("");
  const [markdown, setMarkdown] = React.useState(false);
  const onMarkdownStateChange = (markdown: boolean) => setMarkdown(markdown);
  const onMarkdownTextChange = (value: string) => setValue(value);
  
  let preview = null;
  if (markdown) {
    preview = (
      <div className="Msg-box">
        <div className="Msg-preview ql-container ql-snow">
          <div className="Msg-preview-header">Preview:</div>
          <ReactMarkdown children={value} className="Msg-preview-markdown"></ReactMarkdown>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Editor onMarkdownStateChange={onMarkdownStateChange} onMarkdownTextChange={onMarkdownTextChange}></Editor>
      {preview}
    </div>
  );
}

export default App;

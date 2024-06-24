import React, { useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor';

const CodeEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [language, setLanguage] = useState<string>('html');

  useEffect(() => {
    if (editorRef.current) {
        editor?.dispose();
      const newEditor = monaco.editor.create(editorRef.current, {
        language: language,
        theme: 'vs-dark',
        cursorStyle: 'line', // or 'block' or 'underline'
        cursorBlinking: 'blink', // or 'smooth' or 'phase' or 'expand'

      });
      setEditor(newEditor);
    }

    return () => {
      editor?.dispose();
    };
  }, [language]);

  const runCode = () => {
    if (editor && iframeRef.current) {
      const code = editor.getValue();
      if (language === 'html') {
        iframeRef.current.srcdoc = code;
      } else if (language === 'javascript') {
        iframeRef.current.srcdoc = `<script>${code}<\/script>`;
      } else if (language === 'css') {
        iframeRef.current.srcdoc = `<style>${code}<\/style>`;
      } else {
        iframeRef.current.srcdoc = `<pre>${code}<\/pre>`;
      }
    }
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
<div style={{ margin: '10px' }}>
  <label htmlFor="language-select" style={{ marginRight: '10px', fontWeight: 'bold' }}>Select Language: </label>
  <select
    id="language-select"
    value={language}
    onChange={handleLanguageChange}
    style={{
      padding: '8px 12px',
      fontSize: '16px',
      backgroundColor: '#f0f0f0', // Gray background color
      color: '#333', // Dark gray text color
      border: '1px solid #ccc', // Light gray border
      borderRadius: '5px',
      cursor: 'pointer',
      outline: 'none' // Remove outline when focused
    }}
  >
    <option value="html">HTML</option>
    <option value="javascript">JavaScript</option>
    <option value="css">CSS</option>
    <option value="json">JSON</option>
    <option value="xml">XML</option>
    <option value="markdown">Markdown</option>
    <option value="plaintext">Plain Text</option>
  </select>
</div>
<div
  style={{
    height: '40%',
    border: '2px solid #ccc',
    borderRadius: '10px', // Rounded edges
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
    padding: '16px', // Padding inside the editor
    backgroundColor: '#f9f9f9', // Light gray background color
    overflow: 'auto' // Scroll if content overflows
  }}
  ref={editorRef}
></div>
      <button onClick={runCode} style={{ margin: '10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer' }}>
    Run Code
</button>
<iframe
  ref={iframeRef}
  style={{
    height: '40%',
    width: '98%', // Ensures the iframe takes the full width of the container
    border: '2px solid #ccc',
    borderRadius: '10px', // Rounded edges
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
    padding: '8px', // Slight padding for the content inside the iframe
    backgroundColor: '#f9f9f9', // Light gray background color
    overflow: 'auto' // Scroll if content overflows
  }}
  title="Result"
></iframe>
    </div>
  );
};

export default CodeEditor;

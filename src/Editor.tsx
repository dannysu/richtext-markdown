import React from 'react';
import ReactQuill from 'react-quill';
import TurndownService from 'turndown';
import { Converter } from 'showdown';
import './App.css';
import 'react-quill/dist/quill.snow.css';

const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'list',
    'bullet',
];

const CustomToolbar = () => (
    <div id="toolbar">
        <span className="ql-formats">
            <select className="ql-header" defaultValue="4">
                <option value="1">Heading 1</option>
                <option value="2">Heading 2</option>
                <option value="3">Heading 3</option>
                <option value="4">Normal</option>
            </select>
        </span>
        <span className="ql-formats">
            <button className="ql-bold"></button>
            <button className="ql-italic"></button>
            <button className="ql-underline"></button>
        </span>
        <span className="ql-formats">
            <button className="ql-list" value="ordered"></button>
            <button className="ql-list" value="bullet"></button>
        </span>
        <span className="ql-formats">
            <button className="ql-clean"></button>
        </span>
        <span className="ql-formats">
            <button className="ql-markdown">
                Markdown
            </button>
        </span>
    </div>
);

type EditorProps = {
    onMarkdownStateChange: (markdown: boolean) => void,
    onMarkdownTextChange: (value: string) => void,
}

type EditorState = {
    editorHtml: string,
    markdown: boolean,
}

class Editor extends React.Component<EditorProps, EditorState> {
    
    state: EditorState = {
        editorHtml: '',
        markdown: false,
    };

    modules: any = {
        toolbar: {
            container: "#toolbar",
            handlers: {
                markdown: this.switchToMarkdown.bind(this),
            }
        }
    };
    
    handleChange(html: string) {
        this.setState({ editorHtml: html });
    }
    
    onTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({ editorHtml: event.target.value });
        this.props.onMarkdownTextChange(event.target.value);
    }
    
    switchToMarkdown() {
        if (this.state.markdown) {
            return;
        }
        
        const turndownService = new TurndownService({
            headingStyle: 'atx',
        });
        const markdown = turndownService.turndown(this.state.editorHtml);
        this.setState({
            editorHtml: markdown,
            markdown: true,
        });
        this.props.onMarkdownStateChange(true);
        this.props.onMarkdownTextChange(markdown);
    }
    
    switchToRichText() {
        if (!this.state.markdown) {
            return;
        }
        
        const converter = new Converter();
        const html = converter.makeHtml(this.state.editorHtml);
        this.setState({
            editorHtml: html,
            markdown: false,
        });
        this.props.onMarkdownStateChange(false);
    }
    
    render() {
        const richText = (
            <div className="Msg-box">
                <CustomToolbar/>
                <ReactQuill
                    theme="snow"
                    value={this.state.editorHtml}
                    onChange={this.handleChange.bind(this)}
                    modules={this.modules}
                    formats={formats}
                />
            </div>
        );
        
        const plainText = (
            <div>
                <button onClick={this.switchToRichText.bind(this)}>Rich Text</button><br/>
                <textarea value={this.state.editorHtml} onChange={this.onTextAreaChange.bind(this)} className="Msg-box"></textarea>
            </div>
        );
        
        if (this.state.markdown) {
            return plainText;
        } else {
            return richText;
        }
    }
}

export default Editor;
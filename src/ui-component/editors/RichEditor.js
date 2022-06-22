import React, { useEffect, useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";
import { Button, Grid } from "@mui/material";
const RichEditor = ({data, onSave, keyy}) => {
    useEffect(()=>{setConvertedContent(data)},[data])
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [convertedContent, setConvertedContent] = useState(data);
    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
    };
    const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(currentContentAsHTML);
    };
    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        };
    };

    const [isEdit, setEdit] = useState(false);

    const onEdit = () => {
        if(isEdit){
            onSave(convertedContent, keyy)
        }
        setEdit(!isEdit);
    };
    return (
        <div className="App">
            {isEdit ? (
                <>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={handleEditorChange}
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        toolbarClassName="toolbar-class"
                    />
                    <Button variant="contained" onClick={onEdit}>Save</Button>
                </>
            ) : (
                <Grid container>
                    <Grid xs={11}>
                        <div className="preview"
                            dangerouslySetInnerHTML={createMarkup(convertedContent)}

                            onKeyDown={() => { }}
                            role='button' aria-hidden="true">

                        </div>
                    </Grid>
                    <Grid xs={1}>
                        <Button onClick={onEdit}>Edit</Button>
                    </Grid>

                </Grid>

            )}
        </div>
    );
};
export default RichEditor;

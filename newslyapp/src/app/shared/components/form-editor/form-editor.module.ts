import { QuillModules } from "ngx-quill";

export const quillModules: QuillModules = {
    toolbar: [
      [{ 'header': '3' }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image']
    ]
  };
  
 export interface ToolbarModule {
    addHandler(name: string, handler: Function): void;
  }
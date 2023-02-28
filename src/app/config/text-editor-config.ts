import {AngularEditorConfig} from "@kolkov/angular-editor";

export const TEXT_EDITOR_CONFIG: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: '15rem',
  minHeight: '5rem',
  placeholder: 'Enter text here...',
  translate: 'no',
  defaultParagraphSeparator: 'div',
  defaultFontName: '',
  defaultFontSize: '',
  toolbarHiddenButtons: [
    ['bold'], ['fontSize', 'fontName']
  ],
  customClasses: [
    {
      name: "code-snippet",
      class: "code-snippet",
      tag: 'div'
    },
    {
      name: "code-text",
      class: "code-text",
      tag: "span"
    }
  ],
  rawPaste: false
};

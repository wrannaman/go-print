'use babel';

// import GoPrintView from './go-print-view';
import { CompositeDisposable } from 'atom';
import methods from './methods';
console.log('METHODS', methods)
import config from './config';
import insertProps from './insertProps';
console.log('INSERTPROPS', insertProps)
console.log('CONFIG', config)

export default {
  goPrintView: null,
  subscriptions: null,

  activate(state) {
    // this.goPrintView = new GoPrintView(state.goPrintViewState);
    // this.modalPanel = atom.workspace.addModalPanel({
    //   item: this.goPrintView.getElement(),
    //   visible: false
    // });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'go-print:add-println': () => this.addPrintln()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
    // this.goPrintView.destroy();
  },

  serialize() {
    return {
      // goPrintViewState: this.goPrintView.serialize()
    };
  },

  addPrintln(devLayer, insertType) {
    if (!insertType) insertType = 'simple';
    // console.log('GoPrint was toggled!');
    // return (
    //   this.modalPanel.isVisible() ?
    //   this.modalPanel.hide() :
    //   this.modalPanel.show()
    // );
    if (editor = atom.workspace.getActiveTextEditor()) {
      let configProp = methods.getConfig()
      let cursorOffset = insertProps[insertType].cursorOffset
      let selectedText = editor.getSelectedText()
      let styleValues = methods.setStyleValue
      // let backgroundStylingConfig = configProp('go-print.backgroundStyling')
      // let backgroundStyle = ""
      // let textStylingConfig = configProp('go-print.textStyling')
      // let textStyle = styleValues('color', textStylingConfig)
      let styles = ""

      if (selectedText.length > 0) {
        if (selectedText[selectedText.length - 1] == ';') {
          selectedText = selectedText.slice(0, -1)
        }
        let checkedRows = 0
        let conditionalCheckValues = ['if ', 'if (', 'if(' ]
        let chainedconditionalCheckValue = 'else if'
        let conditionalFlag = false
        let editorLineCount = editor.getLastScreenRow()
        let functionCheckValues = ['=>', 'function', '){', ') {']
        let identifierCaseConfig = true
        let identifier = ""

        if (identifierCaseConfig) {
          identifier = selectedText.replace(/('|\\)/g, '\\$1')
        } else {
          selectedText.toUpperCase().replace(/('|\\)/g, '\\$1')
        }

        let objectFlag = true
        let objectCount = 0
        let selectedTextScreenRow = editor.getSelectedScreenRange().getRows()
        let selectedTextInsert = insertProps[insertType].selectedTextInsert(selectedText)
        editor.selectToBeginningOfLine()
        let lineTextBeforeSelectedText = editor.getSelectedText().split('')
        editor.moveToFirstCharacterOfLine()
        editor.selectToEndOfLine()
        let functionCheckSelection = editor.getSelectedText()
        let objectCheckSelection = functionCheckSelection.split('')

        for (val in functionCheckValues) {
          if (functionCheckSelection.indexOf(val) > -1) {
            objectFlag = false
          }
        }


        if (lineTextBeforeSelectedText.indexOf('()') === -1) {
          objectFlag = true
        }

        if (functionCheckSelection.match(new RegExp('^if[ (]'))) {
          objectFlag = false
          conditionalFlag = true
        }


        if (functionCheckSelection.indexOf(chainedconditionalCheckValue) > -1) {
          objectFlag = false
          conditionalFlag = false
        }

        if (objectFlag) {
          objectCount = objectCount + methods.objectCheck(objectCheckSelection)
        }

        while (objectCount > 0) {
          if (selectedTextScreenRow < editorLineCount) {
            editor.moveToBeginningOfLine()
            editor.moveDown(1)
            editor.selectToEndOfLine()
            selectedTextScreenRow++
            checkedRows++
            objectCheckSelection = editor.getSelectedText().split('')
            objectCount =
              objectCount + methods.objectCheck(objectCheckSelection)
          } else {
            editor.moveUp(checkedRows)
            objectCount = 0
          }
        }

        if (conditionalFlag) {
          editor.moveToBeginningOfLine()
          editor.insertNewline()
          editor.moveUp(1)
          if (styles.length > 0) {
            editor.insertText(`fmt.Println("%c${identifier}", "${styles}", ${selectedTextInsert})`)
          } else {
            editor.insertText(`fmt.Println("${identifier} %v", ${selectedTextInsert})`)
          }
          editor.moveToBeginningOfLine()
          editor.selectToEndOfLine()
          editor.autoIndentSelectedRows()
          editor.moveDown(1)
          editor.moveToEndOfLine()
          editor.insertNewline()
          if (styles.length > 0) {
            editor.insertText(`fmt.Println("%cCONDITION PASSED", '${styles}')"`)
          } else {
            editor.insertText(`fmt.Println("CONDITION PASSED")`)
          }
        } else {
          editor.moveToEndOfLine()
          editor.insertNewline()
          if (styles.length > 0) {
            editor.insertText(`fmt.Println("%c${identifier}", "${styles}", ${selectedTextInsert})`)
          } else {
            editor.insertText(`fmt.Println("${identifier} %v", ${selectedTextInsert})`)
          }
        }
      } else {
        let noSelectionTextInsertConfig = methods.getConfig('go-print.noSelectionInsert')
        let emptyInsert = insertProps[insertType].emptyInsert(noSelectionTextInsertConfig, styles)
        editor.insertText(`${emptyInsert}`)
        editor.moveLeft(cursorOffset)
      }
    }
  } // end add prntln
};

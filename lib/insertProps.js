'use babel';

export default {
  simple: {
    cursorOffset: 1,
    emptyInsert: (noSelectionTextInsertConfig, styles) => {
      if (noSelectionTextInsertConfig && styles.length > 0) return `fmt.Println('%cTEST', ${styles})`
      else if (noSelectionTextInsertConfig) return "fmt.Println('TEST')"
      else "fmt.Println()"
    },
    selectedTextInsert: (text) => `${text}`
  },
  stringify: {
    cursorOffset: 2,
    emptyInsert: (noSelectionTextInsertConfig) => {
      if (noSelectionTextInsertConfig) return "fmt.Println(JSON.stringify('TEST'))"
      else return 'fmt.Println(JSON.stringify())'
    },
    selectedTextInsert: (text) => `JSON.stringify(${text}, null, 2)`
  }
}

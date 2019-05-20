'use babel';

export default {
  simple: {
    cursorOffset: 1,
    emptyInsert: (noSelectionTextInsertConfig, styles) => {
      if (noSelectionTextInsertConfig && styles.length > 0) return `fmt.Printf('%c TEST \n', ${styles})`
      else if (noSelectionTextInsertConfig) return `fmt.Printf("TEST \n")`
      else `fmt.Printf("\n")`
    },
    selectedTextInsert: (text) => `${text}`
  },
  stringify: {
    cursorOffset: 2,
    emptyInsert: (noSelectionTextInsertConfig) => {
      if (noSelectionTextInsertConfig) return "fmt.Printf(JSON.stringify('TEST'))"
      else return 'fmt.Printf(JSON.stringify())'
    },
    selectedTextInsert: (text) => `JSON.stringify(${text}, null, 2)`
  }
}

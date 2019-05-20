'use babel';

export default {
  config: {
    semiColons: {
      type: 'boolean',
      title: 'Include semi-colons at end of console.log function',
      description: "Currently only supported for logging displayed in chrome browser console",
      default: false
    },
    noSelectionInsert: {
      type: 'boolean',
      title: "Include 'TEST' string within console statement if no text is selected",
      description: "Currently only supported for logging displayed in chrome browser console",
      default: false
    },
    identifierCase: {
      type: 'boolean',
      title: 'Retain case of selected text when creating identifier',
      description: "Currently only supported for logging displayed in chrome browser console",
      default: false,
    },
    backgroundStyling: {
      type: 'string',
      title: 'Include background styling for console identifier',
      description: "Currently only supported for logging displayed in chrome browser console",
      default: 'none',
      enum: [
        'none',
        'red',
        'blue',
        'green',
        'purple',
        'black'
      ]
    },
    textStyling: {
      type: 'string',
      title: 'Include text styling for console identifier',
      description: "Currently only supported for logging displayed in chrome browser console",
      default: 'none',
      enum: [
        'none',
        'red',
        'blue',
        'green',
        'purple',
        'white'
      ],
    },
    contextMenu: {
      type: 'boolean',
      title: 'Context menu',
      default: true,
    }
  }
}

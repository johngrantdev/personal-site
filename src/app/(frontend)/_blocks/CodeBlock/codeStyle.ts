import type { PrismTheme } from 'prism-react-renderer'

interface ColorScheme {
  [key: string]: string
}

interface ColoursType {
  plain: string
  comment: string
  punctuation: string
  keyword: string
  number: string
  property: string
  functionName: string
  function: string
  className: string
  constant: string
  important: string
  symbol: string
  string: string
  parameter: string
  entity: string
  operator: string
}

const darkScheme: ColorScheme = {
  text: 'rgba(255,255,255,1)',
  blue: 'rgba(102,194,204,1)',
  pink: 'rgba(249,42,173,1)',
  orange: 'rgba(248,124,50,1)',
  green: 'rgba(206,236,151,1)',
  gray: 'rgba(79,83,87,1)',
  coral: 'rgba(226,119,122,1)',
  yellow: 'rgba(245,233,97,1)',
}

const lightScheme: ColorScheme = {
  text: 'rgba(0,0,0,0.87)', // Almost black for text
  blue: 'rgba(78,156,163,1)', // Deeper blue
  pink: 'rgba(224,90,131,1)', // Richer pink
  orange: 'rgba(231,114,0,1)', // Deeper orange
  green: 'rgba(47,167,76,1)', // More saturated green
  gray: 'rgba(120,124,126,1)', // Darker gray for contrast
  coral: 'rgba(201,83,86,1)', // Deep coral
  yellow: 'rgba(167,175,32,1)', // More saturated yellow
}

export const theme = (mode: 'dark' | 'light'): PrismTheme => {
  const colorScheme = mode === 'dark' ? darkScheme : lightScheme

  const themeColors: ColoursType = {
    plain: colorScheme.text,
    comment: colorScheme.gray,
    punctuation: colorScheme.pink,
    keyword: colorScheme.blue,
    number: colorScheme.green,
    property: colorScheme.orange,
    functionName: colorScheme.pink,
    function: colorScheme.yellow,
    className: colorScheme.blue,
    constant: colorScheme.blue,
    important: colorScheme.pink,
    symbol: colorScheme.orange,
    string: colorScheme.orange,
    parameter: colorScheme.orange,
    entity: colorScheme.orange,
    operator: colorScheme.lightgray,
  }

  return generateTheme(themeColors)
}

export const generateTheme = (colours: ColoursType): PrismTheme => {
  return {
    plain: {
      color: colours.plain,
    },
    styles: [
      {
        types: ['comment', 'block-comment', 'prolog', 'doctype', 'cdata'],
        style: {
          color: colours.comment,
          fontStyle: 'italic',
        },
      },
      {
        types: ['punctuation'],
        style: {
          color: colours.punctuation,
        },
      },
      {
        types: ['tag', 'attr-name', 'namespace', 'number', 'unit', 'hexcode', 'deleted'],
        style: {
          color: colours.number,
        },
      },
      {
        types: ['property', 'selector'],
        style: {
          color: colours.property,
        },
      },
      {
        types: ['function-name'],
        style: {
          color: colours.functionName,
        },
      },
      {
        types: ['boolean', 'selector-id', 'function'],
        style: {
          color: colours.function,
        },
      },
      {
        types: ['class-name', 'maybe-class-name', 'builtin'],
        style: {
          color: colours.className,
        },
      },
      {
        types: ['constant', 'symbol'],
        style: {
          color: colours.constant,
        },
      },
      {
        types: ['important', 'atrule', 'keyword', 'selector-class'],
        style: {
          color: colours.important,
        },
      },
      {
        types: ['string', 'char', 'attr-value', 'regex', 'variable'],
        style: {
          color: colours.string,
        },
      },
      {
        types: ['parameter'],
        style: {
          fontStyle: 'italic',
        },
      },
      {
        types: ['entity', 'url'],
        style: {
          color: colours.entity,
        },
      },
      {
        types: ['operator'],
        style: {
          color: colours.operator,
        },
      },
      {
        types: ['important', 'bold'],
        style: {
          fontWeight: 'bold',
        },
      },
      {
        types: ['italic'],
        style: {
          fontStyle: 'italic',
        },
      },
      {
        types: ['entity'],
        style: {
          cursor: 'help',
        },
      },
      {
        types: ['inserted'],
        style: {
          color: 'green',
        },
      },
    ],
  }
}

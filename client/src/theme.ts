const constants = {
  error: '#f5222d',
}

const dark = {
  ...constants,
  normalText: '#ffffff',
  mutedText: '#b0b8bf',
  border: '#333333',
  accent: '#33a0ff',
  pageBackground: '#1b1b1b',
  foreground: '#262626',
  activeBackground: '#333333',
  inputBackground: '#212121',
  shadow: 'rgba(0, 0, 0, 0.4)',
}

const light = {
  ...constants,
  normalText: '#353c46',
  mutedText: '#64717d',
  border: '#ebedf0',
  accent: '#1890ff',
  pageBackground: '#f4f6f8',
  foreground: '#ffffff',
  activeBackground: '#fafafa',
  inputBackground: '#fcfcfc',
  shadow: 'rgba(0, 0, 0, 0.05)',
}

const theme = (isDark) => (isDark ? dark : light)

export default theme

'use client'

import ReactDOM from 'react-dom'

export function PreloadResources() {
  ReactDOM.preconnect('https://tpe-web.prismic.io')
  ReactDOM.preconnect('https://static.cdn.prismic.io')
  // ReactDOM.preconnect('https://static.cdn.prismic.io', { crossOrigin: '...' })
  return null
}

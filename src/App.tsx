import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ScrollPicker } from './components/ScrollPicker'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './App.less'

function App() {
  const [value, setValue] = useState(0.5)

  return (
    <div className='App'>

      <div className='example-component'>
        <SyntaxHighlighter language="javascript" style={dracula} showLineNumbers>
          {`<ScrollPicker
  width={500}
  value={value}
  onChange={value => setValue(value)}
/>`}
        </SyntaxHighlighter>
        <div className='component-render'>
          <h1>White scroll</h1>
          <div className='white scroll-wrapper'>
            <div className="label">{value}</div>
            <ScrollPicker
              width={500}
              value={value}
              onChange={value => setValue(value)}
            />
          </div>
        </div>
      </div>

      <div className='example-component'>
        <SyntaxHighlighter language="javascript" style={dracula} showLineNumbers>
          {`<ScrollPicker
    width={500}
    value={value}
    whiteTicks
    onChange={value => setValue(value)}
/>`}
        </SyntaxHighlighter>
        <div className='component-render'>
          <h1>Dark scroll</h1>
          <div className='dark scroll-wrapper'>
            <div className="label">{Math.round(value * 100)}%</div>
            <ScrollPicker
              width={500}
              value={value}
              whiteTicks
              onChange={value => setValue(value)}
            />
          </div>
        </div>
      </div>

    </div >
  )
}

createRoot(document.getElementById('root')!).render(<StrictMode> <App /> </StrictMode>)

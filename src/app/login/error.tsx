'use client' // Error boundaries must be Client Components
 
export default function Error({error,reset}: {error: Error ; reset: () => void}) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <h2>{error.message}</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}
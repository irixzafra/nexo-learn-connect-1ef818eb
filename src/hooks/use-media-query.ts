
import * as React from "react"

export function useMediaQuery(query: string) {
  const [value, setValue] = React.useState(false)

  React.useEffect(() => {
    function match(e?: MediaQueryListEvent | MediaQueryList) {
      setValue(e?.matches ?? false)
    }

    // Check on mount
    const media = window.matchMedia(query)
    match(media)

    // Listen for changes
    media.addEventListener("change", match)
    return () => {
      media.removeEventListener("change", match)
    }
  }, [query])

  return value
}

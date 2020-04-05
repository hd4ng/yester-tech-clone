import React, { useState, useEffect } from "react"
import { IoIosSearch } from "react-icons/io"
import { useHistory, useLocation } from "react-router-dom"
import queryString from "query-string"

import "./SearchBox.scss"

type SearchBoxProps = {
  placeholder: string
  path: string
}

const SearchBox: React.FC<SearchBoxProps> = ({ placeholder, path }) => {
  const history = useHistory()
  const { search } = useLocation()
  const [query, setQuery] = useState(queryString.parse(search).q || "")

  useEffect(() => {
    setQuery(queryString.parse(search).q || "")
  }, [search])

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const searchQueryUrl = queryString.stringify({
      ...queryString.parse(search),
      q: query,
    })
    history.push(`${path}?${searchQueryUrl}`)
  }

  function clear() {
    setQuery("") // Optimistic
    history.push(path)
  }

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <IoIosSearch />
      <input
        type="text"
        aria-label="Keyword Search"
        placeholder={placeholder}
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
      />
      <button className="clear-search" type="button" onClick={clear}>
        Clear
      </button>
    </form>
  )
}

export default SearchBox

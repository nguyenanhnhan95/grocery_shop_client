import React, { memo, useCallback, useState } from "react";
import "../../../assets/css/admin/common/searchContentAdmin.css"
import { useSelector } from "react-redux";
import { componentsAdvanced } from "../../../utils/commonUtils";
import SearchNameAdmin from "./SearchNameAdmin";
function SearchContentAdmin() {
  const { itemSearch, queryParameter } = useSelector((state) => state.actionAdmin)

  const [query, setQuery] = useState(queryParameter)

  const [show, setShow] = useState(false);

  const handleShowAdvanced = useCallback(() => {
    setShow(show => !show)
  }, [])
  const handleSetQuery = useCallback((value) => {
    setQuery(value)
  }, [])
  return (
    <div className="search-content-admin">
      <form role="search">
        <div className={`container-fluid container-content-search ${show ? 'show' : ''}`} >
          <SearchNameAdmin  handleShowAdvanced={handleShowAdvanced} handleSetQuery={handleSetQuery} query={query} />
          <div className="row container-content-search-advanced">
            {itemSearch.items.map((each, index) => {
              const Component = componentsAdvanced[each.component];
              if (!Component) {
                console.log(index)
                return null; // Skip rendering if the component is not defined
              }
              return (
                <Component
                  handleSetQuery={handleSetQuery}
                  query={query}
                  item={each}
                  key={index}
                />
              );
            })}

          </div>
        </div>
      </form>
    </div>
  )
}
export default memo(SearchContentAdmin);
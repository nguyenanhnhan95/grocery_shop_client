'use client';

import { useAppSelector } from "@/lib/redux";
import { RootState } from "@/setting/store";
import { OptionSearch } from "@/types/initialConfigAdmin";
import { Fragment, memo, useCallback, useEffect, useState } from "react";
import "./styles/searchContent.css"
import SearchName from "./SearchName";
interface SearchContentProps<T> {
  itemSearch: OptionSearch<T>;
}
function SearchContent<T>({ itemSearch }: SearchContentProps<T>) {
  const { queryParameter } = useAppSelector((state: RootState) => state.queryParameter)
  const [searchFiled, setSearchFiled] = useState<Record<string, any>>({})
  useEffect(() => {
    if (queryParameter !== null) {
      if (queryParameter.criterias) {
        setSearchFiled(queryParameter.criterias)
      }
    }
  }, [queryParameter])
  const [show, setShow] = useState(false);
  const handleShowAdvanced = useCallback(() => {
    setShow(show => !show)
  }, [])
  return (
    <div className="search-content-admin">
      <form role="search">
        <div className={`container-fluid container-content-search ${show ? 'show' : ''}`} >
          <SearchName handleShowAdvanced={handleShowAdvanced}
            searchItem={searchFiled} 
            attribute={itemSearch.attribute} 
            setSearchFiled={setSearchFiled}
            searchAdvanced={itemSearch} />
          <div className="row container-content-search-advanced">
            {itemSearch.SearchItems.map((each, index) => {
              const Component = each.component; // Lấy component từ đối tượng
              return (
                <Fragment key={index}>
                  <Component
                    url={each.url}
                    searchItem={searchFiled}
                    attribute={each.attribute}
                    take={each.take}
                    title={each.title}
                    show={each.show}
                    setSearchFiled={setSearchFiled}
                  />
                </Fragment>
              );
            })}
          </div>
        </div>
      </form>
    </div>

  )
}
export default memo(SearchContent);
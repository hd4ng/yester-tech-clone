import React, { useMemo, useCallback } from "react"
import { useLocation, Link } from "react-router-dom"
import { Columns, Column } from "react-flex-columns"
import queryString from "query-string"

import * as api from "./api"
import usePromise from "./usePromise"
import { PaginationRange, Pagination } from "./Pagination"
import BrowseProductItem from "./BrowseProductItem"
import NoResults from "./NoResults"
import Heading from "./Heading"

const BrowseProducts = () => {
  const urlQuery = useLocation().search
  const search = useMemo(() => queryString.parse(urlQuery), [urlQuery])
  const page = parseInt((search?.page as string) ?? "1", 10)

  // Get Product (Paginated) and Total
  const getProducts = useCallback(
    () => api.products.getProducts(search, page),
    [page, search]
  )
  const [response, loading] = usePromise(getProducts)
  const products = response?.products
  const totalResults = response?.totalResults

  return (
    <div className="browse-products spacing">
      <Columns split middle>
        <Column className="spacing">
          <Heading size={1}>Products</Heading>
        </Column>
        <Column>
          {Array.isArray(products) && (
            <PaginationRange
              resultsPerPage={10}
              page={page}
              totalResults={totalResults || 0}
              query={(search?.q as string) || ""}
            />
          )}
        </Column>
      </Columns>

      {Array.isArray(products) && products.length > 0 ? (
        <div className="spacing">
          {products.map((product) => (
            <BrowseProductItem
              key={product.id}
              productId={product.id}
              name={product.name}
              imagePath={product.imagePath}
              price={product.price}
              year={product.year}
              brand={product.brand}
              category={product.category}
              condition={product.condition}
              rating={product.rating}
            />
          ))}
        </div>
      ) : (
        <NoResults>
          No Results
          {search.q && (
            <span>
              {". "}
              <Link to="/products">Clear Search & Filter</Link>
            </span>
          )}
        </NoResults>
      )}

      {!loading && (
        <Pagination
          as="footer"
          path="/products"
          totalResults={totalResults || 0}
          page={page}
          resultPerPage={10}
        />
      )}
    </div>
  )
}

export default BrowseProducts

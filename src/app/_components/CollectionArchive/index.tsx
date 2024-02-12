'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import qs from 'qs'

import { Post } from '../../../payload/payload-types'
import type { ArchiveBlockProps } from '../../_blocks/ArchiveBlock'
import { Card } from '../Card'
import { PageRange } from '../PageRange'
import { Pagination } from '../Pagination'

type Result = {
  totalDocs: number
  docs: Post[]
  page: number
  totalPages: number
  hasPrevPage: boolean
  hasNextPage: boolean
  nextPage: number
  prevPage: number
}

export type Props = {
  className?: string
  relationTo?: 'posts'
  populateBy?: 'collection' | 'selection'
  showPageRange?: boolean
  onResultChange?: (result: Result) => void // eslint-disable-line no-unused-vars
  sort?: string
  limit?: number
  populatedDocs?: ArchiveBlockProps['populatedDocs']
  selectedDocs?: ArchiveBlockProps['selectedDocs']
  populatedDocsTotal?: ArchiveBlockProps['populatedDocsTotal']
  categories?: ArchiveBlockProps['categories']
}

export const CollectionArchive: React.FC<Props> = props => {
  const {
    className,
    relationTo,
    showPageRange,
    onResultChange,
    sort = '-createdAt',
    limit = 10,
    populatedDocs,
    populatedDocsTotal,
    selectedDocs,
    categories: catsFromProps,
    populateBy,
  } = props

  const [results, setResults] = useState<Result>({
    totalDocs: typeof populatedDocsTotal === 'number' ? populatedDocsTotal : 0,
    docs:
      (populatedDocs?.map(doc => doc.value) as Post[]) ||
      (selectedDocs?.map(doc => doc.value) as Post[]) ||
      [],
    page: 1,
    totalPages: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: 1,
    nextPage: 1,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const scrollRef = useRef<HTMLDivElement>(null)
  const hasHydrated = useRef(false)
  const [page, setPage] = useState(1)

  const scrollToRef = useCallback(() => {
    const { current } = scrollRef
    if (current) {
      // current.scrollIntoView({
      //   behavior: 'smooth',
      // })
    }
  }, [])

  useEffect(() => {
    if (!isLoading && typeof results.page !== 'undefined') {
      // scrollToRef()
    }
  }, [isLoading, scrollToRef, results])

  useEffect(() => {
    let timer: NodeJS.Timeout = null
    if (populateBy === 'collection') {
      // hydrate the block with fresh content after first render
      // don't show loader unless the request takes longer than x ms
      // and don't show it during initial hydration
      timer = setTimeout(() => {
        if (hasHydrated) {
          setIsLoading(true)
        }
      }, 500)

      const searchQuery = qs.stringify(
        {
          sort,
          where: {
            ...(catsFromProps && catsFromProps.length > 0
              ? {
                  categories: {
                    in: catsFromProps
                      .map(category => (typeof category === 'number' ? category : category.id))
                      .join(','),
                  },
                }
              : {}),
          },
          limit,
          page,
          depth: 1,
        },
        { encode: false },
      )

      const makeRequest = async () => {
        try {
          // Todo: Using NEXT_PUBLIC for payload api, check this needs to be client side
          const req = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/payload/${relationTo}?${searchQuery}`,
          )
          const json = await req.json()
          clearTimeout(timer)
          hasHydrated.current = true

          const { docs } = json as { docs: Post[] }

          if (docs && Array.isArray(docs)) {
            setResults(json)
            setIsLoading(false)
            if (typeof onResultChange === 'function') {
              onResultChange(json)
            }
          }
        } catch (err) {
          console.warn(err) // eslint-disable-line no-console
          setIsLoading(false)
          setError(`Unable to load "${relationTo} archive" data at this time.`)
        }
      }

      makeRequest()
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [page, catsFromProps, relationTo, onResultChange, sort, limit, populateBy])

  const [currentResult, setCurrentResult] = useState<Result>()
  useEffect(() => {
    setTimeout(() => {
      setCurrentResult(results)
    }, 300)
  }, [results])

  return (
    <div className={[className].filter(Boolean).join(' ')}>
      <div className="absolute left-0 top-[-24]" ref={scrollRef} />
      {!isLoading && error && <>{error}</>}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 w-full gap-3">
        {currentResult &&
          currentResult.docs?.map((result, index) => {
            return (
              <div key={index}>
                <Card index={index} relationTo={relationTo} doc={result} showCategories />
              </div>
            )
          })}
      </div>
      {currentResult && currentResult.totalPages > 1 && (
        <Pagination
          className="mt-12"
          page={results.page}
          totalPages={results.totalPages}
          onClick={setPage}
        />
      )}
      {showPageRange !== false && (
        <div className="py-6">
          <PageRange
            totalDocs={results.totalDocs}
            currentPage={results.page}
            collection={relationTo}
            limit={limit}
          />
        </div>
      )}
    </div>
  )
}

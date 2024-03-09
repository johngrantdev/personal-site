import { Fragment } from 'react'

import { Button } from '../_components/Button'
import { Padding } from '../_components/Padding'
import { PageMargin } from '../_components/PageMargin'
import { PageState } from '../_providers/Context/pageContext'

export default function NotFound() {
  return (
    <Fragment>
      <PageState title={'404 Not Found'} />
      <PageMargin className="grow">
        <Padding top className="flex flex-col gap-x-12">
          <p>This page could not be found.</p>
          <Button
            className="w-fit"
            href="/"
            label="Click Here to return to the home page"
            appearance="primary"
          />
        </Padding>
      </PageMargin>
    </Fragment>
  )
}

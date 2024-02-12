import { Fragment } from 'react'

import { Button } from '../_components/Button'
import { Padding } from '../_components/Padding'
import { PageState } from '../_providers/Context/Page/pageContext'

export default function NotFound() {
  return (
    <Fragment>
      <PageState title={'404 Not Found'} />
      <Padding>
        <p>This page could not be found.</p>
      </Padding>
      <Padding>
        <Button href="/" label="Click Here to return to the home page" appearance="primary" />
      </Padding>
    </Fragment>
  )
}

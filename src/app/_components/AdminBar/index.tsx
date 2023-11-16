'use client'

import React, { useEffect } from 'react'
import { useSelectedLayoutSegments } from 'next/navigation'
import { PayloadAdminBar, PayloadAdminBarProps } from 'payload-admin-bar'

import { useAuth } from '../../_providers/Auth'
import { Gutter } from '../Gutter'

// import classes from './index.module.scss'

const collectionLabels = {
  pages: {
    singular: 'Page',
    plural: 'Pages',
  },
  posts: {
    singular: 'Post',
    plural: 'Posts',
  },
}

const Title: React.FC = () => <span>Dashboard</span>

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps
}> = props => {
  const { adminBarProps } = props || {}
  const segments = useSelectedLayoutSegments()
  const collection = collectionLabels?.[segments?.[1]] ? segments?.[1] : 'pages'
  const [show, setShow] = React.useState(false)

  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      setShow(true)
    }
  }, [user])

  const isAdmin = user?.roles?.includes('admin')

  if (!isAdmin) return null

  return (
    // add adminBar, show styling
    <div
      className={`z-10 w-full px-0 py-5 block transition-opacity ${
        show ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      <Gutter className="relative">
        {/* add payloadAdminBar, user, logo and control styling */}
        <PayloadAdminBar
          {...adminBarProps}
          collection={collection}
          collectionLabels={{
            singular: collectionLabels[collection]?.singular || 'Page',
            plural: collectionLabels[collection]?.plural || 'Pages',
          }}
          key={user?.id} // use key to get the admin bar to re-run its `me` request
          cmsURL={process.env.NEXT_PUBLIC_SERVER_URL}
          logo={<Title />}
          // style={{
          //   position: 'relative',
          //   zIndex: 'unset',
          //   padding: 0,
          //   backgroundColor: 'transparent',
          // }}
          className="relative z-auto p-0 bg-transparent text-red-600 mr-3"
          classNames={{
            user: 'mr-2',
            logo: 'mr-2',
            controls: 'mr-2 last:mr-0',
          }}
        />
      </Gutter>
    </div>
  )
}

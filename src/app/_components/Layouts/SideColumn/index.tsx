import { Layout, SideColumn as SideColumnType } from '../../../../payload/payload-types'
import { PageHero } from '../../Hero/PageHero'
import { PostHero } from '../../Hero/PostHero'
import { ProjectHero } from '../../Hero/ProjectHero'
import RichText from '../../RichText/static'

type LayoutType = NonNullable<Layout>[0]

type SideColumnProps = SideColumnType & {
  position: LayoutType['sideContentPosition']
}

export const SideColumn: React.FC<SideColumnProps> = (props: SideColumnProps) => {
  const { style, hero, projectHero, sideContent1, sideContent2, position } = props
  const className = position === 'fixedSideContentAlways' ? 'xl:absolute xl:w-80' : ''
  return (
    <div className={className}>
      {style === 'hero' && <PageHero {...hero} />}
      {style === 'postHero' && <PostHero />}
      {style === 'projectHero' && <ProjectHero {...projectHero} />}
      {style === 'singleLayout' && typeof sideContent1 === 'object' && (
        <RichText content={sideContent1} />
      )}
      {style === 'twoRows' && typeof sideContent1 === 'object' && (
        <div className="h-full flex flex-col">
          <RichText className="flex-1" content={sideContent1} />
          <RichText className="flex-1" content={sideContent2} />
        </div>
      )}
    </div>
  )
}

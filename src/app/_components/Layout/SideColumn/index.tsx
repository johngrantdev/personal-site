import { SideColumn as SideColumnType } from '../../../../payload/payload-types'
import { PageHero } from '../../Hero/PageHero'
import { PostHero } from '../../Hero/PostHero'
import { ProjectHero } from '../../Hero/ProjectHero'
import RichText from '../../RichText'

type SideColumnProps = SideColumnType & {
  className: string
}

export const SideColumn: React.FC<SideColumnProps> = (props: SideColumnProps) => {
  const { style, hero, projectHero, sideContent1, sideContent2, className } = props
  return (
    <div className={className}>
      {style === 'hero' && <PageHero {...hero} />}
      {style === 'postHero' && <PostHero />}
      {style === 'projectHero' && <ProjectHero {...projectHero} />}
      {(style === 'singleLayout' || style === 'twoRows') && typeof sideContent1 === 'object' && (
        <RichText content={sideContent1} />
      )}
      {style === 'twoRows' && sideContent2 && <RichText content={sideContent2} />}
    </div>
  )
}

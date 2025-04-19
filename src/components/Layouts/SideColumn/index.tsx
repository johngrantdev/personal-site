import { Layout, SideColumn as SideColumnType } from '@/payload-types'
import { PageHero } from '@/components/Hero/PageHero'
import { PostHero } from '@/components/Hero/PostHero'
import { ProjectHero } from '@/components/Hero/ProjectHero'
import RichTextWithAnimation from '@/components/RichText/WithAnimation'

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
        <RichTextWithAnimation data={sideContent1} />
      )}
      {style === 'twoRows' && typeof sideContent1 === 'object' && (
        <div className="h-full flex flex-col">
          <RichTextWithAnimation className="flex-1" data={sideContent1} />
          <RichTextWithAnimation className="flex-1" data={sideContent2} />
        </div>
      )}
    </div>
  )
}

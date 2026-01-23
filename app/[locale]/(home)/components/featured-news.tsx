import { ThirdsSection } from '@/components/sections/thirds';
import { cn } from '@/lib/utils';
// import { BaseHubImage } from 'basehub/next-image';
// import { Pump } from 'basehub/react-pump';

export const FeaturedNews = () => {
  return (
    <ThirdsSection
      title="Placeholder News Title"
      description="Placeholder news description."
      caption="Latest feature"
      reverse
      buttons={[
        {
          label: 'Keep reading',
          href: '#',
        },
        {
          label: 'View all features',
          href: '/live',
        },
      ]}
    >
      <div
        className={cn(
          'relative aspect-video overflow-hidden bg-dashed px-4 pt-4',
          'sm:px-8 sm:pt-8'
        )}
      >
        {/* <BaseHubImage
          src={data.home.featuredNews.image.url}
          alt={data.home.featuredNews.image.alt ?? ''}
          width={data.home.featuredNews.image.width}
          height={data.home.featuredNews.image.height}
          className="rounded-lg border sm:rounded-2xl"
        /> */}
        <div className="dashed-line-top" />
        <div className="dashed-line-left" />
        <div className="dashed-line-right" />
      </div>
    </ThirdsSection>
  );
};

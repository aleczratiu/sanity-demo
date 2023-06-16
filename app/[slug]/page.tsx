import { getThemeColor } from '@/sanity/utils/getThemeColor';
import { sanityClient } from '@/sanity/utils/sanityClient';
import { urlFor } from '@/sanity/utils/urlFor';
import HeroSection from '../modules/HeroSection';
import TestimonialSection from '../modules/TestimonialSection';
import GallerySection from '../modules/GallerySection';
import TextWithIllustrationSection from '../modules/TextWithIllustrationSection';

export default async function Page({ params }) {
  const result = await sanityClient.fetch(
    `*[_type=="landingPage" && slug.current == $slug][0] { "pageBuilder": pageBuilder[] { ... } }`,
    { slug: params.slug },
  );

  return (
    <div className='flex justify-center flex-col' style={{ backgroundColor: '#fff' }}>
      {result.pageBuilder?.map((el, id) => {
        if (el._type === 'hero') {
          return <HeroSection el={el} id={id} key={id} />;
        }
        if (el._type === 'testimonial') {
          return <TestimonialSection el={el} id={id} key={id} />;
        }
        if (el._type === 'gallery') {
          return <GallerySection el={el} id={id} key={id} />;
        }
        if (el._type === 'textWithIllustration') {
          return <TextWithIllustrationSection el={el} id={id} key={id} />;
        }
        return null;
      })}
    </div>
  );
}

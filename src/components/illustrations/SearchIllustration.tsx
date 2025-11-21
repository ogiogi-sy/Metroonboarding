import { ImageWithFallback } from '../figma/ImageWithFallback';
import searchIllustration from 'figma:asset/76b3d0024809fc91298e4d38831219d100358d30.png';

export function SearchIllustration() {
  return (
    <div className="relative w-full max-w-[280px]">
      <ImageWithFallback
        src={searchIllustration}
        alt="Business search illustration"
        className="w-full h-full object-cover rounded-2xl"
      />
    </div>
  );
}
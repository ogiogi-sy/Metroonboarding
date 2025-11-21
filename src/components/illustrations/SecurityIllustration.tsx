import { ImageWithFallback } from '../figma/ImageWithFallback';

export function SecurityIllustration() {
  return (
    <div className="relative w-full aspect-square max-w-[280px]">
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1762341116197-fb94a4f37173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMG1vZGVybnxlbnwxfHx8fDE3NjM1NTczNDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        alt="Business professional"
        className="w-full h-full object-cover rounded-2xl"
      />
    </div>
  );
}
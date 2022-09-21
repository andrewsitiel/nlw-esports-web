interface BannerProps{
  title: string;
  banner: string;
  ads: number;
}

export function GameBanner({title, banner, ads}:BannerProps) {
  return (
    <a href="" className="relative rounded-lg overflow-hidden">
      <img src={banner} alt="" className="w-full"/>

      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0s">

        <strong className="font-bold text-white block">{title}</strong>
        <span className="text-zinc-300 text-sm block">{ads} anúncio(s)</span>
        
      </div>
    </a>
  );
}
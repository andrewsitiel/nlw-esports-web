import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog"

export function CreateAdBanner() {
  return (
    <div className="bg-nlw-gradient mt-8 pt-1 self-stretch rounded-lg overflow-hidden">
    <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
      
      <div>
        <strong className="text-2xl text-white font-black block">Não encontrou o seu duo?</strong>
        <span className="text-zinc-400">Publique um anúncio</span>
      </div>

      <Dialog.Trigger className="px-4 py-3 bg-violet-500 hover:bg-violet-600 duration-100 text-white rounded-md flex items-center gap-3">
          <MagnifyingGlassPlus size={24} />
          Publique anúncio
      </Dialog.Trigger>
    </div>
  </div>
  );
}
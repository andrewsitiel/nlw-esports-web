import * as Dialog from "@radix-ui/react-dialog";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { CreateAdModal } from "./components/CreateAdModal";
import { useState, useEffect } from "react";
import axios from "axios";

import logoImg from "./assets/logo-nlw-esports.svg";
import "./styles/main.css";


interface Games {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    Ads: number
  };
}

function App() {
    const [games, setGames] = useState<Games[]>([]);

    useEffect(()=>{
      axios("http://localhost:3000/games").then(response => setGames(response.data))
    },[])

  return (
    <div className="max-w-[1344px] my-20 mx-auto flex flex-col items-center">
      <img src={logoImg} alt=""/>
      <h1 className="text-6xl text-white font-black mt-20">
      Seu <span className="bg-nlw-gradient bg-clip-text text-transparent">duo</span> está aqui
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(({id, title, bannerUrl, _count}) => {
          return (<GameBanner 
          key={id}
          title={ title }  
          banner={bannerUrl} 
          ads={_count.Ads}
          />) 
        })}
      </div>
    
    <Dialog.Root>
      <CreateAdBanner/>
      <CreateAdModal/>
    </Dialog.Root>
    
    </div>

  )
}

export default App

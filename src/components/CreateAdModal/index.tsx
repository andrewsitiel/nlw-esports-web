import * as Dialog from "@radix-ui/react-dialog";
import * as CheckBox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import axios from "axios";

import { Check, GameController } from "phosphor-react";
import { Input } from "../Form/Input";
import { useState, useEffect, FormEvent } from "react";

interface Games {
  id: string;
  title: string;
}


export function CreateAdModal () {
  const [games, setGames] = useState<Games[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>(["0"]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  useEffect(()=>{
    axios("http://localhost:3000/games").then(response => setGames(response.data))
  },[])

  async function handleCreateAd(event:FormEvent) {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const {game, name, yearsPlaying, discord, hourStart, hourEnd} = Object.fromEntries(formData)

    if(!name) {
      return;
    }

    try {
      axios.post(`http://localhost:3000/games/${game}/ads`, {
        name,
        yearsPlaying: Number(yearsPlaying),
        discord,
        weekDays: weekDays.map(Number),
        hourStart,
        hourEnd,
        useVoiceChannel
      })
      alert("Anúncio criado com sucesso")
    }
    catch(err) {
      console.log(err)
      alert("Erro ao criar o anúncio!")
    }
  }

  return (
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 inset-0 fixed"/>
        <Dialog.Content className="w-[480px] bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed rounded-lg shadow-lg shadow-black/25">

          <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
            <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">Qual o game?</label>
                <select
                name="game"
                id="game"
                className="bg-zinc-900 py-3 px-4 rounded text-sm appearance-none"
                defaultValue=""
                >
                  <option value="Selecione o game">Selecione o game...</option>
                  {games.map(game => {
                    return <option value={game.id} key={game.id}>{game.title}</option>
                  })}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input name="name" id="name" placeholder="Selecione o game que deseja jogar"/>
              </div>

              <div className="grid grid-cols-2 gap-6">

                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                  <Input name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO"/>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="dicord">Qual o seu Discord?</label>
                  <Input name="discord" id="discord" placeholder="Usuário#0000"/>
                </div>

              </div>

              <div className="flex gap-6">

                <div className="flex flex-col gap-2">
                  <label htmlFor="weekDays">Quando costuma jogar?</label>
                    <ToggleGroup.Root 
                      type="multiple"
                      className="grid grid-cols-4 gap-2"
                      value={weekDays}
                      onValueChange={setWeekDays}
                    >
                      <ToggleGroup.Item
                        value="0"
                        className={`w-8 h-8 rounded ${weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"}`}
                        title="Domingo">
                          D
                      </ToggleGroup.Item>
                      <ToggleGroup.Item
                        value="1"
                        className={`w-8 h-8 rounded ${weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"}`}
                        title="Segunda">
                          S
                      </ToggleGroup.Item>
                      <ToggleGroup.Item
                        value="2"
                        className={`w-8 h-8 rounded ${weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"}`}
                        title="Terça">
                          T
                      </ToggleGroup.Item>
                      <ToggleGroup.Item
                        value="3"
                        className={`w-8 h-8 rounded ${weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"}`}
                        title="Quarta">
                          Q
                      </ToggleGroup.Item>
                      <ToggleGroup.Item
                        value="4"
                        className={`w-8 h-8 rounded ${weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"}`}
                        title="Quinta">
                          Q
                      </ToggleGroup.Item>
                      <ToggleGroup.Item
                        value="5"
                        className={`w-8 h-8 rounded ${weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"}`}
                        title="Sexta">
                          S
                      </ToggleGroup.Item>
                      <ToggleGroup.Item
                        value="6"
                        className={`w-8 h-8 rounded ${weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"}`}
                        title="Sábado">
                          S
                      </ToggleGroup.Item>
                    </ToggleGroup.Root>
                </div>

                <div className="flex-1">

                  <label htmlFor="hourStart">Qual horário do dia?</label>

                  <div className="grid grid-cols-2 gap-1">
                    <Input name="hourStart" id="hourStart" type="time" placeholder="De"/>
                    <Input name="hourEnd" id="hourEnd" type="time" placeholder="Até"/>
                  </div>

                </div>
              </div>

              <label className="mt-2 flex items-center gap-2 text-sm">
                <CheckBox.Root
                  className="w-6 h-6 p-1 rounded bg-zinc-900"
                  checked={useVoiceChannel}
                  onCheckedChange={(checked) => {
                    if (checked === true)
                    {setUseVoiceChannel(true)}
                    else {setUseVoiceChannel(false)}
                    
                  }}
                  >
                  <CheckBox.Indicator>
                    <Check className="w-4 h-3 text-emerald-400"/>
                  </CheckBox.Indicator>
                </CheckBox.Root>
                Costumo me conectar ao chat de voz
              </label>

              <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close
                  type="button"
                  className="bg-zinc-500 hover:bg-zinc-600 px-5 h-12 font-semibold rounded-md"
                >
                  Cancelar
                </Dialog.Close>

                <button 
                type="submit"
                className="bg-violet-500 hover:bg-violet-600 px-5 h-12 font-semibold rounded-md flex items-center gap-3"
                >
                  <GameController className="w-6 h-6"/>
                  Encontrar duo
                </button>
              </footer>

            </form>
        </Dialog.Content>
      </Dialog.Portal>
  )
}
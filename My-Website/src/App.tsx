import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  const apiURL = "https://nekos.best/api/v2/";
  const [reference, setReference] = useState("");
  const [image, setImage] = useState("");
  const [imagesource, setImagesource] = useState("");
  const [giflist, setGiflist] = useState<string[]>([]);

  const handleButtonClickimage = (ref: string) => {
    setReference(ref);
    fetchImage(ref);
  };

  const handleButtonClickgif = (ref: string) => {
    setReference(ref);
    fetchGIF(ref);
  };

  const fetchImage = (ref: string) => {
    fetch(`${apiURL}${ref}`)
      .then((res) => res.json())
      .then((data) => {
        setImage(data["results"][0]["url"]);
        setImagesource(data["results"][0]["source_url"]);
        setGiflist([]);
      });
  };

  const fetchGIF = (ref: string) => {
    setGiflist([]); // Clear the previous GIF list
    for (let i = 0; i < 5; i++) {
      fetch(`${apiURL}${ref}`)
        .then((res) => res.json())
        .then((data) => {
          setGiflist((prevGiflist) => [
            ...prevGiflist,
            data["results"][0]["url"],
          ]);
          setImage("");
          setImagesource("");
        });
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Fetch Some Fun Images or GIFs</h1>
      <div className="space-y-6 w-full max-w-4xl">
        <div className="p-4 border border-gray-300 rounded-md bg-white shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Images</h2>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => handleButtonClickimage("husbando")}>
              Husbando
            </Button>
            <Button onClick={() => handleButtonClickimage("kitsune")}>
              Kitsune
            </Button>
            <Button onClick={() => handleButtonClickimage("neko")}>Neko</Button>
            <Button onClick={() => handleButtonClickimage("waifu")}>
              Waifu
            </Button>
          </div>
        </div>
        <div className="p-4 border border-gray-300 rounded-md bg-white shadow-md">
          <h2 className="text-2xl font-semibold mb-4">GIFs</h2>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => handleButtonClickgif("angry")}>Angry</Button>
            <Button onClick={() => handleButtonClickgif("baka")}>Baka</Button>
            <Button onClick={() => handleButtonClickgif("bite")}>Bite</Button>
            <Button onClick={() => handleButtonClickgif("blush")}>Blush</Button>
            <Button onClick={() => handleButtonClickgif("bored")}>Bored</Button>
            <Button onClick={() => handleButtonClickgif("cry")}>Cry</Button>
            <Button onClick={() => handleButtonClickgif("cuddle")}>
              Cuddle
            </Button>
            <Button onClick={() => handleButtonClickgif("dance")}>Dance</Button>
            <Button onClick={() => handleButtonClickgif("facepalm")}>
              Facepalm
            </Button>
            <Button onClick={() => handleButtonClickgif("feed")}>Feed</Button>
            <Button onClick={() => handleButtonClickgif("handhold")}>
              Handhold
            </Button>
            <Button onClick={() => handleButtonClickgif("handshake")}>
              Handshake
            </Button>
            <Button onClick={() => handleButtonClickgif("happy")}>Happy</Button>
            <Button onClick={() => handleButtonClickgif("highfive")}>
              High Five
            </Button>
            <Button onClick={() => handleButtonClickgif("hug")}>Hug</Button>
            <Button onClick={() => handleButtonClickgif("kick")}>Kick</Button>
            <Button onClick={() => handleButtonClickgif("kiss")}>Kiss</Button>
            <Button onClick={() => handleButtonClickgif("laugh")}>Laugh</Button>
            <Button onClick={() => handleButtonClickgif("lurk")}>Lurk</Button>
            <Button onClick={() => handleButtonClickgif("nod")}>Nod</Button>
          </div>
        </div>
        {giflist.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4 justify-center">
            {giflist.map((gif, index) => (
              <img
                key={index}
                src={gif}
                alt={`${reference}-${index}`}
                className="w-48 h-auto object-contain rounded-md shadow-md"
              />
            ))}
          </div>
        )}
        {image && (
          <div className="mt-4 flex justify-center">
            <img
              src={image}
              alt={reference}
              className="w-96 h-auto object-contain rounded-md shadow-md"
            />
          </div>
        )}
        {imagesource && (
          <p className="mt-2 text-center">
            <a
              href={imagesource}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {imagesource}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export default App;

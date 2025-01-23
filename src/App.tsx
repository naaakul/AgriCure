import React, { useState } from "react";
import axios from "axios";

const App: React.FC = () => {

  const plantDiseases: { name: string; des: string; treat: string; prev: string }[] = [
    {
      name: "rust",
      des: "Rust causes orange, yellow, or brown pustules on leaves and stems, weakening the plant.",
      treat: "Use fungicides and remove infected plant parts.",
      prev: "Ensure proper air circulation and avoid overhead watering."
    },
    {
      name: "fungi",
      des: "Fungal infections can cause discoloration, wilting, and stunted growth in plants.",
      treat: "Apply appropriate fungicides and remove affected areas.",
      prev: "Maintain clean gardening tools and avoid overwatering."
    },
    {
      name: "powdery mildew",
      des: "A white, powdery substance appears on leaves, stems, and flowers, reducing plant health.",
      treat: "Use sulfur-based fungicides or neem oil.",
      prev: "Avoid high humidity and ensure good air circulation."
    },
    {
      name: "water deficiency",
      des: "Plants show wilting, dry leaves, and slowed growth due to insufficient water.",
      treat: "Water plants deeply and regularly.",
      prev: "Monitor soil moisture and mulch to retain water."
    },
    {
      name: "nutrient deficiency",
      des: "Yellowing, stunted growth, or poor fruit/flower development caused by lack of essential nutrients.",
      treat: "Use fertilizers tailored to the plant’s needs.",
      prev: "Conduct soil tests and fertilize accordingly."
    },
    {
      name: "water excess or uneven watering",
      des: "Overwatering or irregular watering causes root rot, yellowing leaves, or poor growth.",
      treat: "Improve drainage and water consistently.",
      prev: "Use well-draining soil and water only when needed."
    },
    {
      name: "black spot",
      des: "Circular black spots on leaves, often leading to leaf drop, caused by a fungal infection.",
      treat: "Use fungicides and remove infected leaves.",
      prev: "Avoid wetting leaves and ensure good airflow."
    },
    {
      name: "feeding damage by insects",
      des: "Leaves show holes, discoloration, or curling caused by insect feeding.",
      treat: "Use insecticidal sprays or introduce natural predators like ladybugs.",
      prev: "Regularly inspect plants for pests and maintain garden hygiene."
    },
    {
      name: "animalia",
      des: "Damage caused by animals like rodents, deer, or birds, resulting in chewed leaves or stems.",
      treat: "Use repellents or barriers like fencing.",
      prev: "Protect plants with nets or cages."
    },
    {
      name: "insecta",
      des: "Insect infestations can cause leaf damage, stunted growth, and disease transmission.",
      treat: "Apply insecticides or neem oil.",
      prev: "Encourage beneficial insects and avoid overfertilizing."
    },
    {
      name: "senescence",
      des: "Natural aging of plants leads to yellowing, drying, and shedding of leaves.",
      treat: "Prune old parts and provide proper nutrients.",
      prev: "Maintain healthy growing conditions to delay aging."
    },
    {
      name: "light excess",
      des: "Overexposure to sunlight causes leaf scorch, discoloration, or drying.",
      treat: "Provide shade or relocate the plant.",
      prev: "Match plants to their appropriate light requirements."
    },
    {
      name: "sooty mold",
      des: "A black, sooty coating develops on leaves due to fungal growth on insect secretions.",
      treat: "Wash leaves with soapy water and control pests.",
      prev: "Prevent sap-sucking pests like aphids or whiteflies."
    },
    {
      name: "leaf miners",
      des: "Small larvae create winding trails inside leaves, causing aesthetic damage and reduced photosynthesis.",
      treat: "Remove affected leaves and use neem oil.",
      prev: "Use sticky traps and introduce parasitic wasps."
    },
    {
      name: "bacteria",
      des: "Bacterial infections cause spots, wilting, or ooze on plant surfaces.",
      treat: "Use copper-based bactericides and remove infected parts.",
      prev: "Avoid overhead watering and use disease-resistant varieties."
    },
    {
      name: "sap-sucking pests",
      des: "Pests like aphids and whiteflies suck plant sap, causing yellowing, stunting, and mold growth.",
      treat: "Spray with insecticidal soap or neem oil.",
      prev: "Encourage natural predators and keep plants healthy."
    },
    {
      name: "bacterial leaf spot",
      des: "Water-soaked spots on leaves that eventually turn brown or black, often caused by bacteria.",
      treat: "Remove infected leaves and use copper-based sprays.",
      prev: "Water plants at the base and avoid overcrowding."
    },
    {
      name: "low temperatures and frost damage",
      des: "Frost causes leaf discoloration, wilting, and tissue death in sensitive plants.",
      treat: "Prune damaged parts and provide warmth.",
      prev: "Cover plants during cold spells or move them indoors if possible."
    }
  ];
  

  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [prob, setProb] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [pack, setPack] = useState<{name: string; des: string; treat: string; prev: string} | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
        alert("Please upload a file first.");
        return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    try {
        const res = await axios.post("https://agri-cure-d8gfspt75-naaakuls-projects.vercel.app/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        console.log("Response from Server:", res.data);
         // Log response in browser console
        setResponse(res.data.diseases[0].name); // Display response on UI
        setProb(res.data.diseases[0].probability * 100); // Display response on UI
        plantDiseases.forEach((item, index) => {
            if (item.name === res.data.diseases[0].name.toLowerCase()) {
                setPack(plantDiseases[index]);
            }
        })
    } catch (err) {
        console.error("Error uploading file:", err);
        setResponse("Error analyzing the image. Please try again.");
    } finally {
        setLoading(false);
    }
};


  return (
    <div className="bg-black flex flex-col items-center h-screen w-screen">
      <div className="flex justify-center items-center pt-5">
        <svg className="" width="52" height="50" viewBox="0 0 52 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M44.2451 6.51163C24.3381 14.1395 20.1365 37.7519 20.5241 48.6047C21.2218 44.1085 24.2451 36.0499 30.9894 33.2558C47.2684 26.5116 50.9892 9.68992 51.9193 0C19.5472 1.67442 17.8108 21.3178 20.9891 30.9302C26.9426 13.814 38.9737 7.51938 44.2451 6.51163Z" fill="url(#paint0_linear_134_7)"/>
        <path d="M5.40796 22.5581C17.1289 30.9302 19.9041 44.3411 19.8266 50C18.6638 43.4884 14.0665 40.9302 5.64023 34.4186C0.524202 30.4651 -0.250954 20.8527 0.0591239 16.2791C0.446721 16.8992 2.80331 18.6512 9.12889 20.6977C19.5475 23.8605 20.1366 34.1085 19.1289 38.8372C16.8963 29.5349 9.05137 24.1085 5.40796 22.5581Z" fill="url(#paint1_linear_134_7)"/>
        <defs>
        <linearGradient id="paint0_linear_134_7" x1="25.9597" y1="0" x2="25.9597" y2="50" gradientUnits="userSpaceOnUse">
        <stop stop-color="#218600"/>
        <stop offset="1"/>
        </linearGradient>
        <linearGradient id="paint1_linear_134_7" x1="25.9597" y1="0" x2="25.9597" y2="50" gradientUnits="userSpaceOnUse">
        <stop stop-color="#218600"/>
        <stop offset="1"/>
        </linearGradient>
        </defs>
        </svg>
      </div>

      {(!response && !loading) && (
        <>
          <p className="text-[#B8B8B8] text-center pt-10 px-16">
        Diagnose plant diseases, find instant cures, and chat with our plant expert AI—all in one place!
      </p>
      <p className="text-[#B8B8B8] text-center pt-5 pb-8">
        Upload an Image, Diagnose Now!
      </p>

      <label
        className={`w-72 h-72 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-400 bg-cover bg-center cursor-pointer overflow-hidden ${!image ? 'bg-gray-50' : ''}`}
        style={{ backgroundImage: image ? `url(${image})` : undefined }}
      >
        {!image && (
          <span className="text-gray-500 text-center">Click to upload image</span>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </label>

        <br />
      
      <button onClick={handleSubmit} className="cursor-pointer bg-gradient-to-b from-[#004BAD] to-[#00275B] text-white rounded-xl font-bold px-10 py-2">Submit</button>
        </>
      )}

      {loading && (
        <div className="w-1/2 h-1/2 flex pt-50 justify-center items-center">
          <img src="./load.gif"/>
        </div>
      )}

      {response && (
        <div className="text-[#b8b8b8] w-full p-4">
            <h1 className="text-lg font-bold">{response.charAt(0).toUpperCase() + response.slice(1)}, {prob}%</h1>
            <img className="mb-5 w-1/2 rounded-2xl" src={preview || "default_image_url.jpg"}/>
            <h1 className="text-lg font-bold">Description:</h1>
            <p className="mb-5">{pack?.des}</p>
            <h1 className="text-lg font-bold">Treatment:</h1>
            <p className="mb-5">{pack?.treat}</p>
            <h1 className="text-lg font-bold">Prevention Tip:</h1>
            <p>{pack?.prev}</p>
        </div>
      )}

      {/* <p className="text-[#b8b8b8] text-xs p-10">Made with ❤️ by Nakul</p> */}
    </div>
  )
}

export default App
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Country {
  id: string;
  name: string;
  capital: string;
  joined: number;
  monuments: string[];
  flag: string;
  path: string; // SVG path for the map
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface Institution {
  name: string;
  role: string;
  location: string;
  description: string;
}

export const euCountries: Country[] = [
  {
    id: "AT",
    name: "Áustria",
    capital: "Viena",
    joined: 1995,
    monuments: ["Palácio de Schönbrunn", "Catedral de Santo Estêvão"],
    flag: "🇦🇹",
    path: "M435.5,191.1l2.5-3.5l3.8-0.6l4.2-2.1l1.6,1.4l5.6-2.1l2.4-5.3l3,2.2l4.1-1.1l1.8,0.3l1.1-1.7l1.3,4.5l3.5,0.7l0.1,5.2l2.3,1l1.2,4.8l2.9,2.1l-0.4,3.2l-3.3,1.9l-1.5,4.3l0.8,3.2l-2.4,2.3l-5.6-0.3l-1.8,3.3l-2.4-0.1l-0.5,1.7l-4.7-0.7l-3.3,4l-4.3,0.3l-5.5,5l-2.4-1.2l-4-0.3l-2.2,4l-3.4,0.4l-1.5,1.6l-5-2.2l-1.6-4.9l-4.6,1.4l-1.1-2.9l-4.5-0.1l-1.6-1.1l-0.2-2.3l-1.9,0.3l-2-1.9l-1.2-5l2.4-2.8l0.4-3l1.5-1.5l5.2-1.2l1.6-1.6l-0.4-2.2L429,198l1.4-2.5l5.1-1L435.5,191.1z"
  },
  {
    id: "BE",
    name: "Bélgica",
    capital: "Bruxelas",
    joined: 1958,
    monuments: ["Atomium", "Grand-Place"],
    flag: "🇧🇪",
    path: "M328.7,185.3l3,0.5l1.6-1.6l2.1,0.2l0.9,1l1.7-0.1l1.8-1.5l1.8,2.7l1.1,0.5l0.4,1.8l2.9,1.6l0.2,2.7l-1,3l-1.2,1l-0.1,1.5l-3.2,0.8l-0.2,2l-2.6,3.6l-2.9,0.1l-0.4,3.1l-2,0.3l-2.2-0.7l-0.9-2.3l-1.3,0.5l-2-3l-2.2-0.8l-1.1,1l-0.8-2.6l1.2-1.3l0.2-1.6l-2-2l0.2-1.6l1.7-1l1.9,1.1l2.5-0.1l-0.3-3.1L328.7,185.3z"
  },
  {
    id: "BG",
    name: "Bulgária",
    capital: "Sófia",
    joined: 2007,
    monuments: ["Catedral de Alexandre Nevsky", "Mosteiro de Rila"],
    flag: "🇧🇬",
    path: "M553.3,277l4,0.9l3.3,3.7l6.7,1.1l3.5,2.4l0.1,4.7l4,1.9l0.9,4.4l2,1.3l0.1,3.2l-2.1,3.1l-4,1.1l-4.5-0.1l-4.9-3.2l-3.6,1.4l-1.1,10.6l-2.3,1.9l-5.6,0.5l-4.4,2.5l-4.4,0.3l-2.6-1.2l-3,2.4l-3.1-0.2l-3.8,1.3l-3,0.1l-3.2-3.8l-0.7-3l-2.7-0.7l-1.5-2.6l0.3-6.6l2.9-3.9l1.1-8.1l2.3,0.1l0.6-2.6l2.5-1.5l0.8-3.3l5-4.1l1.7-3.1l6.1-0.2L553.3,277z"
  },
  {
    id: "HR",
    name: "Croácia",
    capital: "Zagrebe",
    joined: 2013,
    monuments: ["Arena de Pula", "Palácio de Diocleciano"],
    flag: "🇭🇷",
    path: "M434,228.6l3.7,0.8l5.4-3.1l1.6,2.1l3.3,0.4l1.3,1.5l2.4-0.1l1.8,2.7l0.6,6.3l-2.7,4.4l-4.2,3l-3.6-1.3l-2.4,2.5l-1.5,5.1l-2.1,1.5l0.1-2.9l-1.9-2l-0.5-5l1.6-1.5l-0.1-4l-3.8,1.6l-1.6-1.6l0.1-2.6l-2-0.8l-1.1,1.3l-2.1-4.2l-1.1-1L434,228.6z"
  },
  {
    id: "CY",
    name: "Chipre",
    capital: "Nicósia",
    joined: 2004,
    monuments: ["Túmulos dos Reis", "Rocha de Afrodite"],
    flag: "🇨🇾",
    path: "M596,400l4,0l2,1.5l3-0.5l2,1l0,2l-3,2.5l-5,0l-3-2z"
  },
  {
    id: "CZ",
    name: "Tchéquia",
    capital: "Praga",
    joined: 2004,
    monuments: ["Castelo de Praga", "Ponte Carlos"],
    flag: "🇨🇿",
    path: "M417.8,168l5.2,1.2l4.8-1.5l4.5,1.1l3.3,4l4.7,0.7l0.5-1.7l2.4,0.1l1.8-3.3l5.6,0.3l1.8,2.8l2.9-0.5l4.2,2.3l-1.2,4.8l-2.3-1l-0.1-5.2l-3.5-0.7l-1.3-4.5l-1.1,1.7l-1.8-0.3l-4.1,1.1l-3-2.2l-2.4,5.3l-5.6,2.1l-1.6-1.4l-4.2,2.1l-3.8,0.6l-2.5,3.5l-3.6,0.3l-5.1,1l-1.4,2.5l-5.9,0.6l0.4,2.2l-1.6,1.6l-5.2,1.2l-1.5,1.5l-0.4,3l-2.4,2.8l-5.2-1.9l-2.8-2.6l0.6-2.6l2.1-1.3l-0.1-5.1l1.1-2.9l4.5-0.1l1.6-1.1l0.2-2.3l1.9-0.3L417.8,168z"
  },
  {
    id: "DK",
    name: "Dinamarca",
    capital: "Copenhaga",
    joined: 1973,
    monuments: ["A Pequena Sereia", "Jardins de Tivoli"],
    flag: "🇩🇰",
    path: "M368,111.4l2.1,3.4l1.1,6.3l-0.5,3.3l-2.1,1.5l-3,0.1l-2.6,2.1l-0.2,4.4l-4.2,1.3l-2,3.3l-3.1,0.3l-1.3,3.7l-3.9-1.3l-0.7-3.6l1.3-5.2l-0.3-4.1l1.4-2.8l1.6,1.6l2.5-0.7l3.6-6.1l2.3-4.3l1.9-1.2L368,111.4z"
  },
  {
    id: "EE",
    name: "Estónia",
    capital: "Tallinn",
    joined: 2004,
    monuments: ["Cidade Velha de Tallinn", "Parque Nacional de Lahemaa"],
    flag: "🇪🇪",
    path: "M486.2,85.2l3.4,0.1l2.7-2.3l2.8,0.5l1.3,3.2l5,1.1l2.4-0.1l1.8,2.7l0.6,6.3l-2.7,4.4l-4.2,3l-3.6-1.3l-2.4,2.5l-5.1-0.1l-1.6-1.5l-0.1-4l-3.8,1.6l-1.6-1.6l0.1-2.6l-2-0.8L486.2,85.2z"
  },
  {
    id: "FI",
    name: "Finlândia",
    capital: "Helsínquia",
    joined: 1995,
    monuments: ["Catedral de Helsínquia", "Suomenlinna"],
    flag: "🇫🇮",
    path: "M496,82l2.3-5l3.2-1l1.9-4.8l2.5,0.7l3.6-6.1l2.3-4.3l1.9,1.2l4.8,0.3l1.8,3.3l2.4-0.1l0.5,1.7l4.7,0.7l3.3-4l4.3-0.3l5.5-5l2.4,1.2l4,0.3l2.2-4l3.4-0.4l1.5-1.6l5,2.2l-1.1,10.6l-2.3,1.9l-5.6,0.5l-4.4,2.5l-4.4,0.3l-2.6-1.2l-3,2.4l-3.1-0.2l-3.8,1.3l-3,0.1l-3.2-3.8l-0.7-3l-2.7-0.7l-1.5-2.6l0.3-6.6l2.9-3.9l-1.3,4.5l3.5,0.7l0.1,5.2l2.3,1l1.2,4.8l2.9,2.1l-0.4,3.2l-3.3,1.9l-1.5,4.3l0.8,3.2l-2.4,2.3L496,82z"
  },
  {
    id: "FR",
    name: "França",
    capital: "Paris",
    joined: 1958,
    monuments: ["Torre Eiffel", "Museu do Louvre"],
    flag: "🇫🇷",
    path: "M328.7,185.3l1.2,4.8l2.9,2.1l-0.4,3.2l-3.3,1.9l-1.5,4.3l0.8,3.2l-2.4,2.3l-5.6-0.3l-1.8,3.3l2.4-0.1l0.5,1.7l4.7,0.7l3.3-4l4.3-0.3l5.5-5l2.4,1.2l4,0.3l2.2-4l3.4-0.4l1.5-1.6l5,2.2l1.6,4.9l4.6-1.4l1.1,2.9l4.5,0.1l1.6,1.1l0.2,2.3l1.9-0.3l2,1.9l1.2,5l-2.4,2.8l-0.4,3l-1.5,1.5l-5.2,1.2l-1.6,1.6l0.4,2.2l-5.1,1l-1.4,2.5l-5.9,0.6l-4.2-2.1l-3.8,0.6l-2.5,3.5l-3.6,0.3l-5.1,1l-1.4,2.5l-5.9,0.6l-4.2-2.1l-3.8,0.6l-2.5,3.5l-3.6,0.3l-5.1,1l-1.4,2.5l-5.9,0.6l-4.2-2.1l-3.8,0.6l-2.5,3.5l-3.6,0.3l-5.1,1l-1.4,2.5l-5.9,0.6l-4.2-2.1l-3.8,0.6L250,250z"
  },
  {
    id: "DE",
    name: "Alemanha",
    capital: "Berlim",
    joined: 1958,
    monuments: ["Porta de Brandemburgo", "Catedral de Colónia"],
    flag: "🇩🇪",
    path: "M380.6,119l3.5,4l4.8-1.5l4.5,1.1l3.3,4l4.7,0.7l0.5-1.7l2.4,0.1l1.8-3.3l5.6,0.3l1.8,2.8l2.9-0.5l4.2,2.3l-1.2,4.8l-2.3-1l-0.1-5.2l-3.5-0.7l-1.3-4.5l-1.1,1.7l-1.8-0.3l-4.1,1.1l-3-2.2l-2.4,5.3l-5.6,2.1l-1.6-1.4l-4.2,2.1l-3.8,0.6l-2.5,3.5l-3.6,0.3L380.6,119z"
  },
  {
    id: "GR",
    name: "Grécia",
    capital: "Atenas",
    joined: 1981,
    monuments: ["Acrópole de Atenas", "Partenon"],
    flag: "🇬🇷",
    path: "M550,350l4,0.9l3.3,3.7l6.7,1.1l3.5,2.4l0.1,4.7l4,1.9l0.9,4.4l2,1.3l0.1,3.2l-2.1,3.1l-4,1.1l-4.5-0.1l-4.9-3.2l-3.6,1.4l-1.1,10.6l-2.3,1.9l-5.6,0.5l-4.4,2.5l-4.4,0.3l-2.6-1.2l-3,2.4l-3.1-0.2l-3.8,1.3l-3,0.1l-3.2-3.8l-0.7-3l-2.7-0.7l-1.5-2.6l0.3-6.6l2.9-3.9l1.1-8.1l2.3,0.1l0.6-2.6l2.5-1.5l0.8-3.3l5-4.1l1.7-3.1l6.1-0.2L550,350z"
  },
  {
    id: "HU",
    name: "Hungria",
    capital: "Budapeste",
    joined: 2004,
    monuments: ["Parlamento de Budapeste", "Castelo de Buda"],
    flag: "🇭🇺",
    path: "M475,215l3.5,4l4.8-1.5l4.5,1.1l3.3,4l4.7,0.7l0.5-1.7l2.4,0.1l1.8-3.3l5.6,0.3l1.8,2.8l2.9-0.5l4.2,2.3l-1.2,4.8l-2.3-1l-0.1-5.2l-3.5-0.7l-1.3-4.5l-1.1,1.7l-1.8-0.3l-4.1,1.1l-3-2.2l-2.4,5.3l-5.6,2.1l-1.6-1.4l-4.2,2.1l-3.8,0.6l-2.5,3.5l-3.6,0.3L475,215z"
  },
  {
    id: "IE",
    name: "Irlanda",
    capital: "Dublim",
    joined: 1973,
    monuments: ["Cliffs of Moher", "Guinness Storehouse"],
    flag: "🇮🇪",
    path: "M240,160l4,0.9l3.3,3.7l6.7,1.1l3.5,2.4l0.1,4.7l4,1.9l0.9,4.4l2,1.3l0.1,3.2l-2.1,3.1l-4,1.1l-4.5-0.1l-4.9-3.2l-3.6,1.4l-1.1,10.6l-2.3,1.9l-5.6,0.5l-4.4,2.5l-4.4,0.3l-2.6-1.2l-3,2.4l-3.1-0.2l-3.8,1.3l-3,0.1l-3.2-3.8l-0.7-3l-2.7-0.7l-1.5-2.6l0.3-6.6l2.9-3.9l1.1-8.1l2.3,0.1l0.6-2.6l2.5-1.5l0.8-3.3l5-4.1l1.7-3.1l6.1-0.2L240,160z"
  },
  {
    id: "IT",
    name: "Itália",
    capital: "Roma",
    joined: 1958,
    monuments: ["Coliseu", "Torre de Pisa"],
    flag: "🇮🇹",
    path: "M420,280l4,0.9l3.3,3.7l6.7,1.1l3.5,2.4l0.1,4.7l4,1.9l0.9,4.4l2,1.3l0.1,3.2l-2.1,3.1l-4,1.1l-4.5-0.1l-4.9-3.2l-3.6,1.4l-1.1,10.6l-2.3,1.9l-5.6,0.5l-4.4,2.5l-4.4,0.3l-2.6-1.2l-3,2.4l-3.1-0.2l-3.8,1.3l-3,0.1l-3.2-3.8l-0.7-3l-2.7-0.7l-1.5-2.6l0.3-6.6l2.9-3.9l1.1-8.1l2.3,0.1l0.6-2.6l2.5-1.5l0.8-3.3l5-4.1l1.7-3.1l6.1-0.2L420,280z"
  },
  {
    id: "LV",
    name: "Letónia",
    capital: "Riga",
    joined: 2004,
    monuments: ["Monumento à Liberdade", "Catedral de Riga"],
    flag: "🇱🇻",
    path: "M495,115l3.5,4l4.8-1.5l4.5,1.1l3.3,4l4.7,0.7l0.5-1.7l2.4,0.1l1.8-3.3l5.6,0.3l1.8,2.8l2.9-0.5l4.2,2.3l-1.2,4.8l-2.3-1l-0.1-5.2l-3.5-0.7l-1.3-4.5l-1.1,1.7l-1.8-0.3l-4.1,1.1l-3-2.2l-2.4,5.3l-5.6,2.1l-1.6-1.4l-4.2,2.1l-3.8,0.6l-2.5,3.5l-3.6,0.3L495,115z"
  },
  {
    id: "LT",
    name: "Lituânia",
    capital: "Vílnius",
    joined: 2004,
    monuments: ["Castelo de Gediminas", "Colina das Cruzes"],
    flag: "🇱🇹",
    path: "M490,135l3.5,4l4.8-1.5l4.5,1.1l3.3,4l4.7,0.7l0.5-1.7l2.4,0.1l1.8-3.3l5.6,0.3l1.8,2.8l2.9-0.5l4.2,2.3l-1.2,4.8l-2.3-1l-0.1-5.2l-3.5-0.7l-1.3-4.5l-1.1,1.7l-1.8-0.3l-4.1,1.1l-3-2.2l-2.4,5.3l-5.6,2.1l-1.6-1.4l-4.2,2.1l-3.8,0.6l-2.5,3.5l-3.6,0.3L490,135z"
  },
  {
    id: "LU",
    name: "Luxemburgo",
    capital: "Cidade do Luxemburgo",
    joined: 1958,
    monuments: ["Casamatas de Bock", "Palácio de Grão-Ducal"],
    flag: "🇱🇺",
    path: "M335,200l2,0l0,2l-2,0z"
  },
  {
    id: "MT",
    name: "Malta",
    capital: "Valeta",
    joined: 2004,
    monuments: ["Co-Catedral de São João", "Porto de Valeta"],
    flag: "🇲🇹",
    path: "M450,420l2,0l0,2l-2,0z"
  },
  {
    id: "NL",
    name: "Países Baixos",
    capital: "Amesterdão",
    joined: 1958,
    monuments: ["Museu Van Gogh", "Canais de Amesterdão"],
    flag: "🇳🇱",
    path: "M335,170l3.5,4l4.8-1.5l4.5,1.1l3.3,4l4.7,0.7l0.5-1.7l2.4,0.1l1.8-3.3l5.6,0.3l1.8,2.8l2.9-0.5l4.2,2.3l-1.2,4.8l-2.3-1l-0.1-5.2l-3.5-0.7l-1.3-4.5l-1.1,1.7l-1.8-0.3l-4.1,1.1l-3-2.2l-2.4,5.3l-5.6,2.1l-1.6-1.4l-4.2,2.1l-3.8,0.6l-2.5,3.5l-3.6,0.3L335,170z"
  },
  {
    id: "PL",
    name: "Polónia",
    capital: "Varsóvia",
    joined: 2004,
    monuments: ["Praça do Castelo", "Castelo de Wawel"],
    flag: "🇵🇱",
    path: "M460,150l3.5,4l4.8-1.5l4.5,1.1l3.3,4l4.7,0.7l0.5-1.7l2.4,0.1l1.8-3.3l5.6,0.3l1.8,2.8l2.9-0.5l4.2,2.3l-1.2,4.8l-2.3-1l-0.1-5.2l-3.5-0.7l-1.3-4.5l-1.1,1.7l-1.8-0.3l-4.1,1.1l-3-2.2l-2.4,5.3l-5.6,2.1l-1.6-1.4l-4.2,2.1l-3.8,0.6l-2.5,3.5l-3.6,0.3L460,150z"
  },
  {
    id: "PT",
    name: "Portugal",
    capital: "Lisboa",
    joined: 1986,
    monuments: ["Torre de Belém", "Mosteiro dos Jerónimos"],
    flag: "🇵🇹",
    path: "M160,330l1.2,4.8l2.9,2.1l-0.4,3.2l-3.3,1.9l-1.5,4.3l0.8,3.2l-2.4,2.3l-5.6-0.3l-1.8,3.3l2.4-0.1l0.5,1.7l4.7,0.7l3.3-4l4.3-0.3l5.5-5l2.4,1.2l4,0.3l2.2-4l3.4-0.4l1.5-1.6l5,2.2l1.6,4.9l4.6-1.4l1.1,2.9l4.5,0.1l1.6,1.1l0.2,2.3l1.9-0.3l2,1.9l1.2,5L160,330z"
  },
  {
    id: "RO",
    name: "Roménia",
    capital: "Bucareste",
    joined: 2007,
    monuments: ["Palácio do Parlamento", "Castelo de Bran"],
    flag: "🇷🇴",
    path: "M530,240l3.5,4l4.8-1.5l4.5,1.1l3.3,4l4.7,0.7l0.5-1.7l2.4,0.1l1.8-3.3l5.6,0.3l1.8,2.8l2.9-0.5l4.2,2.3l-1.2,4.8l-2.3-1l-0.1-5.2l-3.5-0.7l-1.3-4.5l-1.1,1.7l-1.8-0.3l-4.1,1.1l-3-2.2l-2.4,5.3l-5.6,2.1l-1.6-1.4l-4.2,2.1l-3.8,0.6l-2.5,3.5l-3.6,0.3L530,240z"
  },
  {
    id: "SK",
    name: "Eslováquia",
    capital: "Bratislava",
    joined: 2004,
    monuments: ["Castelo de Bratislava", "Catedral de Santa Isabel"],
    flag: "🇸🇰",
    path: "M465,190l3.5,4l4.8-1.5l4.5,1.1l3.3,4l4.7,0.7l0.5-1.7l2.4,0.1l1.8-3.3l5.6,0.3l1.8,2.8l2.9-0.5l4.2,2.3l-1.2,4.8l-2.3-1l-0.1-5.2l-3.5-0.7l-1.3-4.5l-1.1,1.7l-1.8-0.3l-4.1,1.1l-3-2.2l-2.4,5.3l-5.6,2.1l-1.6-1.4l-4.2,2.1l-3.8,0.6l-2.5,3.5l-3.6,0.3L465,190z"
  },
  {
    id: "SI",
    name: "Eslovénia",
    capital: "Liubliana",
    joined: 2004,
    monuments: ["Castelo de Liubliana", "Lago Bled"],
    flag: "🇸🇮",
    path: "M435,220l2,0l0,2l-2,0z"
  },
  {
    id: "ES",
    name: "Espanha",
    capital: "Madrid",
    joined: 1986,
    monuments: ["Sagrada Família", "Alhambra"],
    flag: "🇪🇸",
    path: "M180,330l1.2,4.8l2.9,2.1l-0.4,3.2l-3.3,1.9l-1.5,4.3l0.8,3.2l-2.4,2.3l-5.6-0.3l-1.8,3.3l2.4-0.1l0.5,1.7l4.7,0.7l3.3-4l4.3-0.3l5.5-5l2.4,1.2l4,0.3l2.2-4l3.4-0.4l1.5-1.6l5,2.2l1.6,4.9l4.6-1.4l1.1,2.9l4.5,0.1l1.6,1.1l0.2,2.3l1.9-0.3l2,1.9l1.2,5L180,330z"
  },
  {
    id: "SE",
    name: "Suécia",
    capital: "Estocolmo",
    joined: 1995,
    monuments: ["Câmara Municipal de Estocolmo", "Museu Vasa"],
    flag: "🇸🇪",
    path: "M410,80l3.5,4l4.8-1.5l4.5,1.1l3.3,4l4.7,0.7l0.5-1.7l2.4,0.1l1.8-3.3l5.6,0.3l1.8,2.8l2.9-0.5l4.2,2.3l-1.2,4.8l-2.3-1l-0.1-5.2l-3.5-0.7l-1.3-4.5l-1.1,1.7l-1.8-0.3l-4.1,1.1l-3-2.2l-2.4,5.3l-5.6,2.1l-1.6-1.4l-4.2,2.1l-3.8,0.6l-2.5,3.5l-3.6,0.3L410,80z"
  }
];

export const euTimeline: TimelineEvent[] = [
  { year: "1951", title: "Tratado de Paris", description: "Criação da Comunidade Europeia do Carvão e do Aço (CECA) por seis países: Bélgica, França, Alemanha, Itália, Luxemburgo e Países Baixos." },
  { year: "1957", title: "Tratados de Roma", description: "Criação da Comunidade Económica Europeia (CEE) e da Comunidade Europeia da Energia Atómica (Euratom)." },
  { year: "1973", title: "Primeiro Alargamento", description: "Dinamarca, Irlanda e Reino Unido aderem à Comunidade Europeia." },
  { year: "1979", title: "Primeiras Eleições Diretas", description: "Os cidadãos europeus elegem pela primeira vez os membros do Parlamento Europeu por sufrágio universal direto." },
  { year: "1981", title: "Adesão da Grécia", description: "A Grécia torna-se o décimo país membro." },
  { year: "1986", title: "Adesão de Portugal e Espanha", description: "Portugal e Espanha aderem à Comunidade Europeia. Assinatura do Ato Único Europeu." },
  { year: "1992", title: "Tratado de Maastricht", description: "Criação da União Europeia e lançamento das bases para a moeda única e para a política externa e de segurança comum." },
  { year: "1995", title: "Adesão da Áustria, Finlândia e Suécia", description: "A UE passa a contar com 15 Estados-Membros." },
  { year: "2002", title: "Introdução do Euro", description: "As notas e moedas de euro entram em circulação em 12 países membros." },
  { year: "2004", title: "Grande Alargamento", description: "Dez novos países aderem à UE: Chipre, Czechia, Estónia, Hungria, Letónia, Lituânia, Malta, Polónia, Eslováquia e Eslovénia." },
  { year: "2007", title: "Tratado de Lisboa", description: "Assinatura do tratado que visa tornar a UE mais democrática, eficiente e capaz de enfrentar desafios globais." },
  { year: "2013", title: "Adesão da Croácia", description: "A Croácia torna-se o 28.º país membro da UE." },
  { year: "2020", title: "Saída do Reino Unido (Brexit)", description: "O Reino Unido abandona oficialmente a União Europeia." }
];

export const euInstitutions: Institution[] = [
  {
    name: "Parlamento Europeu",
    role: "Poder Legislativo",
    location: "Estrasburgo (França) / Bruxelas (Bélgica)",
    description: "Representa os cidadãos da UE e é eleito diretamente por eles a cada 5 anos. Partilha o poder legislativo com o Conselho."
  },
  {
    name: "Conselho Europeu",
    role: "Definição de Orientação Política",
    location: "Bruxelas (Bélgica)",
    description: "Composto pelos chefes de Estado ou de Governo, define as prioridades políticas gerais e a orientação da UE."
  },
  {
    name: "Comissão Europeia",
    role: "Poder Executivo",
    location: "Bruxelas (Bélgica)",
    description: "Propõe novas leis e garante a aplicação das políticas e dos fundos da UE. Representa os interesses da União como um todo."
  },
  {
    name: "Tribunal de Justiça da UE",
    role: "Poder Judicial",
    location: "Luxemburgo",
    description: "Garante o respeito pelo direito europeu e a interpretação uniforme dos tratados em todos os países membros."
  },
  {
    name: "Banco Central Europeu (BCE)",
    role: "Estabilidade de Preços",
    location: "Frankfurt (Alemanha)",
    description: "Gere o euro e mantém a estabilidade de preços na zona euro."
  }
];

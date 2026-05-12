
export const translations = {
  pt: {
    nav: {
      inicio: "Início",
      capitais: "Capitais",
      adesao: "Adesão",
      historia: "História",
      instituicoes: "Instituições",
      cidadania: "Cidadania",
      glossario: "Glossário",
      quiz: "Super Quiz",
      guia: "Ajuda"
    },
    common: {
      score: "Pontuação",
      correct: "Correto!",
      incorrect: "Incorreto",
      tryAgain: "Tenta outra vez",
      next: "Próxima",
      finish: "Finalizar",
      achievements: "Conquistas",
      feedback: "Feedback Formativo"
    },
    badges: {
      master_hist: "Mestre da História",
      geo_elite: "Geógrafo de Elite",
      euro_expert: "Especialista da União"
    }
  },
  en: {
    nav: {
      inicio: "Home",
      capitais: "Capitals",
      adesao: "Accession",
      historia: "History",
      instituicoes: "Institutions",
      cidadania: "Citizenship",
      glossario: "Glossary",
      quiz: "Super Quiz",
      guia: "Help"
    },
    common: {
      score: "Score",
      correct: "Correct!",
      incorrect: "Incorrect",
      tryAgain: "Try again",
      next: "Next",
      finish: "Finish",
      achievements: "Achievements",
      feedback: "Formative Feedback"
    },
    badges: {
      master_hist: "History Master",
      geo_elite: "Elite Geographer",
      euro_expert: "Union Expert"
    }
  },
  fr: {
    nav: {
      inicio: "Accueil",
      capitais: "Capitales",
      adesao: "Adhésion",
      historia: "Histoire",
      instituicoes: "Institutions",
      cidadania: "Citoyenneté",
      glossario: "Glossaire",
      quiz: "Super Quiz",
      guia: "Aide"
    },
    common: {
      score: "Score",
      correct: "Correct!",
      incorrect: "Incorrect",
      tryAgain: "Réessaie",
      next: "Suivant",
      finish: "Terminer",
      achievements: "Hauts Faits",
      feedback: "Feedback Formatif"
    },
    badges: {
      master_hist: "Maître de l'Histoire",
      geo_elite: "Géographe d'Élite",
      euro_expert: "Expert de l'Union"
    }
  }
};

export const glossary = [
  {
    id: 'schengen',
    term: { pt: "Espaço Schengen", en: "Schengen Area", fr: "Espace Schengen" },
    def: {
      pt: "Área de livre circulação onde os controlos nas fronteiras internas foram abolidos.",
      en: "The area comprising 29 European countries that have officially abolished border control at their mutual borders.",
      fr: "Un espace de libre circulation des personnes entre les États signataires de l'accord de Schengen."
    }
  },
  {
    id: 'eurozone',
    term: { pt: "Zona Euro", en: "Eurozone", fr: "Zone Euro" },
    def: {
      pt: "União monetária dos Estados-membros da UE que adotaram o euro como moeda oficial.",
      en: "A currency union of 20 member states of the European Union that have adopted the euro.",
      fr: "L'ensemble des pays de l'Union européenne qui utilisent l'euro comme monnaie unique."
    }
  },
  {
    id: 'parliament',
    term: { pt: "Parlamento Europeu", en: "European Parliament", fr: "Parlement européen" },
    def: {
      pt: "A única instituição da UE eleita por sufrágio direto, representando os cidadãos.",
      en: "The only directly elected EU institution, representing the citizens of the EU.",
      fr: "La seule institution de l'UE élue au suffrage direct, représentant les citoyens."
    }
  }
];

export const mainQuiz = [
  {
    id: 1,
    question: {
      pt: "Quem propôs a criação da CECA em 1950?",
      en: "Who proposed the creation of the ECSC in 1950?",
      fr: "Qui a proposé la création de la CECA en 1950 ?"
    },
    options: [
      { id: 'a', text: { pt: "Robert Schuman", en: "Robert Schuman", fr: "Robert Schuman" } },
      { id: 'b', text: { pt: "Jean Monnet", en: "Jean Monnet", fr: "Jean Monnet" } },
      { id: 'c', text: { pt: "Konrad Adenauer", en: "Konrad Adenauer", fr: "Konrad Adenauer" } }
    ],
    correct: 'a',
    explanation: {
      pt: "Robert Schuman propôs o plano que uniu a produção francesa e alemã de carvão e aço.",
      en: "Robert Schuman proposed the plan that pooled French and German coal and steel production.",
      fr: "Robert Schuman a proposé le plan qui a mis em commun la production française et allemande de charbon et d'acier."
    }
  },
  {
    id: 2,
    question: {
      pt: "Em que ano foi assinado o Tratado de Roma?",
      en: "In what year was the Treaty of Rome signed?",
      fr: "En quelle année le traité de Rome a-t-il été signé ?"
    },
    options: [
      { id: 'a', text: { pt: "1957", en: "1957", fr: "1957" } },
      { id: 'b', text: { pt: "1986", en: "1986", fr: "1986" } },
      { id: 'c', text: { pt: "1992", en: "1992", fr: "1992" } }
    ],
    correct: 'a',
    explanation: {
      pt: "O Tratado de Roma de 1957 deu origem à CEE.",
      en: "The 1957 Treaty of Rome gave birth to the EEC.",
      fr: "Le traité de Rome de 1957 a donné naissance à la CEE."
    }
  },
  {
    id: 3,
    question: {
      pt: "Qual é a cidade sede do Tribunal de Justiça da UE?",
      en: "Which city is the seat of the Court of Justice of the EU?",
      fr: "Quelle ville est le siège de la Cour de justice de l'UE ?"
    },
    options: [
      { id: 'a', text: { pt: "Luxemburgo", en: "Luxembourg", fr: "Luxembourg" } },
      { id: 'b', text: { pt: "Haya", en: "The Hague", fr: "La Haye" } },
      { id: 'c', text: { pt: "Bruxelas", en: "Brussels", fr: "Bruxelles" } }
    ],
    correct: 'a',
    explanation: {
      pt: "O Tribunal de Justiça está sediado no Luxemburgo desde a sua criação.",
      en: "The Court of Justice has been based in Luxembourg since its creation.",
      fr: "La Cour de justice est basée à Luxembourg depuis sa création."
    }
  },
  {
    id: 4,
    question: {
      pt: "Qual destes países NÃO faz parte da Zona Euro?",
      en: "Which of these countries is NOT part of the Eurozone?",
      fr: "Lequel de ces pays ne fait PAS partie de la zone euro ?"
    },
    options: [
      { id: 'a', text: { pt: "Dinamarca", en: "Denmark", fr: "Danemark" } },
      { id: 'b', text: { pt: "Irlanda", en: "Ireland", fr: "Irlande" } },
      { id: 'c', text: { pt: "Estónia", en: "Estonia", fr: "Estonie" } }
    ],
    correct: 'a',
    explanation: {
      pt: "A Dinamarca tem uma cláusula de exclusão e mantém a coroa dinamarquesa.",
      en: "Denmark has an opt-out clause and maintains the Danish krone.",
      fr: "Le Danemark dispose d'une clause d'exemption et conserve la couronne danoise."
    }
  },
  {
    id: 5,
    question: {
      pt: "O que simbolizam as 12 estrelas na bandeira da UE?",
      en: "What do the 12 stars on the EU flag symbolize?",
      fr: "Que symbolisent les 12 étoiles du drapeau européen ?"
    },
    options: [
      { id: 'a', text: { pt: "Os 12 países fundadores", en: "The 12 founding countries", fr: "Les 12 pays fondateurs" } },
      { id: 'b', text: { pt: "Ideais de unidade e harmonia", en: "Ideals of unity and harmony", fr: "Les idéaux d'unité et d'harmonie" } },
      { id: 'c', text: { pt: "Os 12 meses do ano", en: "The 12 months of the year", fr: "Les 12 mois de l'année" } }
    ],
    correct: 'b',
    explanation: {
      pt: "O número 12 é um símbolo de perfeição e plenitude, não representa o número de países.",
      en: "The number 12 is a symbol of perfection and fullness, not the number of countries.",
      fr: "Le chiffre 12 est un symbole de perfection et de plénitude, il não representa pas le nombre de pays."
    }
  }
];

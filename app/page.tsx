"use client";

import React, { useState } from "react";
import { 
  Globe, 
  LayoutTemplate, 
  ShieldCheck, 
  ArrowRight, 
  Plus, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronLeft,
  Download
} from "lucide-react";

type Language = "en" | "fi" | "fr" | "es" | "de";
type TemplateType = "minimalist" | "cozy";
type Step = "setup" | "editor";

type Experience = {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
};

type Education = {
  id: string;
  school: string;
  degree: string;
  graduationYear: string;
};

type CVData = {
  personalInfo: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    profileImage: string | null;
  };
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string;
};

const localizedInitialData: Record<Language, CVData> = {
  en: {
    personalInfo: {
      fullName: "Jane Doe",
      jobTitle: "Senior Product Designer",
      email: "jane.doe@example.com",
      phone: "+1 234 567 8900",
      location: "San Francisco, CA",
      profileImage: null,
    },
    summary: "Creative and detail-oriented Senior Product Designer with over 8 years of experience building user-centric digital products. Proven track record of leading design teams and delivering high-quality solutions from concept to launch.",
    experience: [
      {
        id: "1",
        company: "Tech Innovations Inc.",
        role: "Lead Designer",
        startDate: "Mar 2020",
        endDate: "Present",
        description: "Spearheaded the redesign of the core product, resulting in a 30% increase in user engagement. Managed a team of 5 designers and collaborated closely with engineering and product teams.",
      },
      {
        id: "2",
        company: "Creative Agency",
        role: "UX/UI Designer",
        startDate: "Jun 2016",
        endDate: "Feb 2020",
        description: "Designed intuitive user interfaces for various clients across e-commerce, healthcare, and finance sectors. Conducted user research and usability testing to inform design decisions.",
      }
    ],
    education: [
      {
        id: "1",
        school: "University of Design",
        degree: "BFA in Interaction Design",
        graduationYear: "2016",
      },
    ],
    skills: "Figma, Sketch, Adobe Creative Suite, Prototyping, User Research, HTML/CSS, Wireframing, Agile Methodologies",
  },
  fi: {
    personalInfo: {
      fullName: "Matti Meikäläinen",
      jobTitle: "Vanhempi Tuotesuunnittelija",
      email: "matti@esimerkki.fi",
      phone: "+358 40 123 4567",
      location: "Helsinki, Suomi",
      profileImage: null,
    },
    summary: "Luova ja yksityiskohtiin keskittyvä vanhempi tuotesuunnittelija, jolla on yli 8 vuoden kokemus käyttäjäkeskeisten digitaalisten tuotteiden rakentamisesta. Vahva näyttö suunnittelutiimien johtamisesta ja laadukkaiden ratkaisujen toimittamisesta konseptista julkaisuun.",
    experience: [
      {
        id: "1",
        company: "Tech Innovations Oy",
        role: "Johtava Suunnittelija",
        startDate: "Maa 2020",
        endDate: "Nykyhetki",
        description: "Johti ydintuotteen uudelleensuunnittelua, mikä johti 30 % kasvuun käyttäjien sitoutumisessa. Johti 5 suunnittelijan tiimiä ja teki tiivistä yhteistyötä insinööri- ja tuotetiimien kanssa.",
      },
      {
        id: "2",
        company: "Luova Toimisto",
        role: "UX/UI-suunnittelija",
        startDate: "Kesä 2016",
        endDate: "Helmi 2020",
        description: "Suunnitteli intuitiivisia käyttöliittymiä useille asiakkaille verkkokaupan, terveydenhuollon ja rahoituksen aloilla. Suoritti käyttäjätutkimusta ja käytettävyystestausta suunnittelupäätösten tueksi.",
      }
    ],
    education: [
      {
        id: "1",
        school: "Muotoiluyliopisto",
        degree: "Vuorovaikutteisen suunnittelun kandidaatti",
        graduationYear: "2016",
      },
    ],
    skills: "Figma, Sketch, Adobe Creative Suite, Prototyyppien luonti, Käyttäjätutkimus, HTML/CSS, Rautalankamallit, Ketterät menetelmät",
  },
  fr: {
    personalInfo: {
      fullName: "Jean Dupont",
      jobTitle: "Concepteur de Produits Senior",
      email: "jean.dupont@exemple.fr",
      phone: "+33 1 23 45 67 89",
      location: "Paris, France",
      profileImage: null,
    },
    summary: "Concepteur de produits senior créatif et soucieux des détails avec plus de 8 ans d'expérience dans la création de produits numériques centrés sur l'utilisateur. Expérience avérée dans la direction d'équipes de conception et la livraison de solutions de haute qualité, du concept au lancement.",
    experience: [
      {
        id: "1",
        company: "Tech Innovations SA",
        role: "Designer Principal",
        startDate: "Mar 2020",
        endDate: "Présent",
        description: "A dirigé la refonte du produit principal, entraînant une augmentation de 30 % de l'engagement des utilisateurs. A géré une équipe de 5 designers et collaboré étroitement avec les équipes d'ingénierie et de produits.",
      },
      {
        id: "2",
        company: "Agence Créative",
        role: "Designer UX/UI",
        startDate: "Juin 2016",
        endDate: "Fév 2020",
        description: "A conçu des interfaces utilisateur intuitives pour divers clients dans les secteurs du commerce électronique, de la santé et de la finance. A mené des recherches sur les utilisateurs et des tests d'utilisabilité pour éclairer les décisions de conception.",
      }
    ],
    education: [
      {
        id: "1",
        school: "Université de Design",
        degree: "Licence en Design d'Interaction",
        graduationYear: "2016",
      },
    ],
    skills: "Figma, Sketch, Adobe Creative Suite, Prototypage, Recherche Utilisateur, HTML/CSS, Wireframing, Méthodologies Agiles",
  },
  es: {
    personalInfo: {
      fullName: "Juan Pérez",
      jobTitle: "Diseñador de Productos Senior",
      email: "juan.perez@ejemplo.es",
      phone: "+34 912 345 678",
      location: "Madrid, España",
      profileImage: null,
    },
    summary: "Diseñador de productos senior creativo y detallista con más de 8 años de experiencia en la creación de productos digitales centrados en el usuario. Historial comprobado liderando equipos de diseño y entregando soluciones de alta calidad desde el concepto hasta el lanzamiento.",
    experience: [
      {
        id: "1",
        company: "Tech Innovations S.A.",
        role: "Diseñador Principal",
        startDate: "Mar 2020",
        endDate: "Presente",
        description: "Lideró el rediseño del producto principal, lo que resultó en un aumento del 30 % en la participación de los usuarios. Dirigió un equipo de 5 diseñadores y colaboró estrechamente con los equipos de ingeniería y productos.",
      },
      {
        id: "2",
        company: "Agencia Creativa",
        role: "Diseñador UX/UI",
        startDate: "Jun 2016",
        endDate: "Feb 2020",
        description: "Diseñó interfaces de usuario intuitivas para varios clientes en los sectores de comercio electrónico, salud y finanzas. Realizó investigaciones de usuarios y pruebas de usabilidad para informar las decisiones de diseño.",
      }
    ],
    education: [
      {
        id: "1",
        school: "Universidad de Diseño",
        degree: "Licenciatura en Diseño de Interacción",
        graduationYear: "2016",
      },
    ],
    skills: "Figma, Sketch, Adobe Creative Suite, Prototipado, Investigación de Usuarios, HTML/CSS, Wireframing, Metodologías Ágiles",
  },
  de: {
    personalInfo: {
      fullName: "Max Mustermann",
      jobTitle: "Senior Produktdesigner",
      email: "max.mustermann@beispiel.de",
      phone: "+49 30 123456",
      location: "Berlin, Deutschland",
      profileImage: null,
    },
    summary: "Kreativer und detailorientierter Senior Produktdesigner mit über 8 Jahren Erfahrung in der Entwicklung nutzerzentrierter digitaler Produkte. Nachgewiesene Erfolgsbilanz bei der Leitung von Designteams und der Bereitstellung hochwertiger Lösungen vom Konzept bis zur Markteinführung.",
    experience: [
      {
        id: "1",
        company: "Tech Innovations GmbH",
        role: "Leitender Designer",
        startDate: "Mär 2020",
        endDate: "Heute",
        description: "Leitete die Neugestaltung des Kernprodukts, was zu einer 30%igen Steigerung des Nutzerengagements führte. Leitete ein Team von 5 Designern und arbeitete eng mit den Engineering- und Produktteams zusammen.",
      },
      {
        id: "2",
        company: "Kreativagentur",
        role: "UX/UI Designer",
        startDate: "Jun 2016",
        endDate: "Feb 2020",
        description: "Entwarf intuitive Benutzeroberflächen für verschiedene Kunden in den Bereichen E-Commerce, Gesundheitswesen und Finanzen. Führte Nutzerforschung und Usability-Tests durch, um Designentscheidungen zu treffen.",
      }
    ],
    education: [
      {
        id: "1",
        school: "Universität für Design",
        degree: "Bachelor in Interaktionsdesign",
        graduationYear: "2016",
      },
    ],
    skills: "Figma, Sketch, Adobe Creative Suite, Prototyping, Nutzerforschung, HTML/CSS, Wireframing, Agile Methoden",
  }
};

const translations = {
  en: {
    setupTitle: "Welcome to CV Maker",
    languageSelector: "Select Language",
    templateSelector: "Choose Template",
    minimalist: "Minimalist",
    cozy: "Playful & Pink",
    privacyTitle: "Privacy First",
    privacyText: "Your personal data never leaves your browser. We don't save your information on any server.",
    startBuilding: "Start Building",
    personalInfo: "Personal Information",
    fullName: "Full Name",
    jobTitle: "Job Title",
    email: "Email",
    phone: "Phone",
    location: "Location",
    summary: "Professional Summary",
    experience: "Experience",
    addExperience: "Add Experience",
    company: "Company",
    role: "Role",
    startDate: "Start Date",
    endDate: "End Date",
    description: "Description",
    education: "Education",
    addEducation: "Add Education",
    school: "School / University",
    degree: "Degree",
    graduationYear: "Graduation Year",
    skills: "Skills",
    skillsPlaceholder: "e.g. JavaScript, React, UI/UX Design, Figma",
    remove: "Remove",
    noExperience: "No experience added yet.",
    noEducation: "No education added yet.",
    exportPdf: "Download CV as PDF",
    backToSetup: "Back to Setup",
    profileImage: "Profile Picture",
    uploadImage: "Upload Image",
    removeImage: "Remove Image",
  },
  fi: {
    setupTitle: "Tervetuloa CV Makeriin",
    languageSelector: "Valitse kieli",
    templateSelector: "Valitse malli",
    minimalist: "Minimalistinen",
    cozy: "Leikkisä & Pinkki",
    privacyTitle: "Yksityisyys ensin",
    privacyText: "Henkilötietosi eivät koskaan poistu selaimestasi. Emme tallenna tietojasi millekään palvelimelle.",
    startBuilding: "Aloita rakentaminen",
    personalInfo: "Henkilötiedot",
    fullName: "Koko nimi",
    jobTitle: "Ammattinimike",
    email: "Sähköposti",
    phone: "Puhelinnumero",
    location: "Sijainti",
    summary: "Ammatillinen tiivistelmä",
    experience: "Työkokemus",
    addExperience: "Lisää työkokemus",
    company: "Yritys",
    role: "Rooli",
    startDate: "Aloituspäivä",
    endDate: "Lopetuspäivä",
    description: "Kuvaus",
    education: "Koulutus",
    addEducation: "Lisää koulutus",
    school: "Koulu / Yliopisto",
    degree: "Tutkinto",
    graduationYear: "Valmistumisvuosi",
    skills: "Taidot",
    skillsPlaceholder: "esim. JavaScript, React, UI/UX-suunnittelu, Figma",
    remove: "Poista",
    noExperience: "Ei vielä lisättyä työkokemusta.",
    noEducation: "Ei vielä lisättyä koulutusta.",
    exportPdf: "Lataa CV PDF-tiedostona",
    backToSetup: "Takaisin asetuksiin",
    profileImage: "Profiilikuva",
    uploadImage: "Lataa kuva",
    removeImage: "Poista kuva",
  },
  fr: {
    setupTitle: "Bienvenue sur CV Maker",
    languageSelector: "Choisir la langue",
    templateSelector: "Choisir le modèle",
    minimalist: "Minimaliste",
    cozy: "Ludique & Rose",
    privacyTitle: "La confidentialité d'abord",
    privacyText: "Vos données personnelles ne quittent jamais votre navigateur. Nous n'enregistrons aucune information sur nos serveurs.",
    startBuilding: "Commencer la création",
    personalInfo: "Informations personnelles",
    fullName: "Nom complet",
    jobTitle: "Titre du poste",
    email: "E-mail",
    phone: "Téléphone",
    location: "Emplacement",
    summary: "Résumé professionnel",
    experience: "Expérience",
    addExperience: "Ajouter une expérience",
    company: "Entreprise",
    role: "Rôle",
    startDate: "Date de début",
    endDate: "Date de fin",
    description: "Description",
    education: "Éducation",
    addEducation: "Ajouter une formation",
    school: "École / Université",
    degree: "Diplôme",
    graduationYear: "Année d'obtention",
    skills: "Compétences",
    skillsPlaceholder: "ex. JavaScript, React, Design UI/UX, Figma",
    remove: "Retirer",
    noExperience: "Aucune expérience ajoutée pour le moment.",
    noEducation: "Aucune formation ajoutée pour le moment.",
    exportPdf: "Télécharger le CV en PDF",
    backToSetup: "Retour aux paramètres",
    profileImage: "Photo de profil",
    uploadImage: "Télécharger une image",
    removeImage: "Supprimer l'image",
  },
  es: {
    setupTitle: "Bienvenido a CV Maker",
    languageSelector: "Seleccionar idioma",
    templateSelector: "Elegir plantilla",
    minimalist: "Minimalista",
    cozy: "Juguetón y Rosa",
    privacyTitle: "Privacidad Primero",
    privacyText: "Tus datos personales nunca salen de tu navegador. No guardamos tu información en ningún servidor.",
    startBuilding: "Empezar a construir",
    personalInfo: "Información Personal",
    fullName: "Nombre completo",
    jobTitle: "Título profesional",
    email: "Correo electrónico",
    phone: "Teléfono",
    location: "Ubicación",
    summary: "Resumen Profesional",
    experience: "Experiencia",
    addExperience: "Añadir Experiencia",
    company: "Empresa",
    role: "Rol",
    startDate: "Fecha de inicio",
    endDate: "Fecha de fin",
    description: "Descripción",
    education: "Educación",
    addEducation: "Añadir Educación",
    school: "Escuela / Universidad",
    degree: "Título",
    graduationYear: "Año de graduación",
    skills: "Habilidades",
    skillsPlaceholder: "ej. JavaScript, React, Diseño UI/UX, Figma",
    remove: "Eliminar",
    noExperience: "Aún no se ha añadido experiencia.",
    noEducation: "Aún no se ha añadido educación.",
    exportPdf: "Descargar CV en PDF",
    backToSetup: "Volver a la configuración",
    profileImage: "Foto de perfil",
    uploadImage: "Subir imagen",
    removeImage: "Eliminar imagen",
  },
  de: {
    setupTitle: "Willkommen bei CV Maker",
    languageSelector: "Sprache auswählen",
    templateSelector: "Vorlage wählen",
    minimalist: "Minimalistisch",
    cozy: "Verspielt & Pink",
    privacyTitle: "Privatsphäre zuerst",
    privacyText: "Ihre persönlichen Daten verlassen niemals Ihren Browser. Wir speichern Ihre Informationen auf keinem Server.",
    startBuilding: "Erstellung beginnen",
    personalInfo: "Persönliche Daten",
    fullName: "Vollständiger Name",
    jobTitle: "Berufsbezeichnung",
    email: "E-Mail",
    phone: "Telefon",
    location: "Standort",
    summary: "Berufliche Zusammenfassung",
    experience: "Erfahrung",
    addExperience: "Erfahrung hinzufügen",
    company: "Unternehmen",
    role: "Rolle",
    startDate: "Startdatum",
    endDate: "Enddatum",
    description: "Beschreibung",
    education: "Bildung",
    addEducation: "Bildung hinzufügen",
    school: "Schule / Universität",
    degree: "Abschluss",
    graduationYear: "Abschlussjahr",
    skills: "Fähigkeiten",
    skillsPlaceholder: "z.B. JavaScript, React, UI/UX Design, Figma",
    remove: "Entfernen",
    noExperience: "Noch keine Erfahrung hinzugefügt.",
    noEducation: "Noch keine Bildung hinzugefügt.",
    exportPdf: "CV als PDF herunterladen",
    backToSetup: "Zurück zu den Einstellungen",
    profileImage: "Profilbild",
    uploadImage: "Bild hochladen",
    removeImage: "Bild entfernen",
  }
};

export default function CVBuilder() {
  const [step, setStep] = useState<Step>("setup");
  const [language, setLanguage] = useState<Language>("en");
  const [template, setTemplate] = useState<TemplateType>("minimalist");
  const [cvData, setCvData] = useState<CVData>(localizedInitialData.en);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const t = translations[language];

  const handleStartBuilding = () => {
    // Populate the CV state with the correct dummy data for the chosen language
    setCvData(localizedInitialData[language]);
    setStep("editor");
  };

  const downloadPDF = async () => {
    const element = document.getElementById("cv-preview-content");
    if (!element) return;

    setIsGeneratingPDF(true);

    try {
      // Dynamically import to avoid SSR issues
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      // Create a clone of the element to modify specifically for PDF generation
      const clone = element.cloneNode(true) as HTMLElement;
      
      // Force all elements in the clone to use inline styles with standard hex colors
      // This completely bypasses Tailwind's CSS variables which cause the "lab" color error
      const applyInlineStyles = (node: HTMLElement) => {
        const computedStyle = window.getComputedStyle(node);
        
        // Only apply if it's an element node
        if (node.nodeType === 1) {
          // Map of class names to their hex equivalents used in our template
          const colorMap: Record<string, string> = {
            'bg-[#ffffff]': '#ffffff',
            'bg-[#f1f5f9]': '#f1f5f9',
            'bg-[#f8fafc]': '#f8fafc',
            'bg-[#94a3b8]': '#94a3b8',
            'bg-[#fffdfa]': '#fffdfa',
            'bg-[#fdf2f8]': '#fdf2f8',
            'bg-[#fce7f3]': '#fce7f3',
            'bg-[#fbcfe8]': '#fbcfe8',
            'bg-[#db2777]': '#db2777',
            'bg-[#f3e8ff]': '#f3e8ff',
            'bg-[#e0e7ff]': '#e0e7ff',
            'bg-[#f9a8d4]': '#f9a8d4',
            'text-[#111827]': '#111827',
            'text-[#1e293b]': '#1e293b',
            'text-[#374151]': '#374151',
            'text-[#475569]': '#475569',
            'text-[#4b5563]': '#4b5563',
            'text-[#64748b]': '#64748b',
            'text-[#94a3b8]': '#94a3b8',
            'text-[#831843]': '#831843',
            'text-[#be185d]': '#be185d',
            'text-[#9d174d]': '#9d174d',
            'text-[#701a75]': '#701a75',
            'text-[#db2777]': '#db2777',
            'text-[#86198f]': '#86198f',
            'text-[#5b21b6]': '#5b21b6',
            'border-[#1f2937]': '#1f2937',
            'border-[#d1d5db]': '#d1d5db',
            'border-[#e2e8f0]': '#e2e8f0',
            'border-[#f1f5f9]': '#f1f5f9',
            'border-[#ffffff]': '#ffffff',
            'border-[#fbcfe8]': '#fbcfe8',
            'border-[#fce7f3]': '#fce7f3',
            'border-[#fffdfa]': '#fffdfa',
            'border-[#e9d5ff]': '#e9d5ff',
            'border-[#c4b5fd]': '#c4b5fd',
          };

          // Apply background colors
          for (const [cls, hex] of Object.entries(colorMap)) {
            if (cls.startsWith('bg-') && node.classList.contains(cls)) {
              node.style.backgroundColor = hex;
            }
            if (cls.startsWith('text-') && node.classList.contains(cls)) {
              node.style.color = hex;
            }
            if (cls.startsWith('border-') && node.classList.contains(cls)) {
              node.style.borderColor = hex;
            }
          }
        }
        
        // Recursively apply to children
        Array.from(node.children).forEach((child) => applyInlineStyles(child as HTMLElement));
      };

      applyInlineStyles(clone);
      
      // Temporarily append clone to document to render it
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      document.body.appendChild(clone);

      const canvas = await html2canvas(clone, { 
        scale: 2, // High quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });
      
      // Remove clone after rendering
      document.body.removeChild(clone);
      
      const imgData = canvas.toDataURL("image/png");
      
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add subsequent pages if content is longer than one A4 page
      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`CV_${cvData.personalInfo.fullName.replace(/\s+/g, "_") || "Resume"}.pdf`);
    } catch (error) {
      console.error("Error generating PDF", error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCvData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [name]: value },
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCvData((prev) => ({
          ...prev,
          personalInfo: { ...prev.personalInfo, profileImage: reader.result as string },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setCvData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, profileImage: null },
    }));
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCvData((prev) => ({ ...prev, summary: e.target.value }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCvData((prev) => ({ ...prev, skills: e.target.value }));
  };

  const handleExperienceChange = (id: string, field: keyof Experience, value: string) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const addExperience = () => {
    setCvData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { id: crypto.randomUUID(), company: "", role: "", startDate: "", endDate: "", description: "" },
      ],
    }));
  };

  const removeExperience = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  const handleEducationChange = (id: string, field: keyof Education, value: string) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const addEducation = () => {
    setCvData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { id: crypto.randomUUID(), school: "", degree: "", graduationYear: "" },
      ],
    }));
  };

  const removeEducation = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  if (step === "setup") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
        <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 sm:p-12">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.setupTitle}</h1>
              <p className="text-lg text-gray-500">Configure your resume builder preferences</p>
            </div>

            <div className="space-y-10">
              {/* Language Selector */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="w-5 h-5 text-gray-700" />
                  <h2 className="text-xl font-semibold text-gray-800">{t.languageSelector}</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {[
                    { code: "en", label: "English" },
                    { code: "fi", label: "Suomi" },
                    { code: "fr", label: "Français" },
                    { code: "es", label: "Español" },
                    { code: "de", label: "Deutsch" },
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code as Language)}
                      className={`py-3 px-4 rounded-xl border-2 transition-all font-medium ${
                        language === lang.code
                          ? "border-black bg-black text-white"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </section>

              {/* Template Selector */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <LayoutTemplate className="w-5 h-5 text-gray-700" />
                  <h2 className="text-xl font-semibold text-gray-800">{t.templateSelector}</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setTemplate("minimalist")}
                    className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-4 ${
                      template === "minimalist"
                        ? "border-black bg-gray-50 ring-2 ring-black ring-opacity-10"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="w-24 h-32 bg-white shadow-sm border border-gray-200 p-2 flex flex-col gap-1">
                      <div className="w-full h-4 bg-gray-200 rounded-sm"></div>
                      <div className="w-2/3 h-2 bg-gray-100 rounded-sm"></div>
                      <div className="w-full h-16 bg-gray-50 rounded-sm mt-2"></div>
                    </div>
                    <span className="font-semibold text-gray-900">{t.minimalist}</span>
                  </button>

                  <button
                    onClick={() => setTemplate("cozy")}
                    className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-4 ${
                      template === "cozy"
                        ? "border-black bg-gray-50 ring-2 ring-black ring-opacity-10"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="w-24 h-32 bg-[#fffdfa] shadow-sm border border-gray-200 flex flex-col overflow-hidden">
                      <div className="w-full h-8 bg-[#fdf2f8] border-b-2 border-[#fbcfe8]"></div>
                      <div className="flex flex-1">
                        <div className="w-1/3 h-full bg-[#fdf2f8] border-r border-[#fce7f3]"></div>
                        <div className="w-2/3 h-full bg-[#fffdfa] p-1 flex flex-col gap-1">
                          <div className="w-full h-2 bg-[#fbcfe8] rounded-sm"></div>
                          <div className="w-full h-2 bg-[#fce7f3] rounded-sm"></div>
                        </div>
                      </div>
                    </div>
                    <span className="font-semibold text-gray-900">{t.cozy}</span>
                  </button>
                </div>
              </section>

              {/* Privacy Notice */}
              <section className="bg-green-50 p-6 rounded-xl border border-green-100 flex gap-4 items-start">
                <ShieldCheck className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">{t.privacyTitle}</h3>
                  <p className="text-green-800 text-sm leading-relaxed">{t.privacyText}</p>
                </div>
              </section>

              {/* Start Button */}
              <div className="pt-4 flex justify-center">
                <button
                  onClick={handleStartBuilding}
                  className="bg-black text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {t.startBuilding}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Left Column: Form */}
      <div className="w-full lg:w-1/2 lg:h-screen overflow-y-auto border-r border-gray-200 bg-white p-6 lg:p-10">
        <div className="max-w-2xl mx-auto space-y-10">
          <div className="flex items-center justify-between mb-2">
            <button 
              onClick={() => setStep("setup")}
              className="text-gray-500 hover:text-black flex items-center gap-1 text-sm font-medium transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              {t.backToSetup}
            </button>
            <button 
              onClick={downloadPDF}
              disabled={isGeneratingPDF}
              className={`bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 ${isGeneratingPDF ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <Download className="w-4 h-4" />
              {isGeneratingPDF ? "..." : t.exportPdf}
            </button>
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">CV Builder</h1>
          </div>

          {/* Personal Information */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">{t.personalInfo}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.profileImage}</label>
                <div className="flex items-center gap-4">
                  {cvData.personalInfo.profileImage ? (
                    <div className="relative w-24 h-24">
                      <img src={cvData.personalInfo.profileImage} alt="Profile" className="w-full h-full object-cover rounded-lg border border-gray-300" />
                      <button 
                        onClick={removeImage} 
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-sm" 
                        aria-label={t.removeImage}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full sm:w-1/2 h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Plus className="w-5 h-5 text-gray-400 mb-1" />
                        <p className="text-sm text-gray-500 font-medium">{t.uploadImage}</p>
                      </div>
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </label>
                  )}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.fullName}</label>
                <input
                  type="text"
                  name="fullName"
                  value={cvData.personalInfo.fullName}
                  onChange={handlePersonalInfoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.jobTitle}</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={cvData.personalInfo.jobTitle}
                  onChange={handlePersonalInfoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.email}</label>
                <input
                  type="email"
                  name="email"
                  value={cvData.personalInfo.email}
                  onChange={handlePersonalInfoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.phone}</label>
                <input
                  type="tel"
                  name="phone"
                  value={cvData.personalInfo.phone}
                  onChange={handlePersonalInfoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.location}</label>
                <input
                  type="text"
                  name="location"
                  value={cvData.personalInfo.location}
                  onChange={handlePersonalInfoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors"
                />
              </div>
            </div>
          </section>

          {/* Professional Summary */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">{t.summary}</h2>
            <div>
              <textarea
                value={cvData.summary}
                onChange={handleSummaryChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors resize-none"
              />
            </div>
          </section>

          {/* Experience */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h2 className="text-xl font-semibold text-gray-800">{t.experience}</h2>
              <button
                onClick={addExperience}
                className="text-sm font-medium text-black hover:text-gray-600 transition-colors flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                {t.addExperience}
              </button>
            </div>
            
            <div className="space-y-6">
              {cvData.experience.map((exp) => (
                <div key={exp.id} className="p-5 bg-gray-50 border border-gray-200 rounded-xl relative group">
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                    aria-label={t.remove}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.company}</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(exp.id, "company", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors bg-white"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.role}</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => handleExperienceChange(exp.id, "role", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.startDate}</label>
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => handleExperienceChange(exp.id, "startDate", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.endDate}</label>
                      <input
                        type="text"
                        value={exp.endDate}
                        onChange={(e) => handleExperienceChange(exp.id, "endDate", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors bg-white"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.description}</label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => handleExperienceChange(exp.id, "description", e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors bg-white resize-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
              {cvData.experience.length === 0 && (
                <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-xl">
                  {t.noExperience}
                </div>
              )}
            </div>
          </section>

          {/* Education */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h2 className="text-xl font-semibold text-gray-800">{t.education}</h2>
              <button
                onClick={addEducation}
                className="text-sm font-medium text-black hover:text-gray-600 transition-colors flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                {t.addEducation}
              </button>
            </div>
            
            <div className="space-y-6">
              {cvData.education.map((edu) => (
                <div key={edu.id} className="p-5 bg-gray-50 border border-gray-200 rounded-xl relative group">
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                    aria-label={t.remove}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.school}</label>
                      <input
                        type="text"
                        value={edu.school}
                        onChange={(e) => handleEducationChange(edu.id, "school", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.degree}</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(edu.id, "degree", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.graduationYear}</label>
                      <input
                        type="text"
                        value={edu.graduationYear}
                        onChange={(e) => handleEducationChange(edu.id, "graduationYear", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors bg-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
              {cvData.education.length === 0 && (
                <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-xl">
                  {t.noEducation}
                </div>
              )}
            </div>
          </section>

          {/* Skills */}
          <section className="space-y-4 pb-10">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">{t.skills}</h2>
            <div>
              <textarea
                value={cvData.skills}
                onChange={handleSkillsChange}
                rows={3}
                placeholder={t.skillsPlaceholder}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors resize-none"
              />
            </div>
          </section>
        </div>
      </div>

      {/* Right Column: Live Preview */}
      <div className="w-full lg:w-1/2 lg:h-screen overflow-y-auto bg-gray-100 p-6 lg:p-10 flex justify-center items-start">
        {/* A4 Paper Container - This is what gets exported to PDF */}
        <div 
          id="cv-preview-content"
          className={`bg-[#ffffff] w-full max-w-[210mm] min-h-[297mm] shadow-xl ${template === 'cozy' ? 'font-sans' : 'font-serif'}`}
          style={{ backgroundColor: '#ffffff', color: '#111827' }}
        >
          
          {template === 'minimalist' ? (
            // Minimalist Template (Current)
            <div className="p-10 sm:p-14">
              {/* Header */}
              <header className="border-b-2 border-[#1f2937] pb-6 mb-8 flex justify-between items-start" style={{ borderColor: '#1f2937' }}>
                <div className="text-center sm:text-left flex-1">
                  <h1 className="text-4xl sm:text-5xl font-bold uppercase tracking-widest text-[#111827] mb-2" style={{ color: '#111827' }}>
                    {cvData.personalInfo.fullName || t.fullName}
                  </h1>
                  <h2 className="text-xl sm:text-2xl text-[#4b5563] tracking-wide mb-4" style={{ color: '#4b5563' }}>
                    {cvData.personalInfo.jobTitle || t.jobTitle}
                  </h2>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 text-sm text-[#4b5563]" style={{ color: '#4b5563' }}>
                    {cvData.personalInfo.email && (
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5" />
                        {cvData.personalInfo.email}
                      </span>
                    )}
                    {cvData.personalInfo.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" />
                        {cvData.personalInfo.phone}
                      </span>
                    )}
                    {cvData.personalInfo.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {cvData.personalInfo.location}
                      </span>
                    )}
                  </div>
                </div>
                {cvData.personalInfo.profileImage && (
                  <div className="ml-6 shrink-0">
                    <img 
                      src={cvData.personalInfo.profileImage} 
                      alt="Profile" 
                      className="w-28 h-28 object-cover border-2 border-[#1f2937]" 
                      style={{ borderColor: '#1f2937' }} 
                    />
                  </div>
                )}
              </header>

              {/* Summary */}
              {cvData.summary && (
                <section className="mb-8">
                  <p className="text-base leading-relaxed text-[#374151]" style={{ color: '#374151' }}>
                    {cvData.summary}
                  </p>
                </section>
              )}

              {/* Experience */}
              {cvData.experience.length > 0 && (
                <section className="mb-8">
                  <h3 className="text-lg font-bold uppercase tracking-widest text-[#111827] border-b border-[#d1d5db] pb-2 mb-4" style={{ color: '#111827', borderColor: '#d1d5db' }}>
                    {t.experience}
                  </h3>
                  <div className="space-y-6">
                    {cvData.experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                          <h4 className="font-bold text-[#111827] text-lg" style={{ color: '#111827' }}>{exp.role}</h4>
                          <span className="text-sm text-[#4b5563] font-medium mt-1 sm:mt-0" style={{ color: '#4b5563' }}>
                            {exp.startDate} {exp.startDate && exp.endDate && "—"} {exp.endDate}
                          </span>
                        </div>
                        <div className="text-base font-semibold text-[#374151] mb-2" style={{ color: '#374151' }}>
                          {exp.company}
                        </div>
                        <p className="text-sm text-[#374151] whitespace-pre-wrap leading-relaxed" style={{ color: '#374151' }}>
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Education */}
              {cvData.education.length > 0 && (
                <section className="mb-8">
                  <h3 className="text-lg font-bold uppercase tracking-widest text-[#111827] border-b border-[#d1d5db] pb-2 mb-4" style={{ color: '#111827', borderColor: '#d1d5db' }}>
                    {t.education}
                  </h3>
                  <div className="space-y-4">
                    {cvData.education.map((edu) => (
                      <div key={edu.id}>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                          <h4 className="font-bold text-[#111827] text-lg" style={{ color: '#111827' }}>{edu.degree}</h4>
                          <span className="text-sm text-[#4b5563] font-medium mt-1 sm:mt-0" style={{ color: '#4b5563' }}>
                            {edu.graduationYear}
                          </span>
                        </div>
                        <div className="text-base text-[#374151]" style={{ color: '#374151' }}>
                          {edu.school}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Skills */}
              {cvData.skills && (
                <section>
                  <h3 className="text-lg font-bold uppercase tracking-widest text-[#111827] border-b border-[#d1d5db] pb-2 mb-4" style={{ color: '#111827', borderColor: '#d1d5db' }}>
                    {t.skills}
                  </h3>
                  <p className="text-base text-[#374151] leading-relaxed" style={{ color: '#374151' }}>
                    {cvData.skills.split(',').map(s => s.trim()).filter(Boolean).join(' • ')}
                  </p>
                </section>
              )}
            </div>
          ) : (
            // Cozy / Playful Template
            <div className="flex flex-col h-full min-h-[297mm] bg-[#ffffff]" style={{ backgroundColor: '#ffffff' }}>
              {/* Header */}
              <div className="bg-[#fdf2f8] px-10 py-12 sm:px-14 border-b-[6px] border-[#fbcfe8] flex justify-between items-center" style={{ backgroundColor: '#fdf2f8', borderColor: '#fbcfe8' }}>
                <div className="flex-1">
                  <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111827] mb-3 tracking-tight" style={{ color: '#111827' }}>
                    {cvData.personalInfo.fullName || t.fullName}
                  </h1>
                  <h2 className="text-xl sm:text-2xl text-[#4b5563] font-semibold" style={{ color: '#4b5563' }}>
                    {cvData.personalInfo.jobTitle || t.jobTitle}
                  </h2>
                </div>
                {cvData.personalInfo.profileImage && (
                  <div className="ml-6 shrink-0">
                    <img 
                      src={cvData.personalInfo.profileImage} 
                      alt="Profile" 
                      className="w-28 h-28 object-cover rounded-2xl border-4 border-[#ffffff] shadow-sm" 
                      style={{ borderColor: '#ffffff' }} 
                    />
                  </div>
                )}
              </div>
              
              {/* Two Column Layout */}
              <div className="flex flex-1 flex-col sm:flex-row">
                {/* Sidebar */}
                <div className="w-full sm:w-1/3 bg-[#fdf2f8] p-10 sm:px-10 sm:py-8 border-r-2 border-[#fce7f3]" style={{ backgroundColor: '#fdf2f8', borderColor: '#fce7f3' }}>
                  <div className="space-y-10">
                    {/* Contact */}
                    <div className="bg-[#ffffff] p-6 rounded-2xl shadow-sm border border-[#fbcfe8]" style={{ backgroundColor: '#ffffff', borderColor: '#fbcfe8' }}>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-[#111827] mb-5" style={{ color: '#111827' }}>{t.personalInfo}</h3>
                      <div className="space-y-4 text-sm text-[#374151]" style={{ color: '#374151' }}>
                        {cvData.personalInfo.email && (
                          <div className="flex items-center gap-3">
                            <div className="bg-[#fdf2f8] p-2 rounded-full" style={{ backgroundColor: '#fdf2f8' }}>
                              <Mail className="w-4 h-4 text-[#111827]" style={{ color: '#111827' }} />
                            </div>
                            <span className="break-all font-medium">{cvData.personalInfo.email}</span>
                          </div>
                        )}
                        {cvData.personalInfo.phone && (
                          <div className="flex items-center gap-3">
                            <div className="bg-[#fdf2f8] p-2 rounded-full" style={{ backgroundColor: '#fdf2f8' }}>
                              <Phone className="w-4 h-4 text-[#111827]" style={{ color: '#111827' }} />
                            </div>
                            <span className="font-medium">{cvData.personalInfo.phone}</span>
                          </div>
                        )}
                        {cvData.personalInfo.location && (
                          <div className="flex items-center gap-3">
                            <div className="bg-[#fdf2f8] p-2 rounded-full" style={{ backgroundColor: '#fdf2f8' }}>
                              <MapPin className="w-4 h-4 text-[#111827]" style={{ color: '#111827' }} />
                            </div>
                            <span className="font-medium">{cvData.personalInfo.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Skills */}
                    {cvData.skills && (
                      <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-[#111827] mb-4 pl-2" style={{ color: '#111827' }}>{t.skills}</h3>
                        <div className="flex flex-wrap gap-2">
                          {cvData.skills.split(',').map(s => s.trim()).filter(Boolean).map((skill, i) => (
                            <span 
                              key={i} 
                              className="px-4 py-2 rounded-xl text-sm font-bold shadow-sm border bg-[#ffffff] text-[#111827] border-[#fbcfe8]" 
                              style={{ backgroundColor: '#ffffff', color: '#111827', borderColor: '#fbcfe8' }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Main Content */}
                <div className="w-full sm:w-2/3 p-10 sm:p-10 sm:py-8">
                  {/* Summary */}
                  {cvData.summary && (
                    <section className="mb-10">
                      <h3 className="text-xl font-bold text-[#111827] mb-4 flex items-center gap-2" style={{ color: '#111827' }}>
                        <span className="bg-[#fbcfe8] w-8 h-8 rounded-full flex items-center justify-center text-[#111827] text-sm" style={{ backgroundColor: '#fbcfe8', color: '#111827' }}>✿</span>
                        {t.summary}
                      </h3>
                      <div className="bg-[#ffffff] p-6 rounded-2xl shadow-sm border border-[#fce7f3]" style={{ backgroundColor: '#ffffff', borderColor: '#fce7f3' }}>
                        <p className="text-base leading-relaxed text-[#374151] font-medium" style={{ color: '#374151' }}>
                          {cvData.summary}
                        </p>
                      </div>
                    </section>
                  )}

                  {/* Experience */}
                  {cvData.experience.length > 0 && (
                    <section className="mb-10">
                      <h3 className="text-xl font-bold text-[#111827] mb-6 flex items-center gap-2" style={{ color: '#111827' }}>
                        <span className="bg-[#fbcfe8] w-8 h-8 rounded-full flex items-center justify-center text-[#111827] text-sm" style={{ backgroundColor: '#fbcfe8', color: '#111827' }}>★</span>
                        {t.experience}
                      </h3>
                      <div className="space-y-6">
                        {cvData.experience.map((exp) => (
                          <div key={exp.id} className="relative pl-6 border-l-[3px] border-[#fbcfe8]" style={{ borderColor: '#fbcfe8' }}>
                            <div className="absolute w-4 h-4 bg-[#f9a8d4] rounded-full -left-[10px] top-1.5 border-4 border-[#ffffff]" style={{ backgroundColor: '#f9a8d4', borderColor: '#ffffff' }}></div>
                            <h4 className="font-bold text-[#111827] text-lg" style={{ color: '#111827' }}>{exp.role}</h4>
                            <div className="text-base font-bold text-[#4b5563] mb-1" style={{ color: '#4b5563' }}>{exp.company}</div>
                            <div className="inline-block bg-[#fdf2f8] text-[#111827] text-xs px-3 py-1 rounded-full mb-3 font-bold" style={{ backgroundColor: '#fdf2f8', color: '#111827' }}>
                              {exp.startDate} {exp.startDate && exp.endDate && "—"} {exp.endDate}
                            </div>
                            <p className="text-sm text-[#374151] whitespace-pre-wrap leading-relaxed font-medium" style={{ color: '#374151' }}>
                              {exp.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Education */}
                  {cvData.education.length > 0 && (
                    <section className="mb-8">
                      <h3 className="text-xl font-bold text-[#111827] mb-6 flex items-center gap-2" style={{ color: '#111827' }}>
                        <span className="bg-[#fbcfe8] w-8 h-8 rounded-full flex items-center justify-center text-[#111827] text-sm" style={{ backgroundColor: '#fbcfe8', color: '#111827' }}>♥</span>
                        {t.education}
                      </h3>
                      <div className="space-y-6">
                        {cvData.education.map((edu) => (
                          <div key={edu.id} className="relative pl-6 border-l-[3px] border-[#fbcfe8]" style={{ borderColor: '#fbcfe8' }}>
                            <div className="absolute w-4 h-4 bg-[#f9a8d4] rounded-full -left-[10px] top-1.5 border-4 border-[#ffffff]" style={{ backgroundColor: '#f9a8d4', borderColor: '#ffffff' }}></div>
                            <h4 className="font-bold text-[#111827] text-lg" style={{ color: '#111827' }}>{edu.degree}</h4>
                            <div className="text-base font-bold text-[#4b5563] mb-1" style={{ color: '#4b5563' }}>{edu.school}</div>
                            <div className="inline-block bg-[#fdf2f8] text-[#111827] text-xs px-3 py-1 rounded-full font-bold" style={{ backgroundColor: '#fdf2f8', color: '#111827' }}>
                              {edu.graduationYear}
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

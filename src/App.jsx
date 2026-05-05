import { useMemo, useState } from "react";

const sectors = [
  {
    key: "zona-franca",
    title: "Zona Franca",
    badge: "PRO",
    description: "Régimen especial, exportación, ventas locales y reportes sectoriales.",
    tags: ["RZF-01", "IT-1", "606/607", "IR-17", "TSS", "IR-2"]
  },
  {
    key: "empresa",
    title: "Sociedad / Empresa",
    badge: "PRO",
    description: "Declaraciones juradas, ISR, ITBIS, e-NCF, retenciones y contabilidad.",
    tags: ["IR-2", "IT-1", "IR-17", "606/607", "e-NCF"]
  },
  {
    key: "persona-fisica",
    title: "Persona Física",
    badge: "FREE",
    description: "IR-1, RST, ingresos, gastos, retenciones y obligaciones individuales.",
    tags: ["IR-1", "RST", "ISR", "NCF"]
  },
  {
    key: "nomina",
    title: "Nómina y TSS",
    badge: "PRO",
    description: "TSS, IR-3, IR-4, IR-13, novedades, retenciones y seguridad social.",
    tags: ["TSS", "IR-3", "IR-4", "IR-13"]
  }
];

const modules = [
  {
    key: "ir-3",
    title: "IR-3",
    type: "Retenciones",
    section: "Nómina",
    definition: "Declaración mensual usada para reportar y pagar las retenciones de ISR realizadas a empleados asalariados.",
    checklist: ["Nómina cerrada", "ISR retenido validado", "Cruce con TSS", "Declaración enviada"],
    errors: ["No actualizar novedades", "Usar base salarial incorrecta", "No conciliar nómina vs TSS"]
  },
  {
    key: "it-1",
    title: "IT-1",
    type: "ITBIS",
    section: "DGII",
    definition: "Declaración mensual para reportar ITBIS facturado, ITBIS adelantado, operaciones gravadas, exentas y saldo a pagar o a favor.",
    checklist: ["Ventas conciliadas", "NCF revisados", "Compras válidas", "Notas de crédito aplicadas"],
    errors: ["Declarar ventas diferentes", "Tomar ITBIS sin soporte", "No aplicar notas de crédito"]
  },
  {
    key: "ir-13",
    title: "IR-13",
    type: "Nómina",
    section: "Nómina",
    definition: "Declaración anual que valida retenciones a asalariados, comparando ISR calculado contra ISR retenido durante el año calendario.",
    checklist: ["Acumulado anual validado", "ISR calculado vs retenido", "Empleados con doble empleador revisados"],
    errors: ["Diferencias por períodos", "No rectificar IR-3/TSS", "No validar agente principal"]
  },
  {
    key: "ir-17",
    title: "IR-17",
    type: "Retenciones",
    section: "DGII",
    definition: "Declaración de otras retenciones, incluyendo retenciones a proveedores, profesionales, alquileres u otros pagos sujetos a retención.",
    checklist: ["Retenciones por comprobante", "Beneficiarios validados", "Pago dentro del plazo"],
    errors: ["Aplicar porcentaje incorrecto", "No conciliar auxiliares", "Declarar fuera de plazo"]
  },
  {
    key: "ir-2",
    title: "IR-2",
    type: "Renta",
    section: "DGII",
    definition: "Declaración jurada anual de sociedades para declarar resultados fiscales, ISR, anticipos, retenciones e impuesto sobre activos cuando aplique.",
    checklist: ["Estados financieros cerrados", "Conciliación fiscal", "Anticipos y retenciones", "Activos revisados"],
    errors: ["No conciliar ingresos", "Gastos sin soporte", "Confundir impuesto liquidado con pago final"]
  },
  {
    key: "ir-1",
    title: "IR-1",
    type: "Renta",
    section: "Persona Física",
    definition: "Declaración jurada de personas físicas para declarar ingresos, gastos admitidos, retenciones, anticipos e ISR correspondiente.",
    checklist: ["Ingresos identificados", "Gastos soportados", "Retenciones validadas"],
    errors: ["Omitir ingresos", "Tomar gastos no admitidos", "No aplicar retenciones"]
  },
  {
    key: "tss",
    title: "TSS",
    type: "Seguridad Social",
    section: "Nómina",
    definition: "Sistema de recaudo de aportes de seguridad social, incluyendo AFP, ARS, SRL, INFOTEP y novedades de empleados.",
    checklist: ["Altas y bajas", "Cambios salariales", "Factura conciliada", "Pago realizado"],
    errors: ["No reportar bajas", "Diferencias con nómina", "Salario cotizable incorrecto"]
  },
  {
    key: "606-607",
    title: "606/607",
    type: "Reportes",
    section: "DGII",
    definition: "Reportes de compras y ventas usados para sustentar operaciones fiscales y cruzar información con declaraciones mensuales.",
    checklist: ["Comprobantes válidos", "NCF conciliados", "Totales cruzados con IT-1"],
    errors: ["NCF inválidos", "Diferencias con contabilidad", "Duplicidad de registros"]
  }
];

const forms = ["IR-1", "IR-2", "IR-3", "IR-4", "IR-13", "IR-17", "IT-1", "RST", "RZF-01", "606", "607", "608"];

const cycleItems = [
  "Registrar operaciones",
  "Emitir o recibir NCF/e-NCF",
  "Conciliar contabilidad vs reportes",
  "Preparar declaraciones",
  "Validar saldos, anticipos y retenciones",
  "Enviar y guardar acuse"
];

const dictionary = {
  impuesto: "Un impuesto es una obligación tributaria exigida por el Estado para financiar el gasto público. Puede ser directo, como el ISR, o indirecto, como el ITBIS.",
  itbis: "El ITBIS grava la transferencia de bienes industrializados, importación de bienes y prestación de servicios gravados.",
  isr: "El ISR grava las rentas, beneficios o utilidades obtenidas por personas físicas y jurídicas.",
  activo: "Un activo es un recurso controlado por una entidad del cual se esperan beneficios económicos futuros.",
  pasivo: "Un pasivo es una obligación presente que implicará una salida futura de recursos.",
  liquidez: "La liquidez mide la capacidad de una empresa para cumplir obligaciones de corto plazo.",
  nomina: "La nómina calcula salarios, deducciones, aportes, retenciones y pago neto de empleados.",
  retencion: "Una retención es un monto descontado para ser declarado y pagado a la administración tributaria."
};

function normalize(text = "") {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim();
}

function localAnswer(question) {
  const q = normalize(question);
  const module = modules.find((m) => q.includes(normalize(m.key)) || q.includes(normalize(m.title)));
  if (module) {
    return `${module.title} - ${module.type}\n\n${module.definition}\n\nChecklist:\n- ${module.checklist.join("\n- ")}\n\nErrores frecuentes:\n- ${module.errors.join("\n- ")}\n\nEsta respuesta es orientativa y no sustituye una consulta formal con la DGII, TSS o un asesor especializado.`;
  }
  const term = Object.keys(dictionary).find((key) => q.includes(normalize(key)));
  if (term) {
    return `${term.toUpperCase()}\n\n${dictionary[term]}\n\nEsta respuesta es orientativa y no sustituye una consulta formal con la DGII, TSS o un asesor especializado.`;
  }
  return null;
}

async function askAI(question) {
  try {
    const response = await fetch("/api/tax-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });
    if (!response.ok) throw new Error("AI request failed");
    const data = await response.json();
    return data.answer;
  } catch {
    return "No pude generar una respuesta con IA en este momento. Verifica la conexión del endpoint /api/tax-ai.";
  }
}

function Header({ isPro }) {
  return (
    <div className="rounded-b-[34px] bg-slate-950 px-7 pb-8 pt-8 text-white shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-2xl font-black text-slate-950">
          AT
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-black leading-tight">Asistente Tributario RD</h1>
          <p className="mt-1 text-sm text-slate-300">Chanel4428@hotmail.com · {isPro ? "PRO" : "FREE"}</p>
        </div>
        <span className="text-3xl">⭐</span>
      </div>

      <div className="mt-6 flex items-center rounded-3xl bg-slate-800 px-5 py-4 text-slate-300">
        <span className="mr-3 text-xl">🔎</span>
        <span>Ej: ¿Cómo rectifico un IR-3?</span>
      </div>
    </div>
  );
}

function Home({ sector, setSector, selectedModule, setSelectedModule }) {
  const activeSector = sectors.find((s) => s.key === sector) || sectors[0];

  return (
    <div className="space-y-7 px-5 py-6">
      <section className="rounded-[28px] bg-rose-50 p-6">
        <h2 className="text-2xl font-black text-slate-950">Tu guía tributaria diaria</h2>
        <p className="mt-6 text-xl leading-8 text-slate-500">Formularios, vencimientos, TSS, sectores y casos prácticos.</p>
      </section>

      <section>
        <h2 className="text-3xl font-black text-slate-950">Inicio</h2>

        <div className="mt-5 rounded-[28px] border bg-white p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-2xl font-black text-slate-950">Sector activo: {activeSector.title}</h3>
            <span className="rounded-full bg-emerald-100 px-4 py-2 font-bold text-emerald-700">{activeSector.badge}</span>
          </div>
          <p className="mt-5 text-lg leading-7 text-slate-500">{activeSector.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {activeSector.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-4 py-2 font-bold text-slate-600">{tag}</span>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {sectors.map((s) => (
            <button
              key={s.key}
              onClick={() => setSector(s.key)}
              className={"rounded-2xl px-4 py-4 text-left font-bold " + (sector === s.key ? "bg-slate-950 text-white" : "bg-white text-slate-700 border")}
            >
              {s.title}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-black text-slate-950">Módulos rápidos</h2>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {modules.slice(0, 6).map((m) => (
            <button
              key={m.key}
              onClick={() => setSelectedModule(m.key)}
              className={"min-h-28 rounded-3xl p-5 text-left " + (selectedModule === m.key ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-950")}
            >
              <strong className="text-xl">{m.title}</strong>
              <span className="block text-base opacity-80">{m.type}</span>
            </button>
          ))}
        </div>
      </section>

      <ModuleDetail selectedModule={selectedModule} />
    </div>
  );
}

function ModuleDetail({ selectedModule }) {
  const module = modules.find((m) => m.key === selectedModule) || modules[0];
  return (
    <section className="rounded-[28px] bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-950">{module.title}</h2>
          <p className="mt-1 text-lg font-semibold text-slate-600">{module.type}</p>
        </div>
        <span className="rounded-full bg-slate-100 px-4 py-2 font-bold text-slate-600">{module.section}</span>
      </div>
      <p className="mt-5 text-lg leading-8 text-slate-600">{module.definition}</p>

      <div className="mt-6 rounded-3xl bg-emerald-50 p-5">
        <h3 className="text-xl font-black text-emerald-950">Checklist Pro</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
          {module.checklist.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>

      <div className="mt-4 rounded-3xl bg-amber-50 p-5">
        <h3 className="text-xl font-black text-amber-950">Errores frecuentes</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
          {module.errors.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>
    </section>
  );
}

function Chat() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hola. Pregúntame sobre DGII, TSS, nómina, declaraciones, contabilidad o finanzas.", source: "Sistema" }
  ]);

  async function send() {
    if (!question.trim()) return;
    const q = question.trim();
    setMessages((prev) => [...prev, { role: "user", text: q }]);
    setQuestion("");
    setLoading(true);
    const local = localAnswer(q);
    const answer = local || await askAI(q);
    setMessages((prev) => [...prev, { role: "assistant", text: answer, source: local ? "Diccionario" : "IA" }]);
    setLoading(false);
  }

  return (
    <div className="px-5 py-6">
      <h2 className="text-3xl font-black text-slate-950">Chat</h2>
      <div className="mt-5 max-h-[520px] space-y-3 overflow-y-auto rounded-[28px] bg-white p-4">
        {messages.map((m, i) => (
          <div key={i} className={"whitespace-pre-line rounded-3xl p-4 text-base leading-7 " + (m.role === "user" ? "ml-auto bg-slate-950 text-white" : "mr-auto bg-slate-100 text-slate-800")}>
            {m.text}
            {m.role === "assistant" && <small className="mt-2 block text-xs text-slate-500">Fuente: {m.source}</small>}
          </div>
        ))}
        {loading && <p className="text-slate-500">Generando respuesta...</p>}
      </div>
      <div className="mt-4 flex gap-2">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ej.: ¿Qué es el ITBIS?"
          className="flex-1 rounded-3xl border px-5 py-4 outline-none"
        />
        <button onClick={send} className="rounded-3xl bg-slate-950 px-6 py-4 font-bold text-white">Enviar</button>
      </div>
    </div>
  );
}

function Forms() {
  return (
    <div className="px-5 py-6">
      <h2 className="text-3xl font-black text-slate-950">Forms</h2>
      <div className="mt-5 grid grid-cols-3 gap-4">
        {forms.map((f) => (
          <div key={f} className="rounded-3xl bg-white p-5 text-center text-xl font-black shadow-sm">{f}</div>
        ))}
      </div>
    </div>
  );
}

function Cycle() {
  return (
    <div className="px-5 py-6">
      <h2 className="text-3xl font-black text-slate-950">Ciclo fiscal</h2>
      <div className="mt-5 space-y-3">
        {cycleItems.map((item, i) => (
          <div key={item} className="rounded-3xl bg-white p-5 shadow-sm">
            <strong className="mr-3 rounded-full bg-slate-950 px-3 py-2 text-white">{i + 1}</strong>
            <span className="text-lg font-semibold text-slate-700">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function More() {
  const terms = Object.keys(dictionary);
  return (
    <div className="px-5 py-6">
      <h2 className="text-3xl font-black text-slate-950">Más</h2>
      <section className="mt-5 rounded-[28px] bg-white p-6 shadow-sm">
        <h3 className="text-2xl font-black">Diccionario</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {terms.map((t) => (
            <span key={t} className="rounded-full bg-slate-100 px-4 py-2 font-semibold text-slate-600">{t}</span>
          ))}
        </div>
      </section>
    </div>
  );
}

function BottomNav({ tab, setTab }) {
  const tabs = [
    ["home", "🏠", "Inicio"],
    ["chat", "💬", "Chat"],
    ["forms", "💼", "Forms"],
    ["cycle", "✅", "Ciclo"],
    ["more", "☰", "Más"]
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t bg-white px-4 py-3">
      <div className="mx-auto grid max-w-3xl grid-cols-5 gap-2">
        {tabs.map(([key, icon, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={"rounded-3xl px-3 py-3 text-center font-bold " + (tab === key ? "bg-slate-950 text-white" : "text-slate-500")}
          >
            <span className="block text-2xl">{icon}</span>
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export default function App() {
  const [tab, setTab] = useState("home");
  const [sector, setSector] = useState("zona-franca");
  const [selectedModule, setSelectedModule] = useState("ir-3");
  const isPro = true;

  const content = useMemo(() => {
    if (tab === "chat") return <Chat />;
    if (tab === "forms") return <Forms />;
    if (tab === "cycle") return <Cycle />;
    if (tab === "more") return <More />;
    return <Home sector={sector} setSector={setSector} selectedModule={selectedModule} setSelectedModule={setSelectedModule} />;
  }, [tab, sector, selectedModule]);

  return (
    <main className="min-h-screen bg-slate-50 pb-28">
      <Header isPro={isPro} />
      {content}
      <BottomNav tab={tab} setTab={setTab} />
    </main>
  );
}

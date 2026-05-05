import { useState } from "react";

const taxDictionary = {
  "ir-2": {
    titulo: "IR-2 - Declaración Jurada de Sociedades",
    definicion: "El IR-2 es la declaración jurada anual del Impuesto Sobre la Renta para sociedades en República Dominicana. Se utiliza para reportar ingresos, costos, gastos, utilidad fiscal, anticipos, retenciones, impuesto liquidado y, cuando aplique, impuesto sobre activos.",
    categoria: "Declaraciones juradas",
    entidad: "DGII"
  },
  "ir2": {
    titulo: "IR-2 - Declaración Jurada de Sociedades",
    definicion: "El IR-2 es la declaración anual que presentan las sociedades ante la DGII para declarar sus resultados fiscales, determinar el ISR, aplicar anticipos, retenciones y validar si corresponde impuesto sobre activos.",
    categoria: "Declaraciones juradas",
    entidad: "DGII"
  },
  "it-1": {
    titulo: "IT-1 - Declaración mensual de ITBIS",
    definicion: "El IT-1 permite reportar el ITBIS facturado, el ITBIS adelantado y el impuesto a pagar o saldo a favor del período.",
    categoria: "Declaraciones juradas",
    entidad: "DGII"
  },
  "ir-3": {
    titulo: "IR-3 - Retenciones de asalariados",
    definicion: "El IR-3 es la declaración mensual utilizada para reportar y pagar las retenciones de ISR realizadas a empleados asalariados.",
    categoria: "Nómina y retenciones",
    entidad: "DGII"
  },
  "ir-4": {
    titulo: "IR-4 - Relación anual de empleados",
    definicion: "El IR-4 resume anualmente las remuneraciones pagadas a los empleados y las retenciones practicadas durante el año fiscal correspondiente.",
    categoria: "Nómina y retenciones",
    entidad: "DGII"
  },
  "ir-13": {
    titulo: "IR-13 - Declaración anual de retenciones a asalariados",
    definicion: "El IR-13 valida anualmente las retenciones realizadas a asalariados, comparando el ISR calculado contra el ISR retenido durante el año calendario.",
    categoria: "Nómina y retenciones",
    entidad: "DGII"
  },
  "tss": {
    titulo: "TSS - Tesorería de la Seguridad Social",
    definicion: "La TSS administra el recaudo de los aportes de seguridad social en República Dominicana, incluyendo AFP, ARS, SRL, INFOTEP y conceptos relacionados con la nómina.",
    categoria: "Nómina y seguridad social",
    entidad: "TSS"
  },
  "nomina": {
    titulo: "Nómina",
    definicion: "La nómina es el proceso mediante el cual una empresa calcula salarios, horas extras, bonificaciones, deducciones, aportes de seguridad social, retenciones de ISR y el pago neto a sus empleados.",
    categoria: "Laboral / Contable",
    entidad: "Empresa / TSS / DGII"
  },
  "itbis": {
    titulo: "ITBIS - Impuesto a la Transferencia de Bienes Industrializados y Servicios",
    definicion: "El ITBIS es el impuesto aplicado a la transferencia de bienes industrializados, importación de bienes y prestación de servicios gravados en República Dominicana.",
    categoria: "Impuestos indirectos",
    entidad: "DGII"
  },
  "isr": {
    titulo: "ISR - Impuesto Sobre la Renta",
    definicion: "El ISR grava las rentas, beneficios o utilidades obtenidas por personas físicas y jurídicas. En empresas se declara principalmente mediante el IR-2.",
    categoria: "Impuestos directos",
    entidad: "DGII"
  }
};

const modules = [
  {
    key: "ir-2",
    title: "IR-2",
    subtitle: "Declaración Jurada Anual de Sociedades",
    description: "Formulario utilizado por las sociedades para declarar sus operaciones fiscales del año, determinar el ISR, anticipos, retenciones y validar el impuesto sobre activos cuando aplique."
  },
  {
    key: "it-1",
    title: "IT-1",
    subtitle: "Declaración mensual de ITBIS",
    description: "Permite reportar el ITBIS facturado, ITBIS adelantado, operaciones gravadas, exentas y el saldo a pagar o a favor."
  },
  {
    key: "ir-3",
    title: "IR-3",
    subtitle: "Retenciones mensuales a asalariados",
    description: "Declaración mensual de las retenciones de ISR aplicadas a empleados según la nómina reportada."
  },
  {
    key: "tss",
    title: "TSS",
    subtitle: "Seguridad Social y Nómina",
    description: "Gestión de aportes de seguridad social, novedades, dependientes, salario cotizable y pagos mensuales."
  }
];

const proContentByModule = {
  "ir-2": {
    ejemplos: [
      "Empresa con utilidad fiscal: ingresos gravados menos costos y gastos admitidos determinan la renta neta imponible.",
      "Empresa con impuesto sobre activos mayor al ISR: se evalúa la diferencia a pagar según corresponda.",
      "Sociedad con retenciones y anticipos: estos valores se cruzan contra el impuesto liquidado para determinar el saldo final."
    ],
    checklist: [
      "Estados financieros cerrados y conciliados.",
      "Ingresos comparados contra NCF emitidos y reportes fiscales.",
      "Costos y gastos sustentados con comprobantes válidos.",
      "Retenciones recibidas verificadas.",
      "Anticipos pagados conciliados.",
      "Activos revisados para validar impuesto sobre activos.",
      "Conciliación fiscal preparada.",
      "Anexos completados antes del envío."
    ],
    erroresFrecuentes: [
      "No conciliar ingresos contables con reportes fiscales.",
      "Registrar gastos sin comprobantes válidos.",
      "No considerar anticipos o retenciones disponibles.",
      "Confundir impuesto liquidado con impuesto efectivamente a pagar.",
      "No revisar el impuesto sobre activos cuando aplica."
    ],
    guiaPasoAPaso: [
      "Cerrar la contabilidad del período.",
      "Preparar estados financieros.",
      "Realizar conciliación fiscal.",
      "Validar ingresos, costos, gastos, retenciones y anticipos.",
      "Completar anexos del IR-2.",
      "Revisar impuesto liquidado, saldos a favor o diferencias a pagar.",
      "Enviar declaración y guardar acuse."
    ]
  },
  "it-1": {
    ejemplos: [
      "Si el ITBIS facturado es mayor que el ITBIS adelantado, se genera impuesto a pagar.",
      "Si el ITBIS adelantado supera el facturado, puede generarse saldo a favor."
    ],
    checklist: [
      "Ventas del mes conciliadas.",
      "NCF emitidos revisados.",
      "Compras con comprobantes válidos verificadas.",
      "Notas de crédito aplicadas correctamente.",
      "Saldo a favor anterior validado."
    ],
    erroresFrecuentes: [
      "Declarar ventas diferentes a los comprobantes emitidos.",
      "Tomar ITBIS adelantado sin soporte válido.",
      "No aplicar correctamente notas de crédito."
    ],
    guiaPasoAPaso: [
      "Conciliar ventas.",
      "Validar compras.",
      "Revisar ITBIS facturado y adelantado.",
      "Aplicar saldos a favor si existen.",
      "Enviar declaración y guardar constancia."
    ]
  },
  "ir-3": {
    ejemplos: [
      "Empleado con salario gravado: se calcula ISR según la escala anual prorrateada mensualmente.",
      "Empleado con otro agente de retención: puede requerir validación especial para evitar diferencias en IR-13."
    ],
    checklist: [
      "Nómina del mes cerrada.",
      "Salarios, bonificaciones y deducciones revisadas.",
      "ISR retenido validado.",
      "Cruce contra TSS revisado.",
      "Declaración enviada y pagada."
    ],
    erroresFrecuentes: [
      "No actualizar novedades de empleados.",
      "Calcular ISR sobre una base incorrecta.",
      "No conciliar nómina, TSS e IR-3."
    ],
    guiaPasoAPaso: [
      "Cerrar nómina.",
      "Validar salarios gravados.",
      "Calcular retenciones.",
      "Comparar contra TSS.",
      "Presentar IR-3."
    ]
  },
  "tss": {
    ejemplos: [
      "Ingreso de empleado nuevo: debe registrarse oportunamente para que cotice correctamente.",
      "Cambio salarial: debe actualizarse para que los aportes se calculen sobre la base correcta."
    ],
    checklist: [
      "Altas y bajas actualizadas.",
      "Cambios salariales registrados.",
      "Dependientes revisados.",
      "Factura TSS conciliada con nómina.",
      "Pago realizado dentro del plazo."
    ],
    erroresFrecuentes: [
      "No reportar salida de empleados a tiempo.",
      "Diferencias entre nómina y salario cotizable.",
      "No validar novedades antes de generar factura."
    ],
    guiaPasoAPaso: [
      "Actualizar novedades.",
      "Validar nómina.",
      "Generar factura.",
      "Conciliar valores.",
      "Realizar pago."
    ]
  }
};

function normalizeText(text = "") {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 -]/g, "")
    .trim();
}

function findDictionaryAnswer(question) {
  const normalizedQuestion = normalizeText(question);

  for (const [key, value] of Object.entries(taxDictionary)) {
    const normalizedKey = normalizeText(key);
    const normalizedTitle = normalizeText(value.titulo);

    if (normalizedQuestion.includes(normalizedKey) || normalizedQuestion.includes(normalizedTitle)) {
      return value;
    }
  }

  return null;
}

async function askTaxAI(question) {
  try {
    const response = await fetch("/api/tax-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    if (!response.ok) throw new Error("AI request failed");

    const data = await response.json();
    return data.answer;
  } catch (error) {
    return "No pude generar una respuesta con IA en este momento. Verifica que el endpoint /api/tax-ai esté conectado correctamente. Esta respuesta es orientativa y no sustituye una consulta formal con la DGII, TSS o un asesor especializado.";
  }
}

async function getTaxChatResponse(question) {
  const dictionaryAnswer = findDictionaryAnswer(question);

  if (dictionaryAnswer) {
    return {
      source: "Diccionario tributario",
      answer:
        dictionaryAnswer.titulo +
        "\n\n" +
        dictionaryAnswer.definicion +
        "\n\nCategoría: " +
        dictionaryAnswer.categoria +
        "\nEntidad relacionada: " +
        dictionaryAnswer.entidad +
        "\n\nEsta respuesta es orientativa y no sustituye una consulta formal con la DGII, TSS o un asesor especializado."
    };
  }

  const aiAnswer = await askTaxAI(question);
  return { source: "IA tributaria", answer: aiAnswer };
}

function TaxChat() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hola. Soy tu chat tributario y financiero. Puedes preguntarme sobre DGII, TSS, nómina, ITBIS, ISR, IR-2, IR-3, IR-13, contabilidad o finanzas.",
      source: "Sistema"
    }
  ]);
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!question.trim()) return;

    const userQuestion = question.trim();
    setMessages((prev) => [...prev, { role: "user", text: userQuestion }]);
    setQuestion("");
    setLoading(true);

    const response = await getTaxChatResponse(userQuestion);
    setMessages((prev) => [...prev, { role: "assistant", text: response.answer, source: response.source }]);
    setLoading(false);
  }

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-900">Chat tributario con IA</h2>
        <p className="text-sm text-slate-600">
          Responde desde el diccionario interno y, si no encuentra el término, consulta IA.
        </p>
      </div>

      <div className="mb-4 max-h-96 space-y-3 overflow-y-auto rounded-xl bg-slate-50 p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              "rounded-xl p-3 text-sm whitespace-pre-line " +
              (msg.role === "user"
                ? "ml-auto max-w-[85%] bg-slate-900 text-white"
                : "mr-auto max-w-[90%] bg-white text-slate-800 border")
            }
          >
            <p>{msg.text}</p>
            {msg.source && msg.role === "assistant" && (
              <small className="mt-2 block text-xs text-slate-500">Fuente: {msg.source}</small>
            )}
          </div>
        ))}
        {loading && <p className="text-sm text-slate-500">Generando respuesta...</p>}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-300"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ej.: ¿Qué es impuesto sobre activos?"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700"
        >
          Enviar
        </button>
      </div>
    </section>
  );
}

function ContentList({ title, items, ordered = false }) {
  const ListTag = ordered ? "ol" : "ul";
  return (
    <section className="mt-4">
      <h4 className="font-semibold text-slate-900">{title}</h4>
      <ListTag className={(ordered ? "list-decimal" : "list-disc") + " mt-2 space-y-1 pl-5 text-sm text-slate-700"}>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ListTag>
    </section>
  );
}

function ProModuleContent({ moduleKey, isProUser }) {
  const content = proContentByModule[moduleKey];
  if (!content) return null;

  if (!isProUser) {
    return (
      <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <h3 className="text-lg font-bold text-amber-900">Contenido Pro disponible</h3>
        <p className="mt-1 text-sm text-amber-800">
          Activa Pro para ver ejemplos prácticos, checklist, errores frecuentes y guía paso a paso.
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-amber-900">
          <li>Ejemplos prácticos</li>
          <li>Checklist de revisión</li>
          <li>Errores frecuentes</li>
          <li>Guía paso a paso</li>
        </ul>
        <button className="mt-4 rounded-xl bg-amber-700 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-800">
          Activar Pro
        </button>
      </div>
    );
  }

  return (
    <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
      <h3 className="text-lg font-bold text-emerald-950">Contenido Pro</h3>
      <ContentList title="Ejemplos prácticos" items={content.ejemplos} />
      <ContentList title="Checklist" items={content.checklist} />
      <ContentList title="Errores frecuentes" items={content.erroresFrecuentes} />
      <ContentList title="Guía paso a paso" items={content.guiaPasoAPaso} ordered />
    </div>
  );
}

function ModuleExplorer({ isProUser }) {
  const [selectedModule, setSelectedModule] = useState(modules[0].key);
  const module = modules.find((item) => item.key === selectedModule);

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-900">Módulos tributarios</h2>
        <p className="text-sm text-slate-600">
          Selecciona un módulo y visualiza su definición y contenido Pro sin tener que bajar al final.
        </p>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-2 md:grid-cols-4">
        {modules.map((item) => (
          <button
            key={item.key}
            onClick={() => setSelectedModule(item.key)}
            className={
              "rounded-xl border px-4 py-3 text-left text-sm transition " +
              (selectedModule === item.key
                ? "border-slate-900 bg-slate-900 text-white"
                : "bg-white text-slate-700 hover:bg-slate-50")
            }
          >
            <strong className="block">{item.title}</strong>
            <span className="text-xs opacity-80">{item.subtitle}</span>
          </button>
        ))}
      </div>

      {module && (
        <div className="rounded-2xl bg-slate-50 p-5">
          <h3 className="text-2xl font-bold text-slate-900">{module.title}</h3>
          <p className="mt-1 font-medium text-slate-700">{module.subtitle}</p>
          <p className="mt-3 text-sm leading-6 text-slate-700">{module.description}</p>
          <ProModuleContent moduleKey={module.key} isProUser={isProUser} />
        </div>
      )}
    </section>
  );
}

export default function App() {
  const [isProUser, setIsProUser] = useState(true);

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Asistente Tributario RD</h1>
              <p className="mt-2 text-sm text-slate-300">
                Diccionario, módulos fiscales y chat con IA para temas tributarios, contables y financieros.
              </p>
            </div>
            <button
              onClick={() => setIsProUser((prev) => !prev)}
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900"
            >
              Vista actual: {isProUser ? "Usuario Pro" : "Usuario Gratis"}
            </button>
          </div>
        </header>

        <ModuleExplorer isProUser={isProUser} />
        <TaxChat />
      </div>
    </main>
  );
}

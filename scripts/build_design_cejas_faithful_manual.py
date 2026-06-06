from __future__ import annotations

import csv
import math
import re
import textwrap
from dataclasses import dataclass, field
from io import BytesIO
from pathlib import Path

from docx import Document
from docx.enum.section import WD_SECTION
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.opc.constants import RELATIONSHIP_TYPE as RT
from docx.shared import Inches, Pt, RGBColor
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont, ImageStat
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import Image as RLImage
from reportlab.platypus import PageBreak, Paragraph, SimpleDocTemplate, Spacer


WORKSPACE = Path(r"C:\Users\Usuario\Documents\New project")
SOURCE_DIR = WORKSPACE / "tmp_preferido_extract"
OUT_DIR = WORKSPACE / "artifacts" / "manual_diseno_cejas_final_v2"
IMG_DIR = OUT_DIR / "imagenes"
RENDER_DIR = OUT_DIR / "docx_render"
OUT_DIR.mkdir(parents=True, exist_ok=True)
IMG_DIR.mkdir(parents=True, exist_ok=True)

RAW_DOCX = OUT_DIR / "manual_diseno_cejas_formacion_integral_v2_raw.docx"
FINAL_DOCX = OUT_DIR / "manual_diseno_cejas_formacion_integral_v2.docx"
FINAL_PDF = OUT_DIR / "manual_diseno_cejas_formacion_integral_v2.pdf"
VISUAL_MANIFEST = OUT_DIR / "manifesto_visual.csv"
COVERAGE_CSV = OUT_DIR / "cobertura_paginas_originales.csv"

BRAND = "formacion.integral.tc"

VIDEO_LINKS = {
    "diseno": ("Video: diseño de cejas", "https://youtu.be/9fFBVRmSw88?si=aTozANbaZ5eQizYP"),
    "depilacion": ("Video: depilación de cejas", "https://youtu.be/r7B6u5o76SE?si=rtpwMn_t0g27RbG1"),
    "visagismo": ("Video: visagismo de cejas", "https://youtu.be/_tqkl2SQGi4?si=cKsUjX_oZnZ3OXVr"),
    "henna": ("Video: procedimiento de cejas con henna", "https://youtu.be/tTU4nYJwWbY?si=4gtSVPysqNI4HLbs"),
    "laminado": ("Video adicional: laminado de cejas", "https://youtu.be/xIAzqFuKokQ?si=RuUI_ZuNOmKqUAMc"),
    "profundidad": ("Video avanzado: profundidad en micropigmentación", "https://youtu.be/pjeJPidc4Gg?si=pIMDdtFBBRKErzBm"),
    "pelo_a_pelo": ("Video avanzado: cejas pelo a pelo", "https://youtu.be/MgEcSr5g6Uc?si=0T-Qff4sc_BwSSUe"),
    "mixtas": ("Video avanzado: cejas mixtas", "https://youtu.be/502110zannM?si=SA4jjNxlhjK_vIAt"),
}


@dataclass
class Lesson:
    title: str
    pages: list[int]
    paragraphs: list[str]
    bullets: list[str] = field(default_factory=list)
    videos: list[str] = field(default_factory=list)
    generated_visual: str | None = None
    keep_original_images: bool = True


@dataclass
class Module:
    title: str
    subtitle: str
    lessons: list[Lesson]


MODULES = [
    Module(
        "1. Base profesional del servicio",
        "Preparación, bioseguridad, ética y lenguaje de trabajo.",
        [
            Lesson(
                "Bienvenida y propósito del curso",
                [1, 2],
                [
                    "Este manual reúne las técnicas necesarias para prestar un servicio completo de diseño de cejas, desde la preparación del espacio hasta la entrega final del resultado.",
                    "La meta no es solo aprender un procedimiento: también es construir una práctica profesional que pueda sostener un negocio propio, con criterio, seguridad y una experiencia clara para la clienta.",
                ],
                [
                    "Estudia primero el proceso completo antes de practicar sobre una persona.",
                    "Organiza el material antes de iniciar para trabajar con fluidez.",
                    "Mantén la promesa del servicio: técnica, higiene, comunicación y resultado.",
                ],
                generated_visual="cover",
                keep_original_images=False,
            ),
            Lesson(
                "Materiales indispensables",
                [3],
                [
                    "Antes de iniciar debes preparar los insumos de higiene, marcación, epilación, corte y henna. Tenerlos listos evita interrupciones y transmite seguridad.",
                    "El kit base incluye algodón, cepillos desechables, champú neutro, gel calmante, loción astringente, exfoliante facial, línea de costura, lápiz dermatográfico negro, bolígrafo de gel blanco, pinzas, tijeras, paquímetro, palito de naranjo, bastoncillos, dappen, henna, quitamanchas, mezclador, brocha, guantes y mascarilla.",
                ],
                [
                    "Separa lo descartable de lo reutilizable.",
                    "Desinfecta o esteriliza las herramientas que lo requieren.",
                    "Revisa que los productos estén vigentes y en buen estado.",
                ],
                generated_visual="materials",
            ),
            Lesson(
                "Bioseguridad en cabina",
                [4],
                [
                    "La bioseguridad reúne todas las medidas que protegen a la clienta y a la profesional. El espacio debe estar limpio, ventilado y organizado, con materiales descartables siempre que haya contacto directo.",
                    "No se reutilizan productos que hayan tocado piel, mucosas o fluidos. Las pinzas y tijeras deben pasar por limpieza y desinfección entre servicios, y los elementos de un solo uso se desechan al terminar.",
                ],
                [
                    "Lávate o higieniza tus manos antes y después del servicio.",
                    "Usa guantes cuando el procedimiento lo requiera.",
                    "Mantén una tijera y pinzas correctamente higienizadas para cada atención.",
                ],
                generated_visual="biosecurity",
            ),
            Lesson(
                "Ética, postura y presentación",
                [5, 6],
                [
                    "La actitud profesional se percibe desde el primer contacto: presentación personal, amabilidad, neutralidad, respeto y cuidado con lo que se conversa en cabina.",
                    "Evita opinar sobre la vida de la clienta. Escucha, orienta y mantén el servicio centrado en el resultado. Esa postura crea credibilidad y diferencia tu trabajo.",
                    "También conviene usar correctamente el lenguaje del oficio: eres diseñadora de cejas y realizas diseño de cejas; el nombre de la profesión y la acción deben comunicar seguridad.",
                ],
                [
                    "Cabello, uñas y uniforme limpios.",
                    "Comunicación clara y sin juicios personales.",
                    "Ambiente organizado, agradable y profesional.",
                ],
                generated_visual="professional_attitude",
            ),
            Lesson(
                "Nomenclatura técnica de la ceja",
                [7],
                [
                    "Antes de mapear conviene manejar un vocabulario común. El punto inicial, el punto alto, el punto final, el cuerpo y la cola permiten explicar el diseño de forma ordenada.",
                    "La proporción visual más usada conserva mayor presencia en el cuerpo de la ceja y una cola más ligera. Esta lectura ayuda a evitar diseños pesados o terminaciones demasiado largas.",
                ],
                [
                    "Usa los nombres técnicos durante la explicación a la clienta.",
                    "Distingue cuerpo y cola antes de retirar pelo.",
                    "La nomenclatura evita improvisar durante el mapeo.",
                ],
            ),
        ],
    ),
    Module(
        "2. Fundamentos del vello y análisis inicial",
        "Crecimiento del pelo, visagismo y límites reales de corrección.",
        [
            Lesson(
                "Crecimiento del vello y tiempo de retorno",
                [8],
                [
                    "El pelo nace en la dermis, donde se encuentran el folículo piloso y la raíz. El crecimiento tiene fases y no todos los vellos aparecen al mismo tiempo.",
                    "Por eso el mantenimiento debe respetar el ciclo natural. La recomendación general es esperar entre 15 y 20 días para un nuevo diseño, evitando sobretrabajar la zona.",
                ],
                [
                    "Explica a la clienta por qué no conviene depilar antes de tiempo.",
                    "Observa dirección, densidad y largo del pelo antes de marcar.",
                    "Usa el ciclo de crecimiento como argumento profesional.",
                ],
                generated_visual="hair_cycle",
            ),
            Lesson(
                "Visagismo: leer antes de marcar",
                [9, 10, 11, 12],
                [
                    "El primer paso para un mapeo correcto es analizar el rostro, la estructura de la ceja y la forma natural del pelo. A esto lo llamamos visagismo.",
                    "No se debe inventar una ceja que no existe. En cejas muy delgadas, gruesas, rectas, caídas o asimétricas, el objetivo es mejorar con criterio sin descaracterizar el rostro.",
                    "Cuando una ceja está más alta, más baja o más llena que la otra, se hacen ajustes medidos. La clienta debe entender qué se puede corregir en una sesión y qué requiere crecimiento.",
                ],
                [
                    "Conserva la mayor cantidad de pelo útil en cejas delgadas.",
                    "Adelgaza cejas gruesas solo con autorización.",
                    "Explica los límites antes de iniciar para evitar expectativas irreales.",
                ],
                videos=["visagismo"],
            ),
        ],
    ),
    Module(
        "3. Mapeo facial paso a paso",
        "Punto inicial, línea central, grosor, cola, arco y conexión.",
        [
            Lesson(
                "Punto de partida y línea central",
                [13, 14],
                [
                    "El punto de partida se encuentra usando el puente de la nariz como referencia. Desde ahí se traza una línea recta hacia la frente para definir dónde debe iniciar la ceja.",
                    "Después se marca la línea central de la nariz hacia la frente. Esta línea ayuda a comparar medidas y a revisar si ambos lados están equilibrados.",
                ],
                [
                    "No fuerces el inicio si la ceja natural nace más separada.",
                    "Trabaja con líneas finas para poder corregir.",
                    "La línea central es la guía de simetría del diseño.",
                ],
                videos=["diseno"],
            ),
            Lesson(
                "Grosor, final y arco",
                [15, 16, 17],
                [
                    "El grosor se define con dos líneas: una superior y una inferior. El equilibrio está en evitar que la ceja quede demasiado gruesa o excesivamente delgada.",
                    "El punto final se marca trazando una línea desde el puente de la nariz hacia la última pestaña de la esquina externa del ojo. Si queda muy largo o muy corto, el diseño pierde armonía.",
                    "Para ubicar la comba o arco, observa dónde nace el pelo más alto. El cuerpo debe verse más importante que la cola, y el arco no debe convertirse en una curva artificial.",
                ],
                [
                    "Respeta la estructura natural antes de retirar pelo.",
                    "El cuerpo de la ceja debe tener más presencia que la cola.",
                    "Si la ceja es muy recta, explica que los cambios serán graduales.",
                ],
            ),
            Lesson(
                "Punto alto, corrección y conexión del diseño",
                [18, 19, 20],
                [
                    "Las cejas no son idénticas. Para comparar el punto alto, traza una línea entre ambos lados y evalúa diferencias de altura.",
                    "Si hay una diferencia leve, se puede compensar reduciendo cerca de 1 mm en la ceja más alta y aumentando visualmente 1 mm en la más baja, siempre sin deformar.",
                    "Cuando las líneas principales están listas, conecta los puntos. El diseño correcto se reconoce porque las líneas dialogan con la línea central y el rostro mantiene armonía.",
                ],
                [
                    "Limpia las marcas antes de mostrar el resultado.",
                    "No prometas simetría absoluta: promete armonía.",
                    "Presenta el diseño a la clienta antes de retirar pelo.",
                ],
            ),
            Lesson(
                "Diseño masculino",
                [21],
                [
                    "En cejas masculinas la prioridad es la naturalidad. El diseño debe ser sutil, sin adelgazar en exceso ni crear un arco marcado.",
                    "La intervención se concentra en limpiar excesos, ordenar la línea y respetar la expresión del rostro. Nunca arquees una ceja masculina si la clienta o cliente no lo solicita de forma clara y aun así evalúa si conviene.",
                ],
                [
                    "Evita contornos demasiado dibujados.",
                    "Retira solo lo necesario para ordenar.",
                    "Mantén el carácter natural de la ceja.",
                ],
            ),
        ],
    ),
    Module(
        "4. Epilación, depilación y recorte",
        "Diferencias, técnica, dirección del pelo y cuidado de piel.",
        [
            Lesson(
                "Frecuencia de mantenimiento y autonomía profesional",
                [22],
                [
                    "El retorno ideal se agenda cada 15 a 20 días. Ese intervalo permite que el pelo complete parte de su ciclo y que el nuevo diseño tenga material suficiente para trabajar.",
                    "La profesional no debe permitir que la clienta diseñe o aplique producto sin orientación dentro del servicio. La conducción técnica evita errores y mejora la devolución final.",
                ],
                [
                    "Agenda el retorno antes de despedir a la clienta.",
                    "Explica que el mantenimiento temprano puede afinar de más.",
                    "Conserva el control técnico del procedimiento.",
                ],
            ),
            Lesson(
                "Epilación, depilación y pinzas",
                [23, 24],
                [
                    "Epilación significa retirar el pelo desde la raíz, eliminando el bulbo y prolongando el efecto. Depilación puede referirse al retiro más superficial del pelo.",
                    "Con pinzas se debe retirar cada pelo en la dirección en la que nace. Si se tira en dirección contraria, puede romperse, inflamar la piel o alterar el crecimiento.",
                ],
                [
                    "Observa la dirección del pelo por zonas.",
                    "Estira suavemente la piel cuando sea necesario.",
                    "Retira pelo por pelo en áreas de precisión.",
                ],
                videos=["depilacion"],
            ),
            Lesson(
                "Cera fría y cuidado posterior",
                [25],
                [
                    "La cera fría se aplica sobre el pelo y se retira en sentido contrario al crecimiento para arrancarlo desde la raíz. Debe retirarse con rapidez para no dejar residuos.",
                    "Después de usar cera, la piel puede quedar sensible o enrojecida. Finaliza con agua termal, gel calmante, masaje suave o hidratación facial, según tolerancia de la piel.",
                ],
                [
                    "No uses cera sobre piel lesionada o irritada.",
                    "Retira residuos sin frotar en exceso.",
                    "Calma la zona antes de mostrar el resultado final.",
                ],
            ),
            Lesson(
                "Recorte del pelo",
                [26],
                [
                    "El recorte se hace únicamente sobre el exceso que sobrepasa la línea del mapeo. No se debe cortar de forma plana ni retirar volumen útil.",
                    "El pelo del cuerpo de la ceja se peina hacia arriba y se corta solo lo que sale del diseño. En la cola, se peina hacia abajo si la dirección natural lo pide.",
                ],
                [
                    "Recorta poco y revisa varias veces.",
                    "No cortes pelos que ayudan a rellenar espacios.",
                    "La tijera acompaña el diseño, no lo reemplaza.",
                ],
            ),
        ],
    ),
    Module(
        "5. Evaluación de piel y herramientas de precisión",
        "Estado de la piel, paquímetro, lápiz dermatográfico y limpieza.",
        [
            Lesson(
                "Evaluación de piel antes del producto",
                [27],
                [
                    "Antes de diseñar o aplicar henna, revisa si la piel está íntegra. Lesiones, irritación, descamación, dermatitis o heridas pueden cambiar la decisión del producto.",
                    "Si la alteración está lejos de la ceja, puede ser posible trabajar; si compromete el área del procedimiento, se debe posponer o adaptar el servicio explicando los riesgos.",
                ],
                [
                    "Observa textura, color y sensibilidad.",
                    "Pregunta por alergias y tratamientos recientes.",
                    "Documenta cualquier contraindicación antes de iniciar.",
                ],
            ),
            Lesson(
                "Paquímetro y medición",
                [28],
                [
                    "El paquímetro ayuda a medir ancho, grosor y longitud total de las cejas. Es útil para comparar milímetros y sostener decisiones técnicas.",
                    "Aun con medición, el diseño debe seguir los rasgos naturales de la clienta. Medir no significa imponer un molde único.",
                ],
                [
                    "Usa la medida como guía, no como regla rígida.",
                    "Compara ambos lados con calma.",
                    "Respeta la estructura facial por encima de la plantilla.",
                ],
            ),
            Lesson(
                "Lápiz dermatográfico y diferencia entre limpieza y diseño",
                [29, 30],
                [
                    "El lápiz dermatográfico permite marcar con precisión. Si la punta viene redondeada, se puede preparar para obtener líneas más finas y útiles durante el mapeo.",
                    "Cuando una clienta pide limpieza, solo se retiran pelos fuera del dibujo natural. Cuando pide diseño, se realiza análisis, marcación y personalización. Esta diferencia debe explicarse antes del servicio.",
                ],
                [
                    "Define el servicio antes de empezar.",
                    "Usa marcaciones limpias y visibles.",
                    "Evita vender una limpieza como si fuera diseño completo.",
                ],
            ),
            Lesson(
                "Saneamiento de cejas y pestañas",
                [31],
                [
                    "Cejas y pestañas protegen los ojos del polvo y de la suciedad, por eso acumulan residuos entre los pelos. La limpieza previa mejora la adherencia de productos y la presentación del servicio.",
                    "Exfoliar suavemente, higienizar con champú neutro y retirar residuos prepara la zona para un procedimiento más seguro y prolijo.",
                ],
                [
                    "No frotes con fuerza cerca del ojo.",
                    "Retira completamente el producto de limpieza.",
                    "Seca antes de marcar o aplicar henna.",
                ],
            ),
        ],
    ),
    Module(
        "6. Henna profesional",
        "Prueba alérgica, elección, preparación, aplicación y acabado.",
        [
            Lesson(
                "Qué es la henna y cuándo hacer prueba alérgica",
                [32, 33, 34],
                [
                    "La henna proviene de la planta Lawsonia inermis y se utiliza en polvo como pigmento. En cejas, ayuda a sombrear la piel y dar apariencia de mayor definición.",
                    "La prueba alérgica es obligatoria en personas con antecedentes de alergia, embarazadas, pieles reactivas o cuando exista duda. Se aplica una pequeña cantidad detrás de la oreja o en una zona discreta y se observa la reacción.",
                    "Después de la prueba, la clienta debe observar por 24 horas si aparece picazón, enrojecimiento o molestia. Si hubo reacción, no se aplica henna sin advertir claramente los riesgos.",
                ],
                [
                    "Explica siempre el motivo de la prueba.",
                    "No minimices picazón, ardor o enrojecimiento.",
                    "La clienta debe estar consciente de todo antes de autorizar.",
                ],
                videos=["henna"],
            ),
            Lesson(
                "Elección del tono y preparación",
                [35, 36],
                [
                    "Elige hennas con buena fijación, variedad de tonos, sin plomo, sin amoníaco y, preferiblemente, no testeadas en animales. Considera color de pelo y tono de piel al escoger la mezcla.",
                    "Para preparar, coloca henna en un dappen y añade fijador hasta cubrirla. Deja reposar unos minutos para activar la pigmentación y trabaja con una textura cremosa, sin exceso de líquido.",
                ],
                [
                    "Rubias y pieles claras suelen requerir tonos más suaves.",
                    "Morenas o cabello oscuro pueden necesitar castaño oscuro o negro equilibrado.",
                    "La mezcla debe permitir aplicación precisa sin escurrir.",
                ],
            ),
            Lesson(
                "Aplicación y tiempo de acción",
                [37, 38, 39],
                [
                    "La henna puede aplicarse con palito de naranjo o brocha precisa. Trabaja en partes pequeñas y alinea de inmediato para evitar manchas.",
                    "El tiempo máximo de acción es de 30 minutos. Para un efecto más natural, se puede retirar antes en el punto inicial y dejar más tiempo en el cuerpo y la cola.",
                    "Después de retirar, muestra el tono a la clienta antes de terminar. Si desea aclarar, se puede usar quitamanchas con cuidado para no retirar demasiado pigmento.",
                ],
                [
                    "No dejes bordes irregulares mientras seca.",
                    "Controla el tiempo según intensidad deseada.",
                    "Pregunta por el tono antes del acabado final.",
                ],
            ),
            Lesson(
                "Neutralización, acabado y efecto ombré",
                [40, 41, 42],
                [
                    "Al retirar la henna por completo, aplica una gota de fijador en cada ceja. Déjalo actuar unos segundos y retira con algodón seco; esto ayuda a estabilizar el tono.",
                    "Si aparece un fondo verdoso o amarillento, se neutraliza con el fijador indicado por la marca. Aunque no haya reflejo extraño, el fijador mejora la adherencia y el acabado.",
                    "El acabado final no se omite: corrige líneas, ilumina suavemente debajo de la ceja y crea un efecto ombré aclarando el punto inicial con quitamanchas aplicado de forma controlada.",
                ],
                [
                    "El punto inicial debe quedar más suave que el resto.",
                    "No retires la henna por completo al degradar.",
                    "Muestra el resultado final y pide feedback.",
                ],
            ),
        ],
    ),
    Module(
        "7. Experiencia, fidelización y fotografía",
        "Cómo convertir un buen procedimiento en una experiencia recordable.",
        [
            Lesson(
                "Fidelización desde el primer mensaje",
                [43, 44],
                [
                    "La fidelización empieza cuando la clienta escribe para preguntar por una cita. La respuesta debe ser amable, clara y receptiva, con preguntas útiles y confirmación previa del horario.",
                    "Durante la visita, crea una experiencia cómoda: saludo cercano, ambiente agradable, aroma limpio, música tranquila, café o agua, y detalles que hagan sentir a la clienta cuidada.",
                    "La sobreentrega consiste en dar un detalle adicional al servicio esperado, como un masaje relajante si solo hizo diseño, un cepillo de regalo o un cierre amable con recomendación de cuidado.",
                ],
                [
                    "Confirma la cita un día antes.",
                    "Agenda el próximo mantenimiento antes de despedirla.",
                    "Ten opciones de fidelidad para incentivar el retorno mensual.",
                ],
                generated_visual="client_loyalty",
            ),
            Lesson(
                "Fotografía, portafolio y permiso",
                [45, 46],
                [
                    "Las fotos permiten mostrar el trabajo, construir portafolio y evaluar qué se puede mejorar. Siempre pide autorización antes de tomar fotos o videos.",
                    "Para vender mejor el resultado, prioriza buena iluminación, ojos abiertos y ángulos que favorezcan la ceja. Una imagen clara transmite más confianza que una foto oscura o mal encuadrada.",
                    "La edición debe ser sutil: corregir manchas o granitos puede ayudar, pero no debe crear un resultado artificial. La foto debe verse atractiva y honesta para futuras clientas.",
                ],
                [
                    "Toma fotos antes y después del servicio.",
                    "Usa luz frontal suave y fondo limpio.",
                    "Edita con moderación para conservar credibilidad.",
                ],
                generated_visual="photo_tips",
            ),
        ],
    ),
]


def page_text(page: int) -> str:
    path = SOURCE_DIR / f"page_{page:02d}.txt"
    if not path.exists():
        return ""
    return re.sub(r"\s+", " ", path.read_text(encoding="utf-8", errors="replace")).strip()


def source_images_for_pages(pages: list[int]) -> list[Path]:
    images: list[Path] = []
    for page in pages:
        images.extend(sorted(SOURCE_DIR.glob(f"page_{page:02d}_img_*.*")))
    return images


def is_old_brand_or_decorative(path: Path) -> bool:
    if path.name in {"page_01_img_01.png", "page_01_img_02.png"}:
        return True
    try:
        if path.stat().st_size == 41402:
            return True
        with Image.open(path) as im:
            im = im.convert("RGB")
            w, h = im.size
            brightness = sum(ImageStat.Stat(im.resize((16, 16))).mean) / 3
            if w == h and brightness < 35 and path.stat().st_size < 56000:
                return True
    except Exception:
        return False
    return False


def image_decision(path: Path, lesson: Lesson) -> tuple[str, str]:
    if is_old_brand_or_decorative(path):
        return "descartar", "Logo/decoración del manual anterior; se reemplaza por marca propia."
    if any(page in lesson.pages for page in range(13, 21)):
        return "conservar", "Referencia técnica de visagismo/mapeo; debe permanecer junto al procedimiento."
    if 7 in lesson.pages:
        return "conservar", "Referencia técnica de nomenclatura y proporción de cejas."
    if any(page in lesson.pages for page in [21, 24, 25, 26, 27, 28, 29, 31, 33, 36, 37, 38, 39, 40, 41, 42, 45, 46]):
        return "conservar", "Imagen de referencia/procedimiento necesaria para comprender la técnica."
    return "reemplazar", "Imagen genérica; se acompaña con visual nuevo o queda como apoyo secundario."


def enhance_image(path: Path) -> Path:
    out = IMG_DIR / f"{path.stem}_enhanced.jpg"
    if out.exists():
        return out
    with Image.open(path) as src:
        im = src.convert("RGB")
        if im.width < 900:
            ratio = 900 / max(im.width, 1)
            im = im.resize((900, int(im.height * ratio)), Image.Resampling.LANCZOS)
        elif im.width > 1300:
            ratio = 1300 / im.width
            im = im.resize((1300, int(im.height * ratio)), Image.Resampling.LANCZOS)
        im = ImageEnhance.Contrast(im).enhance(1.06)
        im = ImageEnhance.Sharpness(im).enhance(1.18)
        im = im.filter(ImageFilter.UnsharpMask(radius=1.0, percent=90, threshold=3))
        im.save(out, "JPEG", quality=86, optimize=True, progressive=True)
    return out


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        r"C:\Windows\Fonts\segoeuib.ttf" if bold else r"C:\Windows\Fonts\segoeui.ttf",
        r"C:\Windows\Fonts\arialbd.ttf" if bold else r"C:\Windows\Fonts\arial.ttf",
    ]
    for candidate in candidates:
        try:
            return ImageFont.truetype(candidate, size=size)
        except Exception:
            pass
    return ImageFont.load_default()


def draw_wrapped(draw: ImageDraw.ImageDraw, text: str, xy: tuple[int, int], width: int, fill: str, fnt, spacing: int = 8) -> int:
    x, y = xy
    avg = max(1, int(width / max(8, fnt.size * 0.55)))
    for line in textwrap.wrap(text, width=avg):
        draw.text((x, y), line, fill=fill, font=fnt)
        y += fnt.size + spacing
    return y


def generated_visual(kind: str, title: str) -> Path:
    out = IMG_DIR / f"generada_{kind}.jpg"
    if out.exists():
        return out
    im = Image.new("RGB", (1400, 900), "#F8F3EF")
    draw = ImageDraw.Draw(im)
    brown = "#4A3226"
    rose = "#C98578"
    blue = "#7CA7AD"
    gold = "#D6A860"
    draw.rectangle((0, 0, 1400, 130), fill=brown)
    draw.text((70, 38), title, fill="white", font=font(44, True))
    draw.text((1040, 48), BRAND, fill="#E9D6CC", font=font(24))

    if kind == "materials":
        labels = ["Higiene", "Marcación", "Epilación", "Henna", "Acabado"]
        for i, label in enumerate(labels):
            x = 95 + i * 250
            draw.rounded_rectangle((x, 245, x + 170, 415), radius=28, outline=brown, width=6, fill="#FFFDFB")
            draw.ellipse((x + 54, 280, x + 116, 342), outline=rose, width=8)
            draw.text((x + 20, 455), label, fill=brown, font=font(30, True))
        draw_wrapped(draw, "Prepara el kit antes de recibir a la clienta: orden visual, higiene y herramientas a mano reducen errores.", (100, 610), 1180, brown, font(34))
    elif kind == "biosecurity":
        draw.rounded_rectangle((130, 230, 610, 690), radius=42, fill="#FFFFFF", outline=brown, width=6)
        draw.rounded_rectangle((790, 230, 1270, 690), radius=42, fill="#FFFFFF", outline=brown, width=6)
        draw.text((245, 310), "Limpio", fill=brown, font=font(58, True))
        draw.text((910, 310), "Seguro", fill=brown, font=font(58, True))
        for x in [240, 900]:
            draw.line((x, 470, x + 260, 470), fill=blue, width=18)
            draw.line((x, 520, x + 200, 520), fill=rose, width=18)
    elif kind == "client_loyalty":
        steps = ["Mensaje", "Bienvenida", "Detalle extra", "Agenda retorno"]
        for i, step in enumerate(steps):
            x = 110 + i * 310
            draw.ellipse((x, 290, x + 150, 440), fill="#FFFFFF", outline=rose, width=8)
            draw.text((x + 55, 333), str(i + 1), fill=brown, font=font(48, True))
            draw.text((x - 25, 500), step, fill=brown, font=font(30, True))
            if i < 3:
                draw.line((x + 170, 365, x + 285, 365), fill=gold, width=10)
        draw_wrapped(draw, "La fidelización nace del trato completo, no solo del resultado técnico.", (115, 650), 1120, brown, font(34))
    elif kind == "photo_tips":
        draw.rounded_rectangle((130, 235, 610, 690), radius=36, fill="#FFFFFF", outline=brown, width=6)
        draw.rounded_rectangle((790, 235, 1270, 690), radius=36, fill="#FFFFFF", outline=brown, width=6)
        draw.text((225, 305), "Antes", fill=brown, font=font(54, True))
        draw.text((890, 305), "Después", fill=brown, font=font(54, True))
        draw.arc((245, 450, 500, 590), 200, 340, fill=rose, width=12)
        draw.arc((900, 440, 1160, 600), 200, 340, fill=rose, width=18)
        draw.text((190, 720), "Luz, ángulo y permiso de imagen", fill=brown, font=font(38, True))
    elif kind == "hair_cycle":
        for i, radius in enumerate([65, 95, 125]):
            cx = 430 + i * 270
            draw.ellipse((cx - radius, 420 - radius, cx + radius, 420 + radius), outline=rose, width=10)
            draw.line((cx, 420 + radius, cx, 700), fill=brown, width=8)
        draw_wrapped(draw, "El crecimiento no ocurre al mismo ritmo en todos los pelos. Por eso el retorno se agenda cada 15 a 20 días.", (130, 230), 1140, brown, font(34))
    elif kind == "professional_attitude":
        draw.rounded_rectangle((150, 250, 1250, 720), radius=48, fill="#FFFFFF", outline=brown, width=6)
        for i, word in enumerate(["Presencia", "Respeto", "Claridad", "Criterio"]):
            draw.text((240, 315 + i * 90), word, fill=brown if i % 2 == 0 else rose, font=font(48, True))
    else:
        draw_wrapped(draw, "Visual de apoyo generado para acompañar esta lección.", (150, 330), 1050, brown, font(40))
    im.save(out, "JPEG", quality=88, optimize=True, progressive=True)
    return out


def picture_stream(path: Path) -> BytesIO:
    with Image.open(path) as src:
        im = src.convert("RGB")
        stream = BytesIO()
        im.save(stream, format="JPEG", quality=86, optimize=True, progressive=True)
        stream.seek(0)
        return stream


def add_hyperlink(paragraph, text: str, url: str) -> None:
    rel_id = paragraph.part.relate_to(url, RT.HYPERLINK, is_external=True)
    hyperlink = OxmlElement("w:hyperlink")
    hyperlink.set(qn("r:id"), rel_id)
    run = OxmlElement("w:r")
    props = OxmlElement("w:rPr")
    color = OxmlElement("w:color")
    color.set(qn("w:val"), "1F5E8C")
    underline = OxmlElement("w:u")
    underline.set(qn("w:val"), "single")
    props.append(color)
    props.append(underline)
    run.append(props)
    text_node = OxmlElement("w:t")
    text_node.text = text
    run.append(text_node)
    hyperlink.append(run)
    paragraph._p.append(hyperlink)


def setup_doc(doc: Document) -> None:
    section = doc.sections[0]
    section.top_margin = Inches(0.68)
    section.bottom_margin = Inches(0.68)
    section.left_margin = Inches(0.72)
    section.right_margin = Inches(0.72)
    section.header.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.RIGHT
    run = section.header.paragraphs[0].add_run(BRAND)
    run.font.size = Pt(9)
    run.font.color.rgb = RGBColor(92, 92, 92)


def set_styles(doc: Document) -> None:
    normal = doc.styles["Normal"]
    normal.font.name = "Segoe UI"
    normal.font.size = Pt(10.3)
    normal.paragraph_format.space_after = Pt(5)
    normal.paragraph_format.line_spacing = 1.12
    for name, size in [("Heading 1", 18), ("Heading 2", 13)]:
        style = doc.styles[name]
        style.font.name = "Segoe UI Semibold"
        style.font.size = Pt(size)
        style.font.color.rgb = RGBColor(74, 50, 38)
        style.paragraph_format.space_before = Pt(8)
        style.paragraph_format.space_after = Pt(5)


def add_docx_image(doc: Document, path: Path, width: float = 4.8) -> None:
    paragraph = doc.add_paragraph()
    paragraph.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = paragraph.add_run()
    try:
        run.add_picture(picture_stream(path), width=Inches(width))
    except Exception:
        return


def lesson_images(lesson: Lesson) -> list[tuple[Path, str, str]]:
    selected: list[tuple[Path, str, str]] = []
    if lesson.generated_visual:
        selected.append((generated_visual(lesson.generated_visual, lesson.title), "generada", "Visual nuevo creado para reemplazar imagen genérica o reforzar lectura."))
    if lesson.keep_original_images:
        for path in source_images_for_pages(lesson.pages):
            decision, reason = image_decision(path, lesson)
            if decision == "descartar":
                continue
            if decision == "conservar":
                selected.append((enhance_image(path), decision, reason))
    return selected[:5]


def write_audits() -> None:
    with COVERAGE_CSV.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["pagina_original", "modulo", "leccion", "texto_fuente_muestra"])
        writer.writeheader()
        for module in MODULES:
            for lesson in module.lessons:
                for page in lesson.pages:
                    writer.writerow(
                        {
                            "pagina_original": page,
                            "modulo": module.title,
                            "leccion": lesson.title,
                            "texto_fuente_muestra": page_text(page)[:280],
                        }
                    )
    with VISUAL_MANIFEST.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["modulo", "leccion", "pagina_original", "imagen", "decision", "razon", "prompt_generacion"])
        writer.writeheader()
        for module in MODULES:
            for lesson in module.lessons:
                if lesson.generated_visual:
                    writer.writerow(
                        {
                            "modulo": module.title,
                            "leccion": lesson.title,
                            "pagina_original": ",".join(map(str, lesson.pages)),
                            "imagen": f"generada_{lesson.generated_visual}.png",
                            "decision": "generar",
                            "razon": "Imagen nueva de apoyo para lectura profesional.",
                            "prompt_generacion": f"Imagen editorial profesional para manual de diseño de cejas, tema: {lesson.title}, estética limpia, tonos cálidos, enfoque educativo, alta nitidez, sin texto pequeño.",
                        }
                    )
                for path in source_images_for_pages(lesson.pages):
                    decision, reason = image_decision(path, lesson)
                    writer.writerow(
                        {
                            "modulo": module.title,
                            "leccion": lesson.title,
                            "pagina_original": path.name.split("_")[1],
                            "imagen": path.name,
                            "decision": decision,
                            "razon": reason,
                            "prompt_generacion": "" if decision == "conservar" else f"Recrear visual profesional para: {lesson.title}. Mantener intención educativa, fondo limpio, luz suave, alta resolución.",
                        }
                    )


def build_docx() -> Path:
    doc = Document()
    set_styles(doc)
    setup_doc(doc)

    title = doc.add_paragraph()
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = title.add_run("Manual Profesional de Diseño de Cejas")
    run.bold = True
    run.font.size = Pt(27)
    run.font.color.rgb = RGBColor(74, 50, 38)
    sub = doc.add_paragraph()
    sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    sr = sub.add_run("Versión renovada, editable y organizada para formación inicial con enfoque profesional")
    sr.font.size = Pt(12)
    sr.font.color.rgb = RGBColor(76, 76, 76)
    add_docx_image(doc, generated_visual("cover", "Diseño de cejas sin complicaciones"), width=5.2)
    doc.add_page_break()

    doc.add_heading("Ruta de aprendizaje", level=1)
    doc.add_paragraph(
        "La estructura sigue el contenido del manual original y lo reordena para que la lectura sea más clara: preparación, análisis, mapeo, ejecución, henna, fidelización y fotografía."
    )
    for module in MODULES:
        p = doc.add_paragraph(style="List Bullet")
        p.add_run(module.title + ": ").bold = True
        p.add_run(module.subtitle)
    doc.add_page_break()

    for module in MODULES:
        doc.add_heading(module.title, level=1)
        intro = doc.add_paragraph(module.subtitle)
        intro.runs[0].italic = True
        for lesson in module.lessons:
            doc.add_heading(lesson.title, level=2)
            for paragraph_text in lesson.paragraphs:
                doc.add_paragraph(paragraph_text)
            if lesson.bullets:
                for item in lesson.bullets:
                    doc.add_paragraph(item, style="List Bullet")
            if lesson.videos:
                vp = doc.add_paragraph()
                vp.add_run("Video de apoyo: ").bold = True
                for key in lesson.videos:
                    label, url = VIDEO_LINKS[key]
                    link_p = doc.add_paragraph(style="List Bullet")
                    add_hyperlink(link_p, label, url)
            for img_path, decision, reason in lesson_images(lesson):
                add_docx_image(doc, img_path)
                cap = doc.add_paragraph(f"{decision.capitalize()}: {reason}")
                cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
                cap.runs[0].italic = True
                cap.runs[0].font.size = Pt(8.5)
        doc.add_page_break()

    doc.add_heading("Recursos en video", level=1)
    doc.add_paragraph("Estos enlaces quedan reunidos aquí y también integrados dentro de los módulos correspondientes.")
    for key in ["diseno", "visagismo", "depilacion", "henna", "laminado", "profundidad", "pelo_a_pelo", "mixtas"]:
        label, url = VIDEO_LINKS[key]
        p = doc.add_paragraph(style="List Bullet")
        add_hyperlink(p, label, url)
    closing = doc.add_paragraph()
    closing.alignment = WD_ALIGN_PARAGRAPH.CENTER
    cr = closing.add_run(BRAND)
    cr.bold = True
    cr.font.color.rgb = RGBColor(74, 50, 38)
    doc.save(RAW_DOCX)
    return RAW_DOCX


def _pdf_watermark(canvas, _doc) -> None:
    canvas.saveState()
    canvas.setFont("Helvetica", 9)
    canvas.setFillColor(colors.HexColor("#777777"))
    canvas.drawRightString(7.45 * inch, 10.35 * inch, BRAND)
    canvas.setFillColor(colors.Color(0.45, 0.45, 0.45, alpha=0.10))
    canvas.setFont("Helvetica-Bold", 36)
    canvas.translate(4.25 * inch, 5.5 * inch)
    canvas.rotate(38)
    canvas.drawCentredString(0, 0, BRAND)
    canvas.restoreState()


def rl_image(path: Path, max_w: float = 5.6 * inch, max_h: float = 4.2 * inch):
    with Image.open(path) as im:
        w, h = im.size
    ratio = min(max_w / w, max_h / h, 1.0)
    return RLImage(str(path), width=w * ratio, height=h * ratio)


def build_pdf() -> Path:
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(name="ManualTitle", parent=styles["Title"], fontSize=25, leading=30, alignment=TA_CENTER, textColor=colors.HexColor("#4A3226")))
    styles.add(ParagraphStyle(name="ModuleTitle", parent=styles["Heading1"], fontSize=17, leading=22, textColor=colors.HexColor("#4A3226"), spaceAfter=8))
    styles.add(ParagraphStyle(name="LessonTitle", parent=styles["Heading2"], fontSize=13, leading=17, textColor=colors.HexColor("#4A3226"), spaceAfter=6))
    styles.add(ParagraphStyle(name="BodyManual", parent=styles["BodyText"], fontSize=10.1, leading=14, alignment=TA_LEFT, spaceAfter=7))
    styles.add(ParagraphStyle(name="LinkManual", parent=styles["BodyText"], fontSize=10.1, leading=14, textColor=colors.HexColor("#1F5E8C"), underline=True))
    story = [
        Paragraph("Manual Profesional de Diseño de Cejas", styles["ManualTitle"]),
        Paragraph("Versión renovada para formación inicial con enfoque profesional", styles["BodyManual"]),
        Spacer(1, 0.2 * inch),
        rl_image(generated_visual("cover", "Diseño de cejas sin complicaciones"), max_h=5.2 * inch),
        PageBreak(),
        Paragraph("Ruta de aprendizaje", styles["ModuleTitle"]),
    ]
    for module in MODULES:
        story.append(Paragraph(f"<b>{module.title}:</b> {module.subtitle}", styles["BodyManual"]))
    story.append(PageBreak())
    for module in MODULES:
        story.append(Paragraph(module.title, styles["ModuleTitle"]))
        story.append(Paragraph(module.subtitle, styles["BodyManual"]))
        for lesson in module.lessons:
            story.append(Paragraph(lesson.title, styles["LessonTitle"]))
            for paragraph_text in lesson.paragraphs:
                story.append(Paragraph(paragraph_text, styles["BodyManual"]))
            for item in lesson.bullets:
                story.append(Paragraph(f"- {item}", styles["BodyManual"]))
            for key in lesson.videos:
                label, url = VIDEO_LINKS[key]
                story.append(Paragraph(f'<link href="{url}">{label}</link>', styles["LinkManual"]))
            for img_path, _decision, _reason in lesson_images(lesson)[:3]:
                try:
                    story.append(rl_image(img_path))
                    story.append(Spacer(1, 0.08 * inch))
                except Exception:
                    pass
        story.append(PageBreak())
    story.append(Paragraph("Recursos en video", styles["ModuleTitle"]))
    for key in ["diseno", "visagismo", "depilacion", "henna", "laminado", "profundidad", "pelo_a_pelo", "mixtas"]:
        label, url = VIDEO_LINKS[key]
        story.append(Paragraph(f'<link href="{url}">{label}</link>', styles["LinkManual"]))
    pdf = SimpleDocTemplate(str(FINAL_PDF), pagesize=letter, rightMargin=0.75 * inch, leftMargin=0.75 * inch, topMargin=0.72 * inch, bottomMargin=0.72 * inch)
    pdf.build(story, onFirstPage=_pdf_watermark, onLaterPages=_pdf_watermark)
    return FINAL_PDF


def main() -> None:
    write_audits()
    print(build_docx())
    print(build_pdf())
    print(VISUAL_MANIFEST)
    print(COVERAGE_CSV)


if __name__ == "__main__":
    main()

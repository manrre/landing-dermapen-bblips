from __future__ import annotations

import csv
import re
from dataclasses import dataclass
from io import BytesIO
from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.opc.constants import RELATIONSHIP_TYPE as RT
from docx.shared import Inches, Pt, RGBColor
from PIL import Image, ImageEnhance, ImageFilter, ImageStat
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import Image as RLImage
from reportlab.platypus import PageBreak, Paragraph, SimpleDocTemplate, Spacer


WORKSPACE = Path(r"C:\Users\Usuario\Documents\New project")
SOURCE_DIR = WORKSPACE / "tmp_preferido_extract"
OUT_DIR = WORKSPACE / "artifacts" / "manual_diseno_cejas_final"
IMG_DIR = OUT_DIR / "imagenes_mejoradas"
OUT_DIR.mkdir(parents=True, exist_ok=True)
IMG_DIR.mkdir(parents=True, exist_ok=True)

RAW_DOCX = OUT_DIR / "manual_diseno_cejas_formacion_integral_raw.docx"
FINAL_DOCX = OUT_DIR / "manual_diseno_cejas_formacion_integral.docx"
FINAL_PDF = OUT_DIR / "manual_diseno_cejas_formacion_integral.pdf"
AUDIT_CSV = OUT_DIR / "auditoria_visual.csv"

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
class Module:
    title: str
    subtitle: str
    pages: list[int]
    body: list[str]
    checklist: list[str]
    videos: list[str]


MODULES = [
    Module(
        "1. Bienvenida y visión profesional",
        "Qué aprenderás y cómo usar este manual",
        [1, 2],
        [
            "Este manual está diseñado para guiarte paso a paso en el diseño profesional de cejas, desde la preparación del espacio hasta el acabado final. La intención es que puedas estudiar, practicar y aplicar un servicio claro, seguro y presentable.",
            "El diseño de cejas no consiste únicamente en retirar vello. Es un servicio que combina observación, técnica, higiene, comunicación con la clienta y criterio estético. Cada rostro exige una lectura distinta, por eso la práctica debe hacerse con método.",
            "A lo largo del manual encontrarás materiales, normas básicas, análisis del rostro, mapeo, correcciones, epilación, limpieza, henna y recomendaciones para fidelizar clientas.",
        ],
        [
            "Lee primero el módulo completo antes de practicar.",
            "Ten a mano tus materiales y trabaja siempre con higiene.",
            "Respeta la forma natural de cada ceja antes de proponer cambios.",
        ],
        [],
    ),
    Module(
        "2. Materiales, bioseguridad y presentación profesional",
        "La base de un servicio confiable",
        [3, 4, 5],
        [
            "Antes de atender, prepara tu mesa de trabajo con todos los insumos necesarios: algodón, cepillos desechables, champú neutro, gel calmante, loción astringente, exfoliante facial, línea de costura, lápiz dermatográfico, bolígrafo blanco, pinzas, tijeras, mascarilla, guantes, alcohol y papel desechable.",
            "La bioseguridad es el conjunto de cuidados que protege tanto a la profesional como a la clienta. Incluye limpieza del lugar, ventilación, desinfección de herramientas, uso de materiales descartables y lavado correcto de manos.",
            "La actitud profesional también comunica calidad. Presentación personal, uñas limpias, cabello recogido, trato amable, lenguaje claro y puntualidad hacen parte de la experiencia del servicio.",
            "Evita improvisar frente a la clienta. Un espacio ordenado y una profesional segura generan confianza incluso antes de empezar el diseño.",
        ],
        [
            "Desinfecta herramientas antes y después de cada atención.",
            "Usa materiales descartables cuando corresponda.",
            "Explica el procedimiento con palabras simples antes de empezar.",
        ],
        [],
    ),
    Module(
        "3. Conceptos básicos y crecimiento del vello",
        "Lenguaje, anatomía y tiempos de retorno",
        [6, 7, 8, 22],
        [
            "En el servicio profesional usamos tres conceptos diferentes: la diseñadora es quien ejecuta la técnica, diseñar es la acción de construir la forma, y el diseño es el resultado visible sobre las cejas.",
            "El vello nace en la dermis, donde se encuentra el folículo piloso. Su ciclo de crecimiento suele rondar los 15 días, por eso el retorno de una clienta debe respetar el tiempo natural del vello.",
            "Una ceja no debe retocarse todos los días ni depilarse sin criterio. Si se retira vello antes de tiempo, se puede debilitar la forma, crear huecos o retrasar una corrección que requiere paciencia.",
            "Como regla práctica, sugiere un retorno aproximado de 15 a 20 días, dependiendo del crecimiento de la clienta y del resultado que se busca mantener.",
        ],
        [
            "Distingue limpieza de diseño antes de vender el servicio.",
            "Observa el crecimiento del vello antes de retirar.",
            "Educa a la clienta sobre el tiempo correcto de retorno.",
        ],
        [],
    ),
    Module(
        "4. Visagismo y análisis inicial",
        "Leer el rostro antes de marcar",
        [9, 10, 11, 12],
        [
            "El primer paso para un diseño bien construido es analizar el rostro, la estructura natural de las cejas y el deseo de la clienta. A esto lo llamamos visagismo.",
            "Observa si las cejas son delgadas, gruesas, rectas, arqueadas, redondeadas, asimétricas o con zonas despobladas. No todas las cejas necesitan el mismo ajuste, y no todas las clientas quieren el mismo resultado.",
            "Cuando una ceja es muy delgada, conserva la mayor cantidad de vello posible. Cuando es muy gruesa, solo adelgaza con autorización de la clienta. La armonía se construye con pequeños cambios, no con retiros excesivos.",
            "Es normal que una ceja esté más alta, más baja o más llena que la otra. El diseño puede ayudar a equilibrar visualmente, pero no siempre puede corregir completamente diferencias naturales o estructurales.",
        ],
        [
            "Pregunta a la clienta qué resultado espera.",
            "No prometas simetría absoluta.",
            "Conserva vello cuando estés corrigiendo una ceja delgada.",
        ],
        ["visagismo"],
    ),
    Module(
        "5. Mapeo facial y diseño paso a paso",
        "Punto de inicio, línea central, grosor, final y arco",
        [13, 14, 15, 16, 17, 18, 19, 20],
        [
            "El mapeo facial permite construir un diseño más preciso. Se trabaja con líneas de referencia que conectan la nariz, los ojos, el nacimiento de la ceja, el arco y el final.",
            "Para encontrar el punto de partida, usa el puente de la nariz como referencia y traza una línea recta hacia la frente. Si la clienta tiene las cejas naturalmente más separadas, respeta su estructura y adapta el diseño.",
            "Después marca la línea central de la nariz hacia la frente. Esta línea ayuda a comparar medidas y a revisar si ambos lados mantienen una lógica proporcional.",
            "Para definir el grosor, traza una línea superior y una inferior. El objetivo no es hacer cejas idénticas, sino lograr un término medio que respete el rostro y el gusto de la clienta.",
            "El punto final se marca desde el puente de la nariz hacia la última pestaña del extremo externo del ojo. Evita dejar una cola demasiado larga o demasiado corta, porque la ceja enmarca la mirada.",
            "El arco se identifica observando dónde nace el vello más alto y entendiendo que el cuerpo de la ceja debe ser más largo que la cola. Desde ahí se conecta el diseño con suavidad.",
            "Cuando un punto alto está más arriba que el otro, puedes compensar de forma visual reduciendo o aumentando pequeñas medidas, siempre con prudencia y sin retirar más vello del necesario.",
            "Al final, conecta los puntos y redondea el diseño. Si las líneas convergen correctamente con la línea central, tendrás una base más equilibrada para iniciar la limpieza.",
        ],
        [
            "Marca antes de retirar vello.",
            "Revisa inicio, grosor, arco y final antes de depilar.",
            "Conecta puntos con líneas suaves, no rígidas.",
        ],
        ["diseno"],
    ),
    Module(
        "6. Diseño masculino",
        "Naturalidad, sutileza y respeto por la expresión",
        [21],
        [
            "En cejas masculinas el objetivo suele ser limpiar y ordenar sin adelgazar de más. Un diseño demasiado marcado puede cambiar la expresión natural del rostro.",
            "La regla principal es trabajar con sutileza. Retira excesos, conserva densidad y evita arquear la ceja salvo que el cliente lo pida de forma clara y consciente.",
            "Antes de iniciar, explica que el diseño masculino no busca una ceja dibujada, sino una apariencia más limpia, prolija y natural.",
        ],
        [
            "Evita adelgazar demasiado.",
            "No marques arcos pronunciados sin autorización.",
            "Prioriza limpieza y orden.",
        ],
        [],
    ),
    Module(
        "7. Epilación, depilación y recorte",
        "Técnicas para retirar vello con criterio",
        [23, 24, 25, 26],
        [
            "Antes de retirar vello, diferencia epilación y depilación. La epilación retira el vello desde la raíz; la depilación corta o elimina el vello de forma más superficial.",
            "Con pinzas, cada vello debe retirarse en la dirección en la que nace. Esto disminuye molestias, evita quiebres y ayuda a mantener la piel menos irritada.",
            "La cera fría se aplica sobre el vello y se retira en sentido contrario al crecimiento. Debe retirarse con decisión para evitar residuos y molestias innecesarias.",
            "Al recortar, solo se corta el exceso que sale de la línea de mapeo. Peina el vello hacia arriba y recorta con cuidado, siempre cerca de la línea, sin crear huecos.",
        ],
        [
            "Retira con pinza en dirección del crecimiento.",
            "Usa cera con prudencia en piel sensible.",
            "Recorta solo lo que sobresale del diseño.",
        ],
        ["depilacion"],
    ),
    Module(
        "8. Evaluación de piel, herramientas y limpieza",
        "Cuándo trabajar, cómo medir y cómo higienizar",
        [27, 28, 29, 30, 31],
        [
            "Antes de realizar un diseño, revisa si la piel está íntegra. Evita trabajar sobre heridas, irritaciones, descamaciones, dermatitis o lesiones visibles.",
            "El paquímetro ayuda a medir ancho, grosor y longitud de las cejas en milímetros y centímetros. Es una herramienta útil, pero no reemplaza el criterio: las medidas deben adaptarse al rostro de la clienta.",
            "El lápiz dermatográfico permite marcar el diseño. Mantén la punta fina para lograr líneas más limpias y precisas.",
            "Cuando una clienta pide limpieza, no siempre está pidiendo diseño. Limpieza significa retirar vellos fuera del dibujo natural; diseño implica mapeo, simetría visual y personalización.",
            "El saneamiento de cejas y pestañas elimina suciedad, polvo, polución y residuos acumulados. Una limpieza correcta mejora la experiencia y prepara la piel para el servicio.",
        ],
        [
            "No trabajes sobre piel lesionada.",
            "Usa medidas como guía, no como regla rígida.",
            "Aclara si la clienta quiere limpieza o diseño completo.",
        ],
        [],
    ),
    Module(
        "9. Henna para cejas",
        "Prueba alérgica, preparación, aplicación y acabado",
        [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
        [
            "La henna proviene de la planta Lawsonia Inermis y se utiliza para dar color y definición temporal a las cejas. En diseño de cejas ayuda a realzar la forma, llenar visualmente zonas claras y crear un acabado más pulido.",
            "Antes de aplicar henna, realiza prueba alérgica cuando la clienta tiene antecedentes de alergia, está embarazada, nunca se ha hecho el procedimiento o ha reaccionado a productos similares.",
            "La prueba puede hacerse en una zona discreta. Después de aplicar una pequeña cantidad, la clienta debe observar durante 24 horas si aparece picazón, enrojecimiento o cualquier reacción.",
            "Elige una henna de buena fijación, con variedad de tonos, sin plomo, sin amoníaco y preferiblemente no testada en animales. Evita productos de origen dudoso.",
            "Para preparar, mezcla una porción de henna con fijador hasta obtener una textura manejable. Deja reposar algunos minutos para activar mejor el pigmento.",
            "Durante la aplicación trabaja en partes pequeñas y corrige bordes de inmediato para evitar manchas. Puedes usar palito de naranjo o pincel preciso, según tu comodidad.",
            "El tiempo máximo de acción suele ser de 30 minutos. Para un efecto más natural, controla el tiempo y retira de forma gradual según la intensidad deseada.",
            "Al retirar, evita frotar con fuerza. Muestra el resultado a la clienta antes de terminar y confirma si el tono le parece adecuado.",
            "Para un efecto degradado u ombré, aclara suavemente el punto de inicio y deja el cuerpo de la ceja con mayor intensidad. Esto ayuda a que el resultado se vea más natural.",
        ],
        [
            "Realiza prueba alérgica cuando corresponda.",
            "Aplica en pequeñas secciones y corrige bordes rápido.",
            "Respeta el tiempo máximo de acción.",
            "Finaliza con acabado limpio para fotografía.",
        ],
        ["henna"],
    ),
    Module(
        "10. Atención al cliente y fotografía profesional",
        "Cómo crear confianza y mostrar resultados",
        [43, 44, 45, 46],
        [
            "La fidelización empieza desde el primer mensaje. Responde con amabilidad, haz preguntas claras, confirma la cita y acompaña a la clienta durante todo el proceso.",
            "Durante la atención, pregunta cómo se siente, explica cada paso y cuida los detalles. La clienta recuerda tanto el resultado como la experiencia.",
            "Las fotografías son parte de tu portafolio. Antes de tomar fotos o videos, pide permiso. Usa buena iluminación, limpia el área de trabajo y elige ángulos que favorezcan las cejas.",
            "Las fotos con ojos abiertos, buena luz y encuadre cercano suelen mostrar mejor el resultado. Editar con moderación puede ayudar, pero evita alterar el trabajo real.",
        ],
        [
            "Confirma la cita un día antes.",
            "Pide autorización antes de tomar fotos.",
            "Fotografía con buena luz y encuadre limpio.",
            "Muestra resultados reales, sin exagerar la edición.",
        ],
        [],
    ),
]


def clean_text_for_heading(text: str) -> str:
    text = re.sub(r"\s+", " ", text).strip()
    return text[:60]


def image_paths_for_pages(pages: list[int]) -> list[Path]:
    paths: list[Path] = []
    for page in pages:
        paths.extend(sorted(SOURCE_DIR.glob(f"page_{page:02d}_img_*.*")))
    return paths


def is_decorative_logo(path: Path) -> bool:
    if path.name in {"page_01_img_01.png", "page_01_img_02.png"}:
        return True
    if path.stat().st_size == 41402:
        return True
    try:
        with Image.open(path) as im:
            im = im.convert("RGB")
            w, h = im.size
            stat = ImageStat.Stat(im.resize((16, 16)))
            brightness = sum(stat.mean) / 3
            if w == h and brightness < 35 and path.stat().st_size < 55000:
                return True
    except Exception:
        return False
    return False


def cover_image_paths() -> list[Path]:
    preferred = [
        SOURCE_DIR / "page_13_img_03.jpg",
        SOURCE_DIR / "page_24_img_03.jpg",
        SOURCE_DIR / "page_28_img_04.png",
    ]
    return [path for path in preferred if path.exists()]


def enhance_image(path: Path) -> Path:
    out = IMG_DIR / f"{path.stem}_enhanced.png"
    if out.exists():
        return out
    with Image.open(path) as im:
        im = im.convert("RGB")
        if im.width < 900:
            ratio = 900 / max(im.width, 1)
            im = im.resize((900, int(im.height * ratio)), Image.Resampling.LANCZOS)
        elif im.width > 1800:
            ratio = 1800 / im.width
            im = im.resize((1800, int(im.height * ratio)), Image.Resampling.LANCZOS)
        im = ImageEnhance.Contrast(im).enhance(1.05)
        im = ImageEnhance.Sharpness(im).enhance(1.25)
        im = im.filter(ImageFilter.UnsharpMask(radius=1.1, percent=105, threshold=3))
        im.save(out, "PNG", optimize=True)
    return out


def make_visual_audit() -> dict[Path, str]:
    decisions: dict[Path, str] = {}
    rows = []
    for path in sorted(SOURCE_DIR.glob("page_*_img_*.*")):
        decision = "mejorar"
        action = "Escalar, ajustar contraste y nitidez."
        if is_decorative_logo(path):
            decision = "decorativa"
            action = "No insertar como contenido principal; usar nueva marca del manual."
        try:
            with Image.open(path) as im:
                size = f"{im.width}x{im.height}"
        except Exception:
            size = "error"
        page = path.name.split("_")[1]
        rows.append(
            {
                "pagina": page,
                "imagen": path.name,
                "tamano": size,
                "decision": decision,
                "accion": action,
            }
        )
        decisions[path] = decision
    with AUDIT_CSV.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["pagina", "imagen", "tamano", "decision", "accion"])
        writer.writeheader()
        writer.writerows(rows)
    return decisions


def add_hyperlink(paragraph, text: str, url: str):
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


def set_doc_styles(doc: Document) -> None:
    doc.styles["Normal"].font.name = "Aptos"
    doc.styles["Normal"].font.size = Pt(10.5)
    for name, size, color in [
        ("Title", 26, RGBColor(74, 50, 38)),
        ("Heading 1", 17, RGBColor(74, 50, 38)),
        ("Heading 2", 13, RGBColor(37, 72, 98)),
    ]:
        style = doc.styles[name]
        style.font.name = "Aptos Display"
        style.font.size = Pt(size)
        style.font.color.rgb = color
        style.font.bold = True


def setup_doc(doc: Document) -> None:
    section = doc.sections[0]
    section.top_margin = Inches(0.65)
    section.bottom_margin = Inches(0.65)
    section.left_margin = Inches(0.8)
    section.right_margin = Inches(0.8)
    header = section.header.paragraphs[0]
    header.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    run = header.add_run(BRAND)
    run.font.size = Pt(8.5)
    run.font.color.rgb = RGBColor(105, 105, 105)


def picture_stream(path: Path) -> BytesIO:
    with Image.open(path).convert("RGB") as im:
        bio = BytesIO()
        im.save(bio, "PNG")
        bio.seek(0)
        return bio


def add_image_grid_docx(doc: Document, paths: list[Path], decisions: dict[Path, str], max_images: int = 8) -> None:
    usable = [p for p in paths if decisions.get(p) != "decorativa"]
    for path in usable[:max_images]:
        enhanced = enhance_image(path)
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run = p.add_run()
        try:
            run.add_picture(picture_stream(enhanced), width=Inches(4.9))
        except Exception:
            continue


def build_docx(decisions: dict[Path, str]) -> Path:
    doc = Document()
    set_doc_styles(doc)
    setup_doc(doc)

    title = doc.add_paragraph()
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = title.add_run("Manual Profesional de Diseño de Cejas")
    r.bold = True
    r.font.size = Pt(26)
    r.font.color.rgb = RGBColor(74, 50, 38)

    sub = doc.add_paragraph()
    sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    sr = sub.add_run("Guía práctica para principiantes con enfoque técnico y profesional")
    sr.font.size = Pt(12)
    sr.font.color.rgb = RGBColor(80, 80, 80)

    cover_images = [p for p in cover_image_paths() if decisions.get(p) != "decorativa"]
    add_image_grid_docx(doc, cover_images, decisions, max_images=1)
    doc.add_page_break()

    doc.add_heading("Ruta de aprendizaje", level=1)
    for module in MODULES:
        p = doc.add_paragraph(style="List Bullet")
        p.add_run(module.title + ": ").bold = True
        p.add_run(module.subtitle)
    doc.add_page_break()

    for module in MODULES:
        doc.add_heading(module.title, level=1)
        sp = doc.add_paragraph(module.subtitle)
        sp.runs[0].italic = True
        sp.runs[0].font.color.rgb = RGBColor(90, 90, 90)

        for paragraph in module.body:
            p = doc.add_paragraph(paragraph)
            p.paragraph_format.line_spacing = 1.12
            p.paragraph_format.space_after = Pt(6)

        if module.videos:
            doc.add_heading("Video de apoyo", level=2)
            for key in module.videos:
                label, url = VIDEO_LINKS[key]
                vp = doc.add_paragraph(style="List Bullet")
                add_hyperlink(vp, label, url)

        doc.add_heading("Checklist de práctica", level=2)
        for item in module.checklist:
            doc.add_paragraph(item, style="List Bullet")

        add_image_grid_docx(doc, image_paths_for_pages(module.pages), decisions)
        doc.add_page_break()

    doc.add_heading("Recursos en video", level=1)
    doc.add_paragraph("Estos enlaces complementan la práctica del manual. Los primeros recursos acompañan directamente los módulos principales; los avanzados se incluyen para profundizar.")
    for key in ["diseno", "visagismo", "depilacion", "henna", "laminado", "profundidad", "pelo_a_pelo", "mixtas"]:
        label, url = VIDEO_LINKS[key]
        p = doc.add_paragraph(style="List Bullet")
        add_hyperlink(p, label, url)

    doc.add_paragraph()
    closing = doc.add_paragraph()
    closing.alignment = WD_ALIGN_PARAGRAPH.CENTER
    cr = closing.add_run(BRAND)
    cr.bold = True
    cr.font.color.rgb = RGBColor(74, 50, 38)

    doc.save(RAW_DOCX)
    return RAW_DOCX


def _pdf_watermark(canvas, _doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 9)
    canvas.setFillColor(colors.HexColor("#777777"))
    canvas.drawRightString(7.4 * inch, 10.35 * inch, BRAND)
    canvas.setFillColor(colors.Color(0.45, 0.45, 0.45, alpha=0.10))
    canvas.setFont("Helvetica-Bold", 36)
    canvas.translate(4.25 * inch, 5.5 * inch)
    canvas.rotate(38)
    canvas.drawCentredString(0, 0, BRAND)
    canvas.restoreState()


def rl_image(path: Path, max_w: float = 5.6 * inch, max_h: float = 4.1 * inch):
    with Image.open(path) as im:
        w, h = im.size
    ratio = min(max_w / w, max_h / h)
    return RLImage(str(path), width=w * ratio, height=h * ratio)


def build_pdf(decisions: dict[Path, str]) -> Path:
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(name="ManualTitle", parent=styles["Title"], fontSize=25, leading=30, alignment=TA_CENTER, textColor=colors.HexColor("#4A3226")))
    styles.add(ParagraphStyle(name="ModuleTitle", parent=styles["Heading1"], fontSize=17, leading=22, textColor=colors.HexColor("#4A3226"), spaceAfter=8))
    styles.add(ParagraphStyle(name="Sub", parent=styles["Normal"], fontSize=10.5, leading=14, textColor=colors.HexColor("#555555"), italic=True, spaceAfter=10))
    styles.add(ParagraphStyle(name="BodyManual", parent=styles["BodyText"], fontSize=10.2, leading=14.2, alignment=TA_LEFT, spaceAfter=7))
    styles.add(ParagraphStyle(name="LinkManual", parent=styles["BodyText"], fontSize=10.2, leading=14.2, textColor=colors.HexColor("#1F5E8C"), underline=True))

    story = [
        Paragraph("Manual Profesional de Diseño de Cejas", styles["ManualTitle"]),
        Paragraph("Guía práctica para principiantes con enfoque técnico y profesional", styles["Sub"]),
        Spacer(1, 0.25 * inch),
    ]
    cover_images = [p for p in cover_image_paths() if decisions.get(p) != "decorativa"]
    if cover_images:
        story.append(rl_image(enhance_image(cover_images[0]), max_h=5.2 * inch))
    story.append(PageBreak())

    story.append(Paragraph("Ruta de aprendizaje", styles["ModuleTitle"]))
    for module in MODULES:
        story.append(Paragraph(f"<b>{module.title}:</b> {module.subtitle}", styles["BodyManual"]))
    story.append(PageBreak())

    for module in MODULES:
        story.append(Paragraph(module.title, styles["ModuleTitle"]))
        story.append(Paragraph(module.subtitle, styles["Sub"]))
        for paragraph in module.body:
            story.append(Paragraph(paragraph, styles["BodyManual"]))
        if module.videos:
            story.append(Paragraph("<b>Video de apoyo</b>", styles["BodyManual"]))
            for key in module.videos:
                label, url = VIDEO_LINKS[key]
                story.append(Paragraph(f'<link href="{url}">{label}</link>', styles["LinkManual"]))
        story.append(Paragraph("<b>Checklist de práctica</b>", styles["BodyManual"]))
        for item in module.checklist:
            story.append(Paragraph(f"• {item}", styles["BodyManual"]))
        for path in [p for p in image_paths_for_pages(module.pages) if decisions.get(p) != "decorativa"][:6]:
            try:
                story.append(Spacer(1, 0.08 * inch))
                story.append(rl_image(enhance_image(path)))
            except Exception:
                continue
        story.append(PageBreak())

    story.append(Paragraph("Recursos en video", styles["ModuleTitle"]))
    for key in ["diseno", "visagismo", "depilacion", "henna", "laminado", "profundidad", "pelo_a_pelo", "mixtas"]:
        label, url = VIDEO_LINKS[key]
        story.append(Paragraph(f'<link href="{url}">{label}</link>', styles["LinkManual"]))
    story.append(Spacer(1, 0.25 * inch))
    story.append(Paragraph(f"<b>{BRAND}</b>", styles["BodyManual"]))

    pdf = SimpleDocTemplate(str(FINAL_PDF), pagesize=letter, rightMargin=0.75 * inch, leftMargin=0.75 * inch, topMargin=0.72 * inch, bottomMargin=0.72 * inch)
    pdf.build(story, onFirstPage=_pdf_watermark, onLaterPages=_pdf_watermark)
    return FINAL_PDF


if __name__ == "__main__":
    decisions = make_visual_audit()
    print(build_docx(decisions))
    print(build_pdf(decisions))

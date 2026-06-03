# Identidade Visual - Bee Decoração e Arte

Este documento detalha todos os elementos visuais, cores, tipografia e ativos gráficos que compõem a alma do projeto Bee Decoração e Arte.

---

## 1. Conceito e Atmosfera

O design é baseado no conceito de **"Midnight & Daylight Atelier"**, equilibrando o momento mágico da criação (noturno/cinemático) com a clareza da exposição dos produtos (diurno/transacional).

- **Atmosfera Principal:** Artesanal, afetiva, imersiva e premium.
- **Elementos Chave:** Hexágonos (colmeias), Partículas de Pólen (ouro), Transições Fluidas.

---

## 2. Paleta de Cores (The Bee Palette)

### 2.1. Cores Primárias
| Cor | Hex | Uso Principal |
| :--- | :--- | :--- |
| **Honey Gold** | `#F4B942` | Acentos, botões de ação, ícones de destaque e Mel (a abelha). |
| **Deep Royal Purple** | `#4B1366` | Fundo cinemático (Hero/Admin), textos em modo claro, rodapé. |
| **Soft Cream** | `#FFF7EA` | Fundo principal do site (Daylight), textos em modo escuro. |

### 2.2. Cores Secundárias
| Cor | Hex | Uso Principal |
| :--- | :--- | :--- |
| **Pastel Blue** | `#C8E6F0` | Seções secundárias, destaques suaves, asas da abelha. |
| **Honey Dark** | `#D49B22` | Hovers e gradientes no dourado. |
| **Soft Black** | `#111111` | Textos de alta legibilidade no catálogo. |

---

## 3. Tipografia Premium

| Fonte | Família | Uso |
| :--- | :--- | :--- |
| **Outfit** | Sans-Serif (Geométrica) | **Títulos (Headings)** — Moderna, editorial e impactante. |
| **Inter** | Sans-Serif | **Corpo (Body)** — Alta legibilidade, limpa e profissional. |

---

## 4. Elementos Gráficos e SVGs

### 4.1. Assistente "Mel" (Bee Assistant)
O ícone da Mel é um SVG customizado construído com componentes do Framer Motion.
- **Formas:** Círculos e elipses para o corpo, caminhos (paths) para as listras e sorriso.
- **Asas:** Gradiente linear (`#C8E6F0` para `white`) com animação de escala no eixo Y.
- **Localização do Código:** `src/components/bee-assistant.tsx` (Componente `MelBeeIcon`).

### 4.2. Geometria Hexagonal
- **Clip-Path:** Usado para criar formas de colmeia em imagens e decorativos.
  - `clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);`
- **Honeycomb Grid:** Padrão de fundo radial simulando uma colmeia.
  - `radial-gradient(circle at 2px 2px, rgba(244, 185, 66, 0.1) 1px, transparent 0);`

### 4.3. Ícones
- **Biblioteca:** `lucide-react`.
- **Estilo:** Traços finos (stroke width 2), minimalistas e modernos.

---

## 5. Efeitos de Interface (UI/UX)

- **Scrollbar Customizada:** 
  - Thumb: `rgba(244, 185, 66, 0.3)` que se torna `100% opacity` no hover.
  - Track: Transparente para manter o fundo limpo.
- **Glassmorphism:** Uso intensivo de `backdrop-blur` com bordas semitransparentes em modais e headers.
- **Glow Dourado:** Aplicação de `drop-shadow` e `text-shadow` em elementos críticos como a Logo e títulos no modo Midnight.

---

## 6. Ativos de Imagem (Diretórios)

- **`public/`**: Logos base e SVGs estruturais do Next.js.
- **`public/pics/`**: Fotos institucionais, artesãs e peças de destaque.
- **`Cloudinary`**: Hospedagem dinâmica para o catálogo de produtos (Firestore).

---
*Este guia garante que cada novo pixel adicionado ao Bee Decoração e Arte mantenha a essência artesanal da marca.*

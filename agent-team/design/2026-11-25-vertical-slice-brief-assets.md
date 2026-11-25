# Asset List: Vertical Slice — The Workshop + The Paper Woods World

- **Status:** List approved with brief revision 3 on 2026-11-25. Each generated asset still needs individual owner approval before Tech uses it. (Revision 3: drag-and-drop folding, packing screen, mini-level checkpoints, Space/X/Tab keycaps)
- **Brief:** [`2026-11-25-vertical-slice-brief.md`](2026-11-25-vertical-slice-brief.md)
- **Rules:** `agent-team/skills/art-design-lead/SKILL.md` → *Asset List and Sourcing*
- **Generation tools:** Codex and Gemini, used interchangeably (owner decision D6).

## How to Use This List

1. **Make one style anchor per tool first.** Generate `anchor-style` (below) in Codex and in Gemini. Choose the one you like, and attach it as a reference image to every later prompt in **both** tools. This keeps the two tools' output looking like one game.
2. **Keep each family in one tool.** The *Tool* column assigns a tool per asset family so related assets match: characters and enemies in Codex (the GDD mock-up was made in Codex), world, tiles, crafts and folding in Gemini, UI in Codex. Swap a whole family if you prefer; avoid splitting one family across tools.
3. **Every prompt = Style Lock + the row's prompt.** Paste the Style Lock first.
4. Save files to the *Path* column, and record the tool, model and date in `assets/CREDITS.md` as AI-generated. Set status to `generated - awaiting owner`; only you mark `approved`.

## Sourcing Record

- **Threadbare** (CC-BY-SA 4.0 art): excluded by project rule; nothing is taken from it.
- **Fonts:** IM Fell English and EB Garamond from Google Fonts, both SIL Open Font License; verify the license pages when importing.
- **Art search still to do:** before generating art rows, check OpenGameArt, Kenney, itch.io (free, with stated license) and game-icons.net (CC-BY 3.0), and note matches here. Kenney's top-down sets are flat colour vector art and likely don't match the inked-parchment style; confirm when searching.
- Imported open-source files go to `assets/third-party/<name>/` with their license file and an entry in `assets/CREDITS.md`.

## Style Lock

Paste this at the start of **every** prompt:

> Hand-inked storybook illustration on aged cream parchment, fine dip-pen line work with crosshatching and stippled shading, everything made of folded paper with visible crease lines, top-down three-quarter view, limited palette of parchment cream (#EFE4C8), ink black (#2B2622), ink grey (#77706A) and warm lantern amber (#E2A03A) used only for safe or focus elements; no green; no text; clean silhouette readable at small size; game asset, isolated on a transparent background.

## P0 — Needed for the Slice

### Style anchor

| ID | Asset | Spec | Tool | Prompt (after the Style Lock) | Path | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `anchor-style` | One reference scene for both tools | 1024×1024 | Codex **and** Gemini | A small scene: a grumpy old papersmith with spectacles standing beside a paper river, one origami pine tree, a folded paper boat on the water, a small workbench glowing amber. Use a parchment background instead of transparency for this one. | `assets/generated/anchor/style-anchor-<tool>.png` | needed |

### Characters and enemies (Codex)

| ID | Asset | Spec | Tool | Prompt (after the Style Lock) | Path | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `player-papersmith` | The Papersmith | 48×48 frames, PNG sheet: 4 directions × idle (2), walk (4), ruler strike (3), hop (3), hurt (1) | Codex | Sprite sheet of a grumpy elderly papersmith with round spectacles, bushy white beard, furrowed eyebrows, long grey work coat, wooden ruler at his belt; four facing directions; rows for idle, walk, ruler swing, hop, hurt; consistent proportions across frames. | `assets/generated/characters/papersmith.png` | needed |
| `player-folding` | The Papersmith folding at the bench (fold screen and cutscenes) | 96×96, 3 frames | Codex | The same papersmith seen from the front, hunched over a sheet of paper, creasing it carefully with a bone folder, tongue out in concentration, three frames. | `assets/generated/characters/papersmith-folding.png` | needed |
| `hud-portrait` | Portrait for the hearts panel | 64×64 | Codex | Head-and-shoulders portrait of the same grumpy papersmith in a circular frame, scowling over his spectacles. | `assets/generated/ui/portrait.png` | needed |
| `enemy-mothling` | Mothling (ground pest) | 32×32: walk 4, hit 1 | Codex | Small crawling moth made of grey paper, triangular wings, tiny white eyes, nibbling posture. | `assets/generated/enemies/mothling.png` | needed |
| `enemy-soot-mote` | Soot Mote (flying pest) | 24×24: fly 3 | Codex | Tiny spiky ball of black soot with two small white eyes, fuzzy ink-scribble edges, hovering. | `assets/generated/enemies/soot-mote.png` | needed |
| `boss-moth-queen` | Moth Queen | 128×128: fly 4, telegraph 1, dive 1, grounded 2, defeated 1 | Codex | Large regal moth of grey folded paper, big round patterned wings with eye spots, small folded paper crown; states: flying, wings raised before a dive, diving, grounded with wings drooped and outlined in amber, defeated and crumpled. | `assets/generated/enemies/moth-queen.png` | needed |

### World map and levels (Gemini)

| ID | Asset | Spec | Tool | Prompt (after the Style Lock) | Path | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `map-woods` | Paper Woods world map background | 960×640 | Gemini | An overhead map of a paper forest region drawn on parchment, a dashed fold-line path winding left to right from a small workshop on a hill, through a hollow, a dense thicket, a long torn crease in the land, to a dark bower of paper trees; empty spots along the path where level markers will sit. Use a parchment background instead of transparency. | `assets/generated/map/woods-map.png` | needed |
| `map-nodes` | Level markers and mini-level dots | 32×32: locked, open, current (amber), completed (stamped); boss node 48×48; dots 8×8 (empty/filled) | Gemini | Small folded paper pennant flags on pins as map markers: grey locked, cream open, amber-lit current, and one stamped with an ink check mark; a larger flag with a moth silhouette for the boss level; tiny round paper dots, empty and inked, to show mini-level progress. | `assets/generated/map/nodes.png` | needed |
| `tiles-woods` | Ground, dashed path, paper tree, crumpled boulder | 32×32 tileset | Gemini | Tileset: plain parchment ground with faint grid; ground with a dashed fold-line path (straight, corner, T, cross); origami paper pine tree, folded triangle with one hatched side; crumpled paper boulder. | `assets/generated/tiles/woods.png` | needed |
| `tiles-thicket` | Denser variant for 1-2 and 1-3 | 32×32 tileset | Gemini | Darker, denser version of the paper forest tileset: clustered origami trees, hanging paper vines, more hatching, narrower paths. | `assets/generated/tiles/thicket.png` | needed |
| `tiles-water` | River water, animated | 32×32, 3-frame loop, edge variants | Gemini | Calm river tiles as pale grey-washed paper with inked ripple strokes; three animation frames; edge and corner tiles with an inked bank line. | `assets/generated/tiles/water.png` | needed |
| `tiles-chasm` | Gap in the page | 32×32, edge variants | Gemini | A torn gap in the paper ground revealing dark crosshatched depth; torn-paper edges on the top and sides; tileable. | `assets/generated/tiles/chasm.png` | needed |
| `tiles-ledge` | Raised paper ledge | 32×32, top + front-face variants | Gemini | A raised paper platform, lighter cream top surface, front face shown as a folded-down paper flap with hatched shadow beneath. | `assets/generated/tiles/ledge.png` | needed |
| `tiles-workshop` | Workshop floor and walls | 32×32 | Gemini | Interior of a ransacked paper workshop: inked plank floor, folded-paper walls held with giant paperclips, scattered scraps. | `assets/generated/tiles/workshop.png` | needed |
| `tiles-bower` | Moth Queen arena | 32×32 tileset | Gemini | A clearing ringed by tall grey paper trees draped in dusty cobweb-like paper strands, scattered moth-chewed scraps on the ground. | `assets/generated/tiles/bower.png` | needed |

### Props (Gemini)

| ID | Asset | Spec | Tool | Prompt (after the Style Lock) | Path | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `prop-workbench` | Workbench (mini-level checkpoint) | 64×48: idle, glow, checkpoint reached | Gemini | Small wooden workbench with a bone folder, a stack of paper and a brass lantern; a small folded paper pennant on a pin beside it, grey when unreached and lit warm amber once reached. | `assets/generated/props/workbench.png` | needed |
| `prop-diagram` | Fold diagram page (unlock item) | 32×32, 2-frame glint | Gemini | A single page of folding instructions with dashed crease lines and arrows (no readable text), slightly curled at the corner, held by a giant paperclip. | `assets/generated/props/diagram.png` | needed |
| `prop-sheet` | Loose sheet pickup | 24×24, 2-frame flutter | Gemini | A single loose sheet of cream paper with one corner folded, fluttering slightly. | `assets/generated/props/sheet.png` | needed |
| `prop-note` | Pinned hint note | 24×32 | Gemini | A small paper note pinned to a stick with a giant paperclip, scribbled ink lines suggesting handwriting (no readable text). | `assets/generated/props/note.png` | needed |
| `prop-clue-tag` | Clue 1: leaf-stamped tag | 24×24 + glint frame | Gemini | A paper luggage tag with string, stamped with a single leaf shape in black ink (no green), slightly worn. | `assets/generated/props/clue-tag.png` | needed |
| `prop-gate` | Level exit and arena gate | 32×96, open + closed | Gemini | A gate of folded paper panels clipped together with giant paperclips; open and closed states. | `assets/generated/props/gate.png` | needed |

### Crafts and folding (Gemini)

| ID | Asset | Spec | Tool | Prompt (after the Style Lock) | Path | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `craft-boat` | Paper Boat: slot icon + ridden boat | Icon 48×48; in-world 48×32; worn variant | Gemini | Classic folded paper boat with crisp creases; a second version slightly soggy and torn at the hull. | `assets/generated/crafts/boat.png` | needed |
| `craft-frog` | Paper Frog: icon + hop frames | Icon 48×48; 3 hop frames | Gemini | Origami jumping frog of folded paper: crouched, mid-leap, landing. | `assets/generated/crafts/frog.png` | needed |
| `craft-fan` | Pleated Fan: icon + gust | Icon 48×48; gust cone 96×64, 3 frames | Gemini | Pleated paper hand fan, open; a separate cone of wind drawn as curling ink strokes. | `assets/generated/crafts/fan.png` | needed |
| `craft-dart` | Paper Dart: icon | 48×48 | Gemini | Folded paper dart with a sharp nose, in flight. | `assets/generated/crafts/dart.png` | needed |
| `fold-steps-boat` | Fold screen: Boat sequence | 256×256 per step, 5 images (flat sheet + 4 folds) | Gemini | A square sheet of cream paper seen from above, being folded into a paper boat, step N of 4: show the paper after this fold with the crease just made in ink, the next crease as a dashed line, and a faint ghost outline of where the flap will land. Keep the sheet centred and the same size in every step. Also provide the moving flap as a separate layer so it can be dragged. | `assets/generated/folding/boat-steps.png` | needed |
| `fold-steps-frog` | Fold screen: Frog sequence | 256×256 per step, 6 images | Gemini | Same as above, folding an origami jumping frog, step N of 5. | `assets/generated/folding/frog-steps.png` | needed |
| `fold-steps-fan` | Fold screen: Fan sequence | 256×256 per step, 4 images | Gemini | Same as above, accordion-pleating a sheet into a hand fan, step N of 3. | `assets/generated/folding/fan-steps.png` | needed |
| `fold-steps-dart` | Fold screen: Dart sequence | 256×256 per step, 5 images | Gemini | Same as above, folding a paper dart, step N of 4. | `assets/generated/folding/dart-steps.png` | needed |

### FX and UI (Codex)

| ID | Asset | Spec | Tool | Prompt (after the Style Lock) | Path | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `fx-set` | Poof, crinkle (wrong fold), nibble, dust cloud | 48×48, 3–4 frames each | Codex | Effects sheet: paper confetti poof; a sheet crinkling and springing back; small torn-paper bite marks; billowing dust cloud of grey crosshatching. | `assets/generated/fx/fx.png` | needed |
| `hud-kit` | Hearts, satchel slot frames, sheet icon, keycaps, speech bubble, amber caret, step dots, drag cursor and handle | Hearts 24×24 (full/empty); slot 64×64 (normal/selected/torn/drop-target); keycaps 32×32 (wide 64×32) | Codex | UI kit: paper hearts (filled ink / outline); square paper satchel slot frames (normal, amber-outlined selected, torn-corner damaged, dashed drop-target); small sheet icon; blank paper keycaps (one wide for Space and Tab); paper speech bubble; small amber downward caret; filled and empty step dots; an inked hand cursor (open and grabbing); a small glowing amber grab handle. | `assets/generated/ui/hud-kit.png` | needed |
| `ui-panels` | Workbench panel, fold-screen frame, packing-screen shelf, title and end cards | 9-slice panel 96×96; cards 960×640 | Codex | Parchment panel with a double inked border for 9-slice use; a workbench tabletop frame seen from above for the folding screen; a wooden shelf with pegs holding folded crafts, for the packing screen; title card of the papersmith at his workbench under lantern light; end card of fine paper bundled on the workbench. | `assets/generated/ui/panels.png` | needed |

### Fonts (open source)

| ID | Asset | Source | License | Path | Status |
| --- | --- | --- | --- | --- | --- |
| `font-title` | Storybook title font | IM Fell English, Google Fonts | SIL OFL 1.1 (verify) | `assets/third-party/im-fell-english/` | needed |
| `font-ui` | Readable UI text | EB Garamond, Google Fonts | SIL OFL 1.1 (verify) | `assets/third-party/eb-garamond/` | needed |

## P1 — Nice to Have

| ID | Asset | Spec | Tool | Prompt (after the Style Lock) | Path | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `deco-woods` | Fallen paper leaves, scraps, paperclips | 16–32 px | Gemini | Scattered decoration sprites: fallen paper leaves (grey and cream), torn scraps, a bent giant paperclip. | `assets/generated/props/deco.png` | needed |
| `map-token` | Papersmith walking on the world map | 24×24, walk 2 | Codex | A tiny chibi version of the grumpy papersmith walking, for a map token. | `assets/generated/map/token.png` | needed |

## Not in This List

Audio (crease snaps, wrong-fold crinkle, ruler thwack, map footsteps, music-box theme) is not an image asset and needs its own sourcing pass under the same open-source-first and credit rules.

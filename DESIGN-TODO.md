# Datum: spec to-do

Things the apps needed that `DESIGN.md` (v0.5) does not define, or where an app had to bend it.
Collected while moving Wetware onto DatumKit. Each item says what was needed, what the app did
meanwhile, and the decision wanted. Tick an item when `DESIGN.md` answers it (and note the version),
then DatumKit can drop its workaround.

## Missing atoms

- [x] **Checkbox / multi-select list.** *(v0.6, §16.1l)* Need: pick several apps from a list ("Capture while these
  apps have a window"). Now: one settings row per item with a toggle. Decide: toggle rows are the
  rule, or define a checkbox atom for long lists.
- [x] **Stepper / value from presets.** *(v0.6, §16.3, no atom)* Need: "Smaller after 14 days". Now: a menu button showing
  the current value, listing the presets. Decide: keep that as the rule.
- [x] **Slider.** *(v0.6, §16.1m)* Need: "Lower by 10–100 %". Now: a menu button with 5 % steps. Decide: define a
  slider (sharp track, ink thumb, tick marks?) or state that continuous values use menu buttons.
- [x] **Segmented control.** *(v0.6, §16.1n)* Need: choosing one of 2–4 kinds (an owner command's kind). Now: a menu
  button. Decide: define a segmented control or keep menu buttons.
- [x] **Progress bar.** *(v0.6, §16.1o)* Need: a model download. Now: the tick meter (§9). Decide: tick meter as
  the progress form, with how it shows "indeterminate".
- [x] **Multi-line text area.** *(v0.6, §16.1h)* Need: free notes. Now: a hand-drawn box in the text-field style
  (§16.1h). Decide: define it (min height, resize, scroll).
- [x] **Secure field with reveal.** *(v0.6, §16.1h)* Need: an API key. Now: hand-drawn field with a reveal button.
  Decide: define it, including the reveal control.
- [x] **Removable chip.** *(v0.6, §16.1p)* Need: a language that can be removed. Now: a tag plus an × button.
  Decide: define one atom, or say a tag with a remove button is the form.
- [x] **Row with an edit action.** *(v0.6, §16.1q)* Need: a list row that is selected and edited in place (owner
  commands). Now: a tap gesture on a list row. Decide: how a row shows "selected" and "editing".

## Rules to add

- [x] **A long control in a settings row.** *(v0.6, §16.3)* A button such as "Open System Settings" next to a
  status pill squeezes the hint to a narrow column. Decide: at which width the control wraps
  below the hint.
- [x] **Category colours.** *(v0.6, §4.7, 16.1r)* Speakers and groups need several distinguishable colours with no state
  meaning. Now: the app's own palette. Decide: a small category set in §4 (moss is one), or
  "categories never use colour; use letters or marks".
- [x] **Alert-coloured hints.** *(v0.6, §16.1a)* §16.1h says an error hint is `alert`; the text roles (§16.1a) list
  only `warning`. Decide: add `alert` to the `hint` role.
- [x] **Meters and signal.** *(v0.6, §16.3)* A model card with three lit signal-coloured meters breaks "signal at
  most about 5 % of a view" (§3.5). Decide: tick meters draw in ink, signal only for the current
  or primary one.
- [x] **Smallest readout.** *(v0.6, §16.1a)* The spec has `h1` (48) and `display` (120) only. A compact rack needs
  something smaller (the kit uses 28, `h2`). Decide: allow `h2` readouts.
- [x] **State cues in controls.** *(v0.6, §16.3)* An icon button turns `alert` while Shift is held (delete
  becomes "delete without asking"). Decide: allowed, or the cue is a label instead.
- [x] **Stacked-bar charts.** *(v0.6, §16.3)* A storage bar splits into parts. Now: ink opacity steps, no state
  colours (§4.7). Decide: confirm, or define a chart palette.

## Open

- [ ] Final name for the system (from `DESIGN.md`, Open decisions).
- [ ] Statement grotesk: Helvetica Neue vs a licensed face (same).

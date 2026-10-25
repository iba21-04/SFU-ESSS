# OpFair website (draft)

Static site migrated from Wix. No build step.

## Files
- `index.html` – all sections (Hero, Sponsors, Impact, About, ESSS, Schedule, Gallery, Team, Contact, Map)
- `styles.css` – theme variables at the top (`:root`)
- `script.js` – gallery slider, Web3Forms submit, stat count-up

## Run locally
    python3 -m http.server 8000
then open http://localhost:8000

## Things to fill in
- Sponsors: put logos in `assets/sponsors/` (e.g. `osensa.svg`) and replace the `COMPANY` tiles.
- Schedule: times in `#schedule` are placeholders.
- Team: duplicate the `.card` block; swap `.card__photo` for an `<img>`.
- Impact/About copy: replace placeholder history text.
- Gallery & logos currently hotlink Wix CDN images; download them to `assets/` before cancelling Wix.
- Map uses a keyless Google Maps embed. To use the JS API instead, you need an API key.
- Contact form posts to Web3Forms (access key is in the form; it is a public key).

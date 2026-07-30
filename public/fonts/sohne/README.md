Drop the Söhne test-version woff2 files here, downloaded from:
https://klim.co.nz/fonts/soehne/

Expected filenames (rename Klim's download to match, or update the
@font-face src paths in src/styles/globals.css if you'd rather keep
their original names):

  soehne-buch.woff2              (weight 400 / Regular)
  soehne-kraftig.woff2           (weight 500 / Medium)
  soehne-halbfett.woff2          (weight 600 / Semibold)
  soehne-dreiviertelfett.woff2   (weight 700 / Bold)
  soehne-fett.woff2              (weight 800 / Extrabold)

Until these files exist, the site falls back to Manrope automatically
(font stack: 'Söhne', 'Manrope', Arial, sans-serif) — nothing breaks
in the meantime.

Reminder: this is the free TEST version, licensed for trying the
typeface, not for shipping in production. Before the site goes live,
this needs to be swapped for a proper desktop + web license from Klim.

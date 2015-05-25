import parseClockValue from '../publication/parser/extract/parse-clock-value';

const SKIPPABLES =[
  "sidebar", "practice", "marginalia", "annotation", "help", "note", "footnote", "rearnote",
  "table", "table-row", "table-cell", "list", "list-item", "pagebreak"
];
const ESCAPABLES = [
  "sidebar", "bibliography", "toc", "loi", "appendix", "landmarks", "lot", "index",
  "colophon", "epigraph", "conclusion", "afterword", "warning", "epilogue", "foreword",
  "introduction", "prologue", "preface", "preamble", "notice", "errata", "copyright-page",
  "acknowledgments", "other-credits", "titlepage", "imprimatur", "contributors", "halftitlepage",
  "dedication", "help", "annotation", "marginalia", "practice", "note", "footnote", "rearnote",
  "footnotes", "rearnotes", "bridgehead", "page-list", "table", "table-row", "table-cell", "list",
  "list-item", "glossary"
];

export default function buildMediaOverlayData(metadata, smil) {
  return {
    activeClass: metadata.mediaActiveClass,
    escapables: ESCAPABLES,
    duration: parseClockValue(metadata.mediaDuration),
    narrator: metadata.mediaNarrator,
    // playbackActiveClass: metadata.mediaPlaybackActiveClass,
    skippables: SKIPPABLES,
    smil_models: smil
  };
}

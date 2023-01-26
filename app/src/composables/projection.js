export const ORIGIN = window.location.origin;
export const PATHNAME = window.location.pathname.replace(
  "/control",
  "/projection"
);

export const PROJECTION_URL = `${ORIGIN}${PATHNAME}`;

/**
 *
 * @param {string} mode Default is projection.
 * @returns {URL}
 */
export function url(mode = "projection") {
  return new URL(`${PROJECTION_URL}?mode=${mode}`);
}

export function open(mode = "projection") {
  window.open(`${PROJECTION_URL}?mode=${mode}`, mode);
}

export default function useProjection() {
  return {
    ORIGIN,
    PATHNAME,
    PROJECTION_URL,
    url,
    open,
  };
}

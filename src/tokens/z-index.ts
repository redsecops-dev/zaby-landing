/** Zaby z-index scale — numeric values for programmatic use. */
export const zIndex = {
  base: 0,
  raised: 10,
  dropdown: 100,
  sticky: 200,
  modal: 300,
  toast: 400,
} as const;

export type ZIndexToken = keyof typeof zIndex;

// Her kan du samle små util-funktioner hvis nødvendigt
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

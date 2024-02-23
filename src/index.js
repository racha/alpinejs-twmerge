import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export default function (Alpine) {
  Alpine.magic("twMerge", (el) => {
    return (value) => {
      return twMerge(clsx(value));
    };
  });
  Alpine.directive("twmerge", (el, { expression }, { evaluate, effect }) => {
    const originalClasses = el.className;
    effect(() => {
      el.className = twMerge(clsx([originalClasses, evaluate(expression)]));
    });
  });
}

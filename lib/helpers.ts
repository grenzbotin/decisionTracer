export function getUniqueNumber(): string {
    const date = new Date();
    return date.valueOf().toString();
  }

export function scrollToTargetOffset(id: string): void {
    const element = document.getElementById(id);
    const headerOffset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
    });
}
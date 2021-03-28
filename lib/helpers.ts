export function getUniqueNumber(): string {
    const date = new Date();
    return date.valueOf().toString();
  }

export function scrollToTargetOffset(id: string): void {
    const element = document.getElementById(id);
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset;

    window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
    });
}
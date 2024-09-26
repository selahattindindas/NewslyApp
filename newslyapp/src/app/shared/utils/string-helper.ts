export class StringHelper {
    static convertToSlug(value: string): string {
      return value
        .toLowerCase()
        .replace(/[çÇ]/g, 'c')
        .replace(/[ğĞ]/g, 'g')
        .replace(/[ıİ]/g, 'i')
        .replace(/[öÖ]/g, 'o')
        .replace(/[şŞ]/g, 's')
        .replace(/[üÜ]/g, 'u')
        .replace(/[^a-z0-9]+/g, '-') 
        .replace(/^-+|-+$/g, '');
    }
  }
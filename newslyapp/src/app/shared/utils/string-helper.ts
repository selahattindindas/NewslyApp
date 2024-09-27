export class StringHelper {
    static convertToSlug(title: string, id?: number): string {
      const slugTitle = title
        .toLowerCase()
        .replace(/[çÇ]/g, 'c')
        .replace(/[ğĞ]/g, 'g')
        .replace(/[ıİ]/g, 'i')
        .replace(/[öÖ]/g, 'o')
        .replace(/[şŞ]/g, 's')
        .replace(/[üÜ]/g, 'u')
        .replace(/[^a-z0-9]+/g, '-') 
        .replace(/^-+|-+$/g, '');

        return id ? `${slugTitle}-p-${id}` : slugTitle;
    }
  }
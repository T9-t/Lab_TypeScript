interface Repository<T extends { id: string }> {
  create(item: T): T;
  findById(id: string): T | undefined;
  update(id: string, changes: Partial<Omit<T, "id">>): T | undefined;
  delete(id: string): boolean;
}

class MemoryRepository<T extends { id: string }> implements Repository<T> {
  private readonly storage = new Map<string, T>();

  create(item: T): T {
    if (this.storage.has(item.id)) {
      throw new Error(`Сущность с id "${item.id}" уже существует.`);
    }
    const storedItem = { ...item };
    this.storage.set(item.id, storedItem);
    return { ...storedItem };
  }

  findById(id: string): T | undefined {
    const item = this.storage.get(id);
    return item ? { ...item } : undefined;
  }

  update(id: string, changes: Partial<Omit<T, "id">>): T | undefined {
    const existing = this.storage.get(id);
    if (!existing) {
      return undefined;
    }
    const updatedItem: T = {
      ...existing,
      ...changes,
      id: existing.id,
    };
    this.storage.set(id, updatedItem);
    return { ...updatedItem };
  }

  delete(id: string): boolean {
    return this.storage.delete(id);
  }
}


type Book = {
  id: string;
  title: string;
};
const bookRepo: Repository<Book> = new MemoryRepository<Book>();

const createdBook = bookRepo.create({
  id: "1",
  title: "Чистый код"
});

try {
  bookRepo.create({
    id: "1",
    title: "Дубликат"
  });
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
console.log(bookRepo.findById("1"));
console.log(bookRepo.findById("999"));

console.log(bookRepo.update("1", { title: '1234' }));
console.log(bookRepo.update("999", { title: '12' }));

console.log(bookRepo.delete("1"));
console.log(bookRepo.delete("1"));
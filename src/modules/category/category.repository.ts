import { eq } from "drizzle-orm";
import { db } from "src/database/drizzle";
import { categories } from "./category.schema";
import { ICategory } from "./category.type";
export class CategoryRepository {
  async createCategory(name: string, description: string) {
    const result = await db.insert(categories).values({
      name,
      description
    });
    return result;
  }
  async getAllCategories(): Promise<ICategory[]> {
    const result = await db.select().from(categories);
    return result;
  }
  async getCategoryById(id: number): Promise<ICategory | undefined> {
    const result = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id));
    return result[0];
  }
  async updateCategoryById(id: number, name: string, description: string) {
    const result = await db
      .update(categories)
      .set({ name, description })
      .where(eq(categories.id, id));
    return result;
  }
  async deleteCategoryById(id: number) {
    const result = await db
      .delete(categories)
      .where(eq(categories.id, id));
    return result;
  } 
}

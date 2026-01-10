import { CategoryRepository } from "./category.repository";
import categoryValidationSchema from "./category.validation";
import ExptectedError from "#shared/errors/errorHandler";
// import redis from "#config/redis";

export const categoryCacheKey = "categories:all";

class CategoryServices {
  constructor(private categoryRepository: CategoryRepository) {
    this.categoryRepository = new CategoryRepository();
  }

  async createCategory(name: string, description: string) {
    const validated = categoryValidationSchema.validate({ name, description });
    if (!validated) throw new ExptectedError("validation failed", 400);
    
    const newCategory = await this.categoryRepository.createCategory(
      name,
      description
    );

    // await redis.del(categoryCacheKey);
    return newCategory;
  }
  async getAllCategories() {
    // const cachedCategories = await redis.get(categoryCacheKey);
    // if (cachedCategories) {
    //   return JSON.parse(cachedCategories);
    // }
    const categories = await this.categoryRepository.getAllCategories();
    // await redis.set(categoryCacheKey, JSON.stringify(categories), 'EX', 3600);

    return categories;
  }

  async getCategoryById(id: number) {
    const category = await this.categoryRepository.getCategoryById(id);
    return category;
  }
  async updateCategoryById(id: number, name: string, description: string) {
    const updatedCategory = await this.categoryRepository.updateCategoryById(
      id,
      name,
      description
    );
    // await redis.del(categoryCacheKey);
    return updatedCategory;
  }
  async deleteCategoryById(id: number) {
    // await redis.del(categoryCacheKey);
    return await this.categoryRepository.deleteCategoryById(id);
  }
}

export default CategoryServices;

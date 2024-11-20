import { PrismaClient } from '@prisma/client';


async function main() {
  const prisma = new PrismaClient();
   // Crear usuario de prueba


   // Crear categorías de prueba
   const categories = await prisma.category.createMany({
       data: [
           { name: 'Electrónica' },
           { name: 'Hogar' },
           { name: 'Juguetes' },
           { name: 'Ropa' },
       ],
   });

   console.log(`${categories.count} categorías insertadas`);

   // Recuperar las categorías creadas para asociarlas a los productos
   const allCategories = await prisma.category.findMany();

   // Crear productos de prueba, asociándolos al usuario y a una categoría
   const products = await prisma.product.createMany({
       data: [
           {
             name: 'Televisor LED', price: 299.99, userId: "cm2z7o6q60000wdfps8prev7a", categoryId: allCategories[0].id,
             description: "Lorem ipsum description"
           },
           {
             name: 'Aspiradora', price: 149.99, userId: "cm2z7o6q60000wdfps8prev7a", categoryId: allCategories[1].id,
             description: "Lorem ipsum description"
           },
           {
             name: 'Lego Star Wars', price: 49.99, userId: "cm2z7o6q60000wdfps8prev7a", categoryId: allCategories[2].id,
             description: "Lorem ipsum description"
           },
           {
             name: 'Camiseta Deportiva', price: 19.99, userId: "cm2z7o6q60000wdfps8prev7a", categoryId: allCategories[3].id,
             description: "Lorem ipsum description"
           },
           {
             name: 'Laptop', price: 799.99, userId: "cm2z7o6q60000wdfps8prev7a", categoryId: allCategories[0].id,
             description: "Lorem ipsum description"
           },
           {
             name: 'Microondas', price: 89.99, userId: "cm2z7o6q60000wdfps8prev7a", categoryId: allCategories[1].id,
             description: "Lorem ipsum description"
           },
           {
             name: 'Rompecabezas', price: 14.99, userId: "cm2z7o6q60000wdfps8prev7a", categoryId: allCategories[2].id,
             description: "Lorem ipsum description"
           },
           {
             name: 'Pantalón de Mezclilla', price: 34.99, userId: "cm2z7o6q60000wdfps8prev7a", categoryId: allCategories[3].id,
             description: "Lorem ipsum description"
           },
       ],
   });

   console.log(`${products.count} productos insertados`);
}


export default main
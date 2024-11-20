import main from "@/seed";
import { PrismaClient } from "@prisma/client";



export async function POST(request: Request) {

    const prisma = new PrismaClient();
    
    async function getUserWithProductsAndCategories(userId: number) {
       const userData = await prisma.user.findUnique({
           where: { id:  "cm2z7o6q60000wdfps8prev7a"},
           include: {
               products: {
                   include: {
                       category: true, // Incluye la información de la categoría de cada producto
                   },
               },
           },
       });
    
       return userData;
    }
    
    // Llamada a la función
    getUserWithProductsAndCategories(1)
       .then(user => {
           console.log("Usuario con sus productos y categorías:", user);
       })
       .catch(error => {
           console.error("Error obteniendo datos:", error);
       })
       .finally(async () => {
           await prisma.$disconnect();
       });
    
}
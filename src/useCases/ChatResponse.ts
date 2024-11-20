// src/useCases/GenerateChatResponse.ts
import { OpenAIRepository } from '../repositories/OpenAIRepository'
import { Product } from '../interfaces/IProductRepository'

export class GenerateChatResponse {
  private openAIRepository: OpenAIRepository

  constructor(openAIRepository: OpenAIRepository) {
    this.openAIRepository = openAIRepository
  }

  generateProductContext(products: Product[]): string {
    return products
      .map((product) => `${product.name} cuesta $${product.price}`)
      .join(', ')
  }

  async execute(userMessage: string): Promise<string> {
    const products: Product[] = [
      {
        name: 'Cargador Rápido USB-C',
        price: 25,
        description:
          'Cargador rápido con tecnología USB-C, compatible con smartphones, tablets y laptops. Ofrece una carga rápida y segura con protección contra sobrecalentamiento y sobrecarga.',
      },
      {
        name: 'Auriculares Bluetooth',
        price: 50,
        description:
          'Auriculares inalámbricos con tecnología Bluetooth 5.0, diseñados para ofrecer una experiencia de sonido envolvente. Incluyen cancelación de ruido activa, micrófono incorporado y una batería que dura hasta 10 horas con una sola carga.',
      },
      {
        name: 'Cable HDMI 4K',
        price: 20,
        description:
          'Cable HDMI de alta velocidad compatible con resoluciones 4K Ultra HD y HDR. Ideal para conectar tu televisor, monitor o proyector, garantizando una transmisión de video y audio de alta calidad.',
      },
      {
        name: 'Altavoz Portátil',
        price: 80,
        description:
          'Altavoz portátil Bluetooth con sonido estéreo de alta calidad, resistente al agua (IPX7). Ofrece hasta 12 horas de reproducción continua y es perfecto para usar en exteriores o en casa.',
      },
      {
        name: 'Teclado Mecánico RGB',
        price: 70,
        description:
          'Teclado mecánico retroiluminado RGB con interruptores personalizables para una experiencia de escritura precisa y rápida. Ideal para gamers y profesionales que buscan una herramienta de alto rendimiento.',
      },
      {
        name: 'Monitor 4K 27 pulgadas',
        price: 300,
        description:
          'Monitor UHD de 27 pulgadas con resolución 4K, ideal para gaming, edición de video y trabajo profesional. Pantalla IPS con colores vibrantes y amplios ángulos de visión para una experiencia visual inmersiva.',
      },
      {
        name: 'Silla Gamer Ergonómica',
        price: 150,
        description:
          'Silla ergonómica para gamers con soporte lumbar ajustable, reposabrazos 4D y cojín cervical. Diseñada para ofrecer comodidad en sesiones largas de juego o trabajo, ayudando a mejorar la postura.',
      },
      {
        name: 'Lámpara LED Escritorio',
        price: 35,
        description:
          'Lámpara de escritorio LED con brazo ajustable y varios niveles de brillo. Perfecta para iluminar tu espacio de trabajo o estudio sin causar fatiga visual. Bajo consumo energético y diseño moderno.',
      },
      {
        name: 'Cámara Web HD',
        price: 60,
        description:
          'Cámara web HD con resolución 1080p y micrófono integrado. Ideal para videollamadas y conferencias, ofrece imágenes nítidas y audio claro en cualquier condición de luz.',
      },
      {
        name: 'Soporte para Laptop',
        price: 40,
        description:
          'Soporte ajustable para laptop que mejora la ergonomía y reduce la tensión en el cuello y espalda. Fabricado en aluminio, es ligero y portátil, perfecto para trabajar desde cualquier lugar.',
      },
    ]

    const productContext = `
    You are a friendly and helpful virtual assistant for an online store that sells a variety of tech products.
    Your job is to assist the customer, answer their questions about the products, and help them find what they are looking for.
    Be polite, engaging, and try to make recommendations based on the customer's needs.
    If they seem unsure, guide them toward making a confident decision. Provide product details, but avoid sounding pushy.
    Here are some of the products available: ${this.generateProductContext(products)}.
  `

    try {
      const response = await this.openAIRepository.generateChatResponse(
        productContext,
        userMessage,
      )

      if (!response) {
        throw new Error('No response from OpenAI')
      }

      return response
    } catch (error) {
      console.error('Error en el caso de uso GenerateChatResponse:', error)
      return 'Lo siento, hubo un problema al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.'
    }
  }
}

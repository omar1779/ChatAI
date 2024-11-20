'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { useInView } from 'framer-motion'

import { Container } from '@/components/Container'

interface Review {
  title: string
  body: string
  author: string
  rating: 1 | 2 | 3 | 4 | 5
}
const reviews: Array<Review> = [
  {
    title: 'Increased our sales dramatically!',
    body: 'After integrating Chatbot IA into our WhatsApp business, we saw a 40% increase in sales within the first month. It handles customer queries efficiently, and we never miss a lead!',
    author: 'SalesBoostCo',
    rating: 5,
  },
  {
    title: 'A must-have for customer service.',
    body: 'We’ve automated over 80% of our customer support using Chatbot IA. It understands complex questions and provides accurate answers, saving us time and resources.',
    author: 'SupportGenius',
    rating: 5,
  },
  {
    title: 'Incredible product recommendation engine.',
    body: 'Chatbot IA not only answers customer questions, but it also suggests relevant products based on previous interactions. Our cross-sales have never been higher!',
    author: 'ShopifyKing',
    rating: 5,
  },
  {
    title: 'Better than hiring more agents!',
    body: 'Instead of expanding our customer support team, we integrated Chatbot IA. It’s like having another team member that works 24/7, providing personalized support for every customer.',
    author: 'SmartSupportCo',
    rating: 5,
  },
  {
    title: 'Saved us from missing out on leads.',
    body: 'With Chatbot IA, we no longer worry about responding to customer inquiries. Every message is handled in real-time, and we’re able to follow up on every lead with precision.',
    author: 'LeadSaver101',
    rating: 5,
  },
  {
    title: 'My clients love the instant responses!',
    body: 'I use Chatbot IA for my e-commerce business, and my customers always comment on how quickly they get answers to their questions. It feels natural, like chatting with a real person.',
    author: 'EcomExpert',
    rating: 5,
  },
  {
    title: 'Increased customer satisfaction!',
    body: 'Since using Chatbot IA, our customer satisfaction scores have gone through the roof. It provides consistent, accurate answers and never gets tired!',
    author: 'CustomerFirstLLC',
    rating: 5,
  },
  {
    title: 'AI-driven insights!',
    body: 'Chatbot IA helped us gather key insights on what our customers are looking for. With this data, we were able to fine-tune our product offerings and improve our business strategy.',
    author: 'InsightMaster',
    rating: 5,
  },
  {
    title: 'Perfect for product inquiries.',
    body: 'Before, we struggled to keep up with customer questions about our products. Now, Chatbot IA handles everything, and our sales team can focus on closing deals.',
    author: 'ProductPro',
    rating: 5,
  },
  {
    title: 'Works seamlessly with WhatsApp!',
    body: 'Chatbot IA integrates perfectly with WhatsApp, and it’s so easy to manage. Now our customers can get answers 24/7 without needing human agents.',
    author: 'WhatsAppWizard',
    rating: 5,
  },
  {
    title: 'Improved team efficiency.',
    body: 'Our support team used to be overwhelmed with messages. Chatbot IA took over the routine queries, allowing our team to focus on more complex issues. It’s a game-changer.',
    author: 'EfficientOps',
    rating: 5,
  },
  {
    title: 'Highly recommend it!',
    body: 'We were hesitant at first, but Chatbot IA has been an incredible addition to our business. Our customers love it, and it has become an essential part of our operation.',
    author: 'HappyClient',
    rating: 5,
  },
  {
    title: 'Best decision ever!',
    body: 'If you’re looking for a way to handle customer service without adding to your team, Chatbot IA is the way to go. It’s been a life-saver for our business.',
    author: 'GrowthGuru',
    rating: 5,
  },
  {
    title: 'Exceeded our expectations!',
    body: 'We thought it would take months to see results, but within weeks, we noticed a significant drop in response times and an increase in customer engagement.',
    author: 'QuickWinsCo',
    rating: 5,
  },
]


function StarIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function StarRating({ rating }: { rating: Review['rating'] }) {
  return (
    <div className="flex">
      {[...Array(5).keys()].map(index => (
        <StarIcon
          key={index}
          className={clsx(
            'h-5 w-5',
            rating > index ? 'fill-green-500' : 'fill-gray-300',
          )}
        />
      ))}
    </div>
  )
}

function Review({
  title,
  body,
  author,
  rating,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'figure'>, keyof Review> & Review) {
  let animationDelay = useMemo(() => {
    let possibleAnimationDelays = ['0s', '0.1s', '0.2s', '0.3s', '0.4s', '0.5s']
    return possibleAnimationDelays[
      Math.floor(Math.random() * possibleAnimationDelays.length)
    ]
  }, [])

  return (
    <figure
      className={clsx(
        'white animate-fade-in rounded-3xl p-6 opacity-0 shadow-md shadow-gray-900/5',
        className,
      )}
      style={{ animationDelay }}
      {...props}
    >
      <blockquote className="text-gray-900">
        <StarRating rating={rating} />
        <p className="mt-4 text-lg font-semibold leading-6 before:content-['“'] after:content-['”']">
          {title}
        </p>
        <p className="mt-3 text-base leading-7">{body}</p>
      </blockquote>
      <figcaption className="mt-3 text-sm text-gray-600 before:content-['–_']">
        {author}
      </figcaption>
    </figure>
  )
}

function splitArray<T>(array: Array<T>, numParts: number) {
  let result: Array<Array<T>> = []
  for (let i = 0; i < array.length; i++) {
    let index = i % numParts
    if (!result[index]) {
      result[index] = []
    }
    result[index].push(array[i])
  }
  return result
}

function ReviewColumn({
  reviews,
  className,
  reviewClassName,
  msPerPixel = 0,
}: {
  reviews: Array<Review>
  className?: string
  reviewClassName?: (reviewIndex: number) => string
  msPerPixel?: number
}) {
  let columnRef = useRef<React.ElementRef<'div'>>(null)
  let [columnHeight, setColumnHeight] = useState(0)
  let duration = `${columnHeight * msPerPixel}ms`

  useEffect(() => {
    if (!columnRef.current) {
      return
    }

    let resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0)
    })

    resizeObserver.observe(columnRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div
      ref={columnRef}
      className={clsx('animate-marquee space-y-8 py-4', className)}
      style={{ '--marquee-duration': duration } as React.CSSProperties}
    >
      {reviews.concat(reviews).map((review, reviewIndex) => (
        <Review
          key={reviewIndex}
          aria-hidden={reviewIndex >= reviews.length}
          className={reviewClassName?.(reviewIndex % reviews.length)}
          {...review}
        />
      ))}
    </div>
  )
}

function ReviewGrid() {
  let containerRef = useRef<React.ElementRef<'div'>>(null)
  let isInView = useInView(containerRef, { once: true, amount: 0.4 })
  let columns = splitArray(reviews, 3)
  let column1 = columns[0]
  let column2 = columns[1]
  let column3 = splitArray(columns[2], 2)

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {isInView && (
        <>
          <ReviewColumn
            reviews={[...column1, ...column3.flat(), ...column2]}
            reviewClassName={reviewIndex =>
              clsx(
                reviewIndex >= column1.length + column3[0].length &&
                  'md:hidden',
                reviewIndex >= column1.length && 'lg:hidden',
              )
            }
            msPerPixel={10}
          />
          <ReviewColumn
            reviews={[...column2, ...column3[1]]}
            className="hidden md:block"
            reviewClassName={reviewIndex =>
              reviewIndex >= column2.length ? 'lg:hidden' : ''
            }
            msPerPixel={15}
          />
          <ReviewColumn
            reviews={column3.flat()}
            className="hidden lg:block"
            msPerPixel={10}
          />
        </>
      )}
      <div className="gradient-to-b pointer-events-none absolute inset-x-0 top-0 h-32 from-gray-50" />
      <div className="gradient-to-t pointer-events-none absolute inset-x-0 bottom-0 h-32 from-gray-50" />
    </div>
  )
}

export function Reviews() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="pb-16 pt-20 sm:pb-24 sm:pt-32"
    >
      <Container>
        <h2
          id="reviews-title"
          className="text-3xl font-medium tracking-tight text-gray-900 sm:text-center"
        >
          Everyone is changing their life with Chatbot IA.
        </h2>
        <p className="mt-2 text-lg text-gray-600 sm:text-center">
          Hundreds of people have doubled their effectiveness in the last 30
          days.
        </p>
        <ReviewGrid />
      </Container>
    </section>
  )
}

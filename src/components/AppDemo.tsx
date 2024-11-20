/* eslint-disable react/jsx-no-undef */
'use client'

import { useId, useRef, useState } from 'react'
//import clsx from 'clsx'
import { motion, useInView, useMotionValue } from 'framer-motion'

//import { AppScreen } from '@/components/AppScreen'
import Image from 'next/image'
import clsx from 'clsx'
import { AppScreen } from '@/components/AppScreen'

function Header() {
  return (
    <div className="flex items-center justify-between bg-green-600 px-4 py-2 text-green-600">
      <div className="flex items-center space-x-2">
        <Image
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Contact"
          width={32} // Especifica el ancho de la imagen
          height={32} // Especifica la altura de la imagen
          className="rounded-full"
        />
        <div>
          <div className="font-semibold text-gray-100">John Doe</div>
          <div className="text-xs text-gray-100">Online</div>
        </div>
      </div>
      <div className="flex space-x-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.55 2.27-4.55 2.27V10z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.55 2.27-4.55 2.27V10z"
          />
        </svg>
      </div>
    </div>
  )
}

function MessageBubble({
  message,
  isSentByUser,
  time,
}: {
  message: string
  isSentByUser: boolean
  time: string
}) {
  return (
    <div
      className={clsx(
        'relative max-w-xs rounded-lg p-3 text-sm',
        isSentByUser
          ? 'ml-auto bg-green-700 text-white'
          : 'mr-auto bg-gray-100 text-gray-900',
      )}
    >
      <p className='mb-2'>{message}</p>
      <span
        className={clsx(
          'absolute text-[10px]',
          isSentByUser ? 'right-2' : 'left-2',
          'bottom-0 text-gray-300'
        )}
      >
        {time}
      </span>
    </div>
  )
}

function InputBar() {
  return (
    <div className="gray-100 flex items-center border-t p-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 10l4.55 2.27-4.55 2.27V10z"
        />
      </svg>
      <input
        type="text"
        placeholder="Type a message"
        className="white ml-2 flex-grow rounded-lg border p-2"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="ml-2 h-6 w-6 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 10l4.55 2.27-4.55 2.27V10z"
        />
      </svg>
    </div>
  )
}

export function AppDemo() {
  const messages = [
    {
      message: 'Hi! How can I help you today?',
      isSentByUser: false,
      time: '12:01 PM',
    },
    {
      message: 'I’m interested in your services.',
      isSentByUser: true,
      time: '12:02 PM',
    },
    {
      message:
        'We offer AI chatbots for WhatsApp to automate customer interactions. Are you looking to improve engagement?',
      isSentByUser: false,
      time: '12:03 PM',
    },
    { message: 'Yes, how does it work?', isSentByUser: true, time: '12:04 PM' },
    {
      message:
        'It handles FAQs, sales, and more automatically. Would you like a demo or pricing info?',
      isSentByUser: false,
      time: '12:05 PM',
    },
  ]

  return (
    <AppScreen>
      <AppScreen.Body>
        <div className="flex h-full flex-col">
          {/* Header section */}
          <Header />

          {/* Messages section */}
          <div className="white flex-grow space-y-2 overflow-y-scroll p-4">
            {messages.map((msg, index) => (
              <MessageBubble
                key={index}
                message={msg.message}
                isSentByUser={msg.isSentByUser}
                time={msg.time}
              />
            ))}
          </div>

          {/* Input section */}
          <InputBar />
        </div>
      </AppScreen.Body>
    </AppScreen>
  )
}

/* 
const prices = [
  997.56, 944.34, 972.25, 832.4, 888.76, 834.8, 805.56, 767.38, 861.21, 669.6,
  694.39, 721.32, 694.03, 610.1, 502.2, 549.56, 611.03, 583.4, 610.14, 660.6,
  752.11, 721.19, 638.89, 661.7, 694.51, 580.3, 638.0, 613.3, 651.64, 560.51,
  611.45, 670.68, 752.56,
]
const maxPrice = Math.max(...prices)
const minPrice = Math.min(...prices)

function Chart({
  className,
  activePointIndex,
  onChangeActivePointIndex,
  width: totalWidth,
  height: totalHeight,
  paddingX = 0,
  paddingY = 0,
  gridLines = 6,
  ...props
}: React.ComponentPropsWithoutRef<'svg'> & {
  activePointIndex: number | null
  onChangeActivePointIndex: (index: number | null) => void
  width: number
  height: number
  paddingX?: number
  paddingY?: number
  gridLines?: number
}) {
  let width = totalWidth - paddingX * 2
  let height = totalHeight - paddingY * 2

  let id = useId()
  let svgRef = useRef<React.ElementRef<'svg'>>(null)
  let pathRef = useRef<React.ElementRef<'path'>>(null)
  let isInView = useInView(svgRef, { amount: 0.5, once: true })
  let pathWidth = useMotionValue(0)
  let [interactionEnabled, setInteractionEnabled] = useState(false)

  let path = ''
  let points: Array<{ x: number; y: number }> = []

  for (let index = 0; index < prices.length; index++) {
    let x = paddingX + (index / (prices.length - 1)) * width
    let y =
      paddingY +
      (1 - (prices[index] - minPrice) / (maxPrice - minPrice)) * height
    points.push({ x, y })
    path += `${index === 0 ? 'M' : 'L'} ${x.toFixed(4)} ${y.toFixed(4)}`
  }

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${totalWidth} ${totalHeight}`}
      className={clsx(className, 'overflow-visible')}
      {...(interactionEnabled
        ? {
            onPointerLeave: () => onChangeActivePointIndex(null),
            onPointerMove: (event) => {
              let x = event.nativeEvent.offsetX
              let closestPointIndex: number | null = null
              let closestDistance = Infinity
              for (
                let pointIndex = 0;
                pointIndex < points.length;
                pointIndex++
              ) {
                let point = points[pointIndex]
                let distance = Math.abs(point.x - x)
                if (distance < closestDistance) {
                  closestDistance = distance
                  closestPointIndex = pointIndex
                } else {
                  break
                }
              }
              onChangeActivePointIndex(closestPointIndex)
            },
          }
        : {})}
      {...props}
    >
      <defs>
        <clipPath id={`${id}-clip`}>
          <path d={`${path} V ${height + paddingY} H ${paddingX} Z`} />
        </clipPath>
        <linearGradient id={`${id}-gradient`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#13B5C8" />
          <stop offset="100%" stopColor="#13B5C8" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[...Array(gridLines - 1).keys()].map((index) => (
        <line
          key={index}
          stroke="#a3a3a3"
          opacity="0.1"
          x1="0"
          y1={(totalHeight / gridLines) * (index + 1)}
          x2={totalWidth}
          y2={(totalHeight / gridLines) * (index + 1)}
        />
      ))}
      <motion.rect
        y={paddingY}
        width={pathWidth}
        height={height}
        fill={`url(#${id}-gradient)`}
        clipPath={`url(#${id}-clip)`}
        opacity="0.5"
      />
      <motion.path
        ref={pathRef}
        d={path}
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        transition={{ duration: 1 }}
        {...(isInView ? { stroke: '#06b6d4', animate: { pathLength: 1 } } : {})}
        onUpdate={({ pathLength }) => {
          if (pathRef.current && typeof pathLength === 'number') {
            pathWidth.set(
              pathRef.current.getPointAtLength(
                pathLength * pathRef.current.getTotalLength(),
              ).x,
            )
          }
        }}
        onAnimationComplete={() => setInteractionEnabled(true)}
      />
      {activePointIndex !== null && (
        <>
          <line
            x1="0"
            y1={points[activePointIndex].y}
            x2={totalWidth}
            y2={points[activePointIndex].y}
            stroke="#06b6d4"
            strokeDasharray="1 3"
          />
          <circle
            r="4"
            cx={points[activePointIndex].x}
            cy={points[activePointIndex].y}
            fill="#fff"
            strokeWidth="2"
            stroke="#06b6d4"
          />
        </>
      )}
    </svg>
  )
}

export function AppDemo() {
  let [activePointIndex, setActivePointIndex] = useState<number | null>(null)
  let activePriceIndex = activePointIndex ?? prices.length - 1
  let activeValue = prices[activePriceIndex]
  let previousValue = prices[activePriceIndex - 1]
  let percentageChange =
    activePriceIndex === 0
      ? null
      : ((activeValue - previousValue) / previousValue) * 100

  return (
    <AppScreen>
      <AppScreen.Body>
        <div className="p-4">
          <div className="flex gap-2">
            <div className="text-xs leading-6 text-gray-500">
              Tailwind Labs, Inc.
            </div>
            <div className="text-sm text-gray-900">$CSS</div>
            <svg viewBox="0 0 24 24" className="ml-auto h-6 w-6" fill="none">
              <path
                d="M5 12a7 7 0 1 1 14 0 7 7 0 0 1-14 0ZM12 9v6M15 12H9"
                stroke="#171717"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="mt-3 border-t border-gray-200 pt-5">
            <div className="flex items-baseline gap-2">
              <div className="text-2xl tabular-nums tracking-tight text-gray-900">
                {activeValue.toFixed(2)}
              </div>
              <div className="text-sm text-gray-900">USD</div>
              {percentageChange && (
                <div
                  className={clsx(
                    'ml-auto text-sm tabular-nums tracking-tight',
                    percentageChange >= 0 ? '-500' : 'text-gray-500',
                  )}
                >
                  {`${
                    percentageChange >= 0 ? '+' : ''
                  }${percentageChange.toFixed(2)}%`}
                </div>
              )}
            </div>
            <div className="mt-6 flex gap-4 text-xs text-gray-500">
              <div>1D</div>
              <div>5D</div>
              <div className="font-semibold -600">1M</div>
              <div>6M</div>
              <div>1Y</div>
              <div>5Y</div>
            </div>
            <div className="mt-3 rounded-lg gray-50 ring-1 ring-inset ring-black/5">
              <Chart
                width={286}
                height={208}
                paddingX={16}
                paddingY={32}
                activePointIndex={activePointIndex}
                onChangeActivePointIndex={setActivePointIndex}
              />
            </div>
            <div className="mt-4 rounded-lgbg-green-500 px-4 py-2 text-center text-sm font-semibold text-green-600">
              Trade
            </div>
            <div className="mt-3 divide-y divide-gray-100 text-sm">
              <div className="flex justify-between py-1">
                <div className="text-gray-500">Open</div>
                <div className="font-medium text-gray-900">6,387.55</div>
              </div>
              <div className="flex justify-between py-1">
                <div className="text-gray-500">Closed</div>
                <div className="font-medium text-gray-900">6,487.09</div>
              </div>
              <div className="flex justify-between py-1">
                <div className="text-gray-500">Low</div>
                <div className="font-medium text-gray-900">6,322.01</div>
              </div>
            </div>
          </div>
        </div>
      </AppScreen.Body>
    </AppScreen>
  )
}
 */

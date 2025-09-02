import { TItem } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Card({ item }: { item: TItem }) {
	const formedLinkStr = item.name.toLowerCase().split(' ').join('-')

	const containerVariants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2, // delay each child by 0.2s
			},
		},
	}

	const paragraphVariants = {
		hidden: { opacity: 0 },
		show: { opacity: 1, transition: { duration: 0.4 } },
	}

	return (
		<motion.li
			whileHover={{ scale: 1.05 }}
			transition={{ type: 'spring', stiffness: 400 }}
      className='border-4 flex items-center overflow-hidden'
		>
			<Link
				className='flex space-x-5 h-full'
				href={`/${formedLinkStr}`}
			>
        <div className='w-[250px] h-auto min-h-[150px] relative overflow-hidden'>
          <Image
            className='object-cover [object-position:50%_20%]'
            src={item.image}
            alt={item.name}
            title={item.name}
            fill
          />
        </div>

				<motion.div className='py-4'>
					<h3 className='text-2xl font-bold'>{item.name}</h3>
					<motion.div
						variants={containerVariants}
						initial='hidden'
						animate='show'
						className='flex flex-col space-y-2'
					>
						<motion.p variants={paragraphVariants}>
							Status: {item.status}
						</motion.p>
						<motion.p variants={paragraphVariants}>
							Location Name: {item.location.name}
						</motion.p>
						<motion.p variants={paragraphVariants}>
							First Introduced: {item.created}
						</motion.p>
						<motion.p variants={paragraphVariants}>
							Dimension: {item.location.dimension}
						</motion.p>
					</motion.div>
				</motion.div>
			</Link>
		</motion.li>
	)
}

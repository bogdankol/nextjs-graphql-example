import CardSkeleton from '../CardSkeleton'

export default function ListSkeleton() {
	return (
		<ul className='grid grid-cols-2 gap-8 mt-6 w-full h-[600px]'>
			{Array.from({ length: 10 }).map((_, i: number) => (
				<CardSkeleton key={i} />
			))}
		</ul>
	)
}

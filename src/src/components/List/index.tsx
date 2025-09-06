import type { TItem } from '@/lib/types'
import Card from '../Card'

export default function List({items}: {items: TItem[]}) {
	return (
		<ul className='grid grid-cols-2 gap-8 mt-6'>
			{items?.map(item => (
				<Card {...{ item }}  key={item.image}/>
			))}
		</ul>
	)
}

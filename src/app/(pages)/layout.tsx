import Logo from '@/components/Logo'
import { doGraphRequest } from '@/utils/doGraphRequest'
import Link from 'next/link'
import { useClientContext } from '@/hooks/useClientContext'
import { getBasicListOfCharacters } from '@/graphql/queries'

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const linksPaths = [
		{
			text: 'Rick',
			href: '/rick',
		},
		{
			text: 'Morty',
			href: '/morty',
		},
		{
			text: 'Jerry',
			href: '/jerry',
		},
		{
			text: 'Beth',
			href: '/beth',
		},
		{
			text: 'Choose your own character',
			href: '/',
		},
	]

  const items = await doGraphRequest(getBasicListOfCharacters)
  console.log({items})
	return (
		<div className='flex flex-col'>
			<div className='flex items-center space-x-10 bg-rose-500 px-4'>
				<Logo />

				<nav className='flex space-x-5'>
					{linksPaths.map(el => (
						<Link
							className='font-bold text-amber-950 text-2xl hover:text-amber-600 transition'
							href={el.href}
							key={el.text}
						>
							{el.text}
						</Link>
					))}
				</nav>
			</div>
			<div className={`px-4 flex flex-col min-h-full space-y-4`}>
				<div>{children}</div>

				<footer className='flex h-[60px] w-full mt-auto items-center bg-amber-400'>
					Footer
				</footer>
			</div>
		</div>
	)
}

// макет

// хедер - с навигацией по основным персонажам (Рик, Морти, Джерри, Мама), либо поиск по персонажам

// боди - список карточек с картинкой и инфой и персонажах, основные эпизоды появления (если больше трех - три точки после третьего),
//     если наводишь курсор на карточку, то она увеличивается в размерах на 10% и курсов поинтер,
//     если нажимаешь на карточку, то переходишь на страницу персонажа

// либы - графкьэл для запросов, shadcn - для инпута, карточек, zustand - для хранения данных, react-query + SWR для запросов и кеширования, tailwind - для стилей, rtk - для тестирования,

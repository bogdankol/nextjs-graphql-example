import Link from 'next/link'
import Image from 'next/image'

function Logo() {
	return (
		<Link href={'/'} className='hover:scale-110 transition duration-300'>
			<Image
				width={100}
        height={100}
				alt='logo'
				title='logo'
				src='/logo2.png'
			/>
		</Link>
	)
}

export default Logo

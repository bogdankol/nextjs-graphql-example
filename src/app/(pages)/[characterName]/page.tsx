import Content from './content'

export default async function Page({
	params,
}: {
	params: Promise<{ characterName: string }>
}) {
	const parameters = await params
	const transformedCharName = parameters
    ?.characterName
		?.split('-')
		.map(str => `${str.substring(0, 1).toUpperCase()}${str.slice(1)}`)
    .join(' ')

	return (
		<>
			{transformedCharName && <Content {...{ transformedCharName }} />}
		</>
	)
}

import Skeleton from '../Skeleton'

export default function CardSkeleton() {
  return (
    <li className='h-[200px] rounded-[16px] overflow-hidden'>
      <Skeleton />
    </li>
  )
}
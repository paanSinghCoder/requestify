import { Tab } from '@headlessui/react'
import { TabsType } from './Tabs.types'

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

export default function Tabs({ tabs }: { tabs: TabsType[] }) {
	return (
		<div className="w-full">
			<Tab.Group>
				<Tab.List className="flex space-x-1 bg-gray-100 p-1">
					{tabs.map((item: any) => (
						<Tab
							key={item.id}
							className={({ selected }) =>
								classNames(
									'w-full rounded-lg py-2 text-sm font-medium',
									'focus:outline-none focus:ring-0 focus:ring-offset-0',
									selected ? 'bg-white' : 'text-gray-500'
								)
							}>
							{item.title}
						</Tab>
					))}
				</Tab.List>
				<Tab.Panels className="mt-2 min-h-[500px]">
					{tabs.map((item: TabsType, id: number) => (
						<Tab.Panel
							key={id}
							className={classNames(
								'rounded-xl bg-white p-3',
								'ring-white/60 ring-offset-2 focus:outline-none focus:ring-0 focus:ring-offset-0'
							)}>
							<div>{item.component}</div>
						</Tab.Panel>
					))}
				</Tab.Panels>
			</Tab.Group>
		</div>
	)
}

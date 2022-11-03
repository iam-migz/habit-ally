import { Fragment, useState } from 'react';
import { useHabit } from '../hooks/habit/useHabit';
import Navbar from '../components/layout/Navbar';
import { useParams } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import {
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import Dropdown, { DropdownItem } from '../components/shared/Dropdown';
import EditHabitModal from '../components/habit/EditHabitModal';
import DeleteHabitModal from '../components/habit/DeleteHabitModal';

type IdParams = {
  id: string;
};

function Habit() {
  const { id } = useParams<keyof IdParams>() as IdParams;
  const { data: habit } = useHabit(id);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const dropdownData: DropdownItem[] = [
    {
      name: 'edit',
      icon: <PencilSquareIcon className="h-5 w-5" />,
      highLightedColor: 'bg-green-700',
      action: () => setIsEditModalOpen(true),
    },
    {
      name: 'delete',
      icon: <TrashIcon className="h-5 w-5" />,
      highLightedColor: 'bg-green-700',
      action: () => setIsDeleteModalOpen(true),
    },
  ];

  return (
    <div>
      <Navbar />

      <div className="container border-2 bg-slate-50 mt-12 p-4 max-w-[640px] mx-auto md:rounded">
        <div className="text-center relative">
          <h1 className="text-2xl capitalize">{habit?.name}</h1>
          <span className="text-slate-500">{habit?.description}</span>
          <div className="absolute top-0 right-0">
            <Dropdown
              button={
                <EllipsisHorizontalIcon className="h-7 w-7 cursor-pointer" />
              }
              content={dropdownData}
            />
          </div>
        </div>

        <div className="w-full mt-10">
          <Tab.Group>
            <Tab.List className="flex justify-center space-x-12 font-bold">
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`${
                      selected ? 'bg-blue-500 text-white' : ''
                    } w-full p-2 px-8 rounded`}
                  >
                    Tracker
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`${
                      selected ? 'bg-blue-500 text-white' : ''
                    } w-full p-2 px-8 rounded`}
                  >
                    Progress
                  </button>
                )}
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <div className="mt-4 p-4">
                <Tab.Panel>
                  <div>Content 1</div>
                </Tab.Panel>
                <Tab.Panel>
                  <div>Content 2</div>
                </Tab.Panel>
              </div>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>

      <EditHabitModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        id={habit._id}
      />
      <DeleteHabitModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        id={habit._id}
      />
    </div>
  );
}

export default Habit;

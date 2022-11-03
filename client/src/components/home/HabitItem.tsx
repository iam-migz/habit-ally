import { CheckIcon } from '@heroicons/react/24/solid';
import { motion, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAddDate } from '../../hooks/habit/useAddDate';
import { useDeleteDate } from '../../hooks/habit/useDeleteDate';
import { useHabit } from '../../hooks/habit/useHabit';
import { useSliderStore } from '../../stores/sliderStore';

interface HabitItemProps {
  id: string;
}

function HabitItem({ id }: HabitItemProps) {
  const { data: habit } = useHabit(id);

  const { dates } = useSliderStore();
  const animationController = useAnimationControls();
  const { mutate: addDate } = useAddDate(id);
  const { mutate: deleteDate } = useDeleteDate(id);

  function clickHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    const box = e.currentTarget;
    if (box instanceof HTMLElement && box.hasAttribute('data-index')) {
      const index = Number(box.dataset.index);
      const date = new Date(dates[index]);
      if (box.firstChild) {
        deleteDate({ date });
      } else {
        addDate({ date });
      }
    }
  }

  useEffect(() => {
    function isCustomEvent(event: Event): event is CustomEvent<number> {
      return 'detail' in event;
    }
    function eventHandler(e: Event) {
      if (!isCustomEvent(e)) throw new Error('not a custom event');

      animationController.start({ x: e.detail });
    }
    document.addEventListener('sliderX', eventHandler);
    return () => {
      document.removeEventListener('slideX', eventHandler);
    };
  }, []);

  return (
    <Link to={`/habit/${habit?._id}`} className="block min-w-[320px] mx-auto">
      <div className="flex justify-between items-center mt-2 rounded relative">
        {/* name */}
        <div className="min-w-[80px] text-center font-light">
          <h1 className="capitalize">{habit?.name}</h1>
        </div>

        {/* check slider */}
        <div className="min-w-[240px] space-x-1 justify-between items-center rounded">
          <div className="overflow-hidden  border-black border-2 rounded bg-slate-500">
            <motion.div
              drag="x"
              dragListener={false}
              dragMomentum={false}
              dragElastic={0}
              className="flex text-center cursor-crosshair space-x-2 p-1"
              animate={animationController}
            >
              {dates.map((date, index) => (
                <div
                  key={index}
                  className="w-[58px] shrink-0 text-center text-xs"
                >
                  <div
                    className="h-8 w-8 bg-slate-600 mx-auto grid place-items-center rounded"
                    onClick={clickHandler}
                    data-index={index}
                  >
                    {habit?.dates.find(
                      (d) => new Date(d).getTime() === new Date(date).getTime(),
                    ) ? (
                      <CheckIcon className="h-6 w-6 text-green-500" />
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default HabitItem;

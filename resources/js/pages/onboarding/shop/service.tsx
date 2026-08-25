import type { InertiaFormProps } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import FileUploader from '@/components/form/file-uploader';
import { Input } from '@/components/form/input';
import { Textarea } from '@/components/form/textarea';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';
import type { OnboardingFormData } from '../types';

type Props = {
  form: InertiaFormProps<Pick<OnboardingFormData, 'services'>>;
  onSkip: () => void;
};

type ServiceAnimation = {
  id: number;
  kind: 'add' | 'delete';
  phase: 'exit' | 'enter';
  exitingIndex: number | null;
  enteringIndex: number | null;
};

export default function Service({ form, onSkip }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);
  const [animation, setAnimation] = useState<ServiceAnimation | null>(null);
  const animationId = useRef(0);
  const count = form.data.services.length;

  useEffect(() => {
    if (!api) {
      return;
    }

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on('select', handleSelect);
    api.on('reInit', handleSelect);

    return () => {
      api.off('select', handleSelect);
      api.off('reInit', handleSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api || !animation || animation.enteringIndex === null) {
      return;
    }

    const enteringIndex = animation.enteringIndex;
    const frame = requestAnimationFrame(() => {
      api.reInit();
      api.scrollTo(enteringIndex);
    });

    return () => cancelAnimationFrame(frame);
  }, [api, animation, count]);

  const getNextAnimationId = () => {
    animationId.current += 1;

    return animationId.current;
  };

  const handleAddMore = () => {
    if (animation) {
      return;
    }

    const currentIndex = Math.min(Math.max(current - 1, 0), count - 1);
    const newIndex = count;

    setAnimation({
      id: getNextAnimationId(),
      kind: 'add',
      phase: 'enter',
      exitingIndex: currentIndex,
      enteringIndex: newIndex,
    });

    form.setData('services', [
      ...form.data.services,
      {
        image: null,
        name: '',
        price: 0,
        min_duration: '',
        max_duration: '',
        description: '',
      },
    ]);
  };

  const handleDelete = () => {
    if (count <= 1 || animation) {
      return;
    }

    setAnimation({
      id: getNextAnimationId(),
      kind: 'delete',
      phase: 'exit',
      exitingIndex: Math.min(Math.max(current - 1, 0), count - 1),
      enteringIndex: null,
    });
  };

  const finishDelete = (index: number) => {
    if (
      !animation ||
      animation.kind !== 'delete' ||
      animation.phase !== 'exit' ||
      animation.exitingIndex !== index
    ) {
      return;
    }

    const services = form.data.services.filter((_, serviceIndex) => {
      return serviceIndex !== index;
    });
    const nextIndex = Math.min(index, services.length - 1);

    form.setData('services', services);
    setCurrent(nextIndex + 1);
    setAnimation({
      ...animation,
      phase: 'enter',
      exitingIndex: null,
      enteringIndex: nextIndex,
    });
  };

  const handleAnimationComplete = (index: number) => {
    if (!animation) {
      return;
    }

    if (
      animation.kind === 'delete' &&
      animation.phase === 'exit' &&
      animation.exitingIndex === index
    ) {
      finishDelete(index);

      return;
    }

    if (animation.enteringIndex === index) {
      setAnimation(null);
    }
  };

  return (
    <div className="px-8">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {Array.from({ length: form.data.services.length }, (_, i) => {
            return (
              <CarouselItem key={i.toString()}>
                <Form
                  animation={animation}
                  form={form}
                  index={i}
                  onAnimationComplete={handleAnimationComplete}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="mt-8 grid items-center lg:grid-cols-2">
        <div className="text-sm font-semibold text-primary">
          Service {current} out of {count}
        </div>

        <div className="flex flex-wrap justify-end gap-3">
          <Button
            className="text-primary"
            disabled={animation !== null || form.processing}
            onClick={onSkip}
            variant="ghost"
          >
            Skip for now
          </Button>

          <Button
            disabled={animation !== null || form.processing}
            variant="default-soft"
            onClick={handleAddMore}
          >
            <Plus /> Add more services
          </Button>

          {form.data.services.length > 1 && (
            <Button
              disabled={animation !== null || form.processing}
              variant="destructive"
              onClick={handleDelete}
            >
              <Trash2 /> Delete service
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

const Form = ({
  animation,
  form,
  index,
  onAnimationComplete,
}: Pick<Props, 'form'> & {
  animation: ServiceAnimation | null;
  index: number;
  onAnimationComplete: (index: number) => void;
}) => {
  const isEntering = animation?.enteringIndex === index;
  const isExiting = animation?.exitingIndex === index;

  return (
    <motion.div
      key={`${index}-${isEntering ? animation?.id : 'stable'}`}
      animate={
        isExiting
          ? animation?.kind === 'add'
            ? { x: -80 }
            : { opacity: 0, scale: 0.92 }
          : { opacity: 1, scale: 1, x: 0 }
      }
      className="relative grid w-full gap-y-6 rounded-xl bg-card px-5"
      initial={isEntering ? { opacity: 0, scale: 0.92 } : false}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      onAnimationComplete={() => onAnimationComplete(index)}
    >
      <div className="w-1/2">
        <FileUploader
          name={`services.${index}.image`}
          label="Sample picture"
          form={form}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Input
            name={`services.${index}.name`}
            label="Service name"
            placeholder="eg. Premium haircut"
            form={form}
          />
        </div>
        <Input
          name={`services.${index}.price`}
          type="number"
          label="Service price"
          placeholder="eg. 25"
          form={form}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Input
          name={`services.${index}.min_duration`}
          label="Minimum duration"
          placeholder="eg. 30 (mins)"
          form={form}
        />
        <Input
          name={`services.${index}.max_duration`}
          label="Maximum duration"
          placeholder="eg. 50 (mins)"
          form={form}
        />
      </div>

      <Textarea
        name={`services.${index}.description`}
        label="Service description"
        placeholder="Type in you shop description"
        form={form}
      />
    </motion.div>
  );
};

export { Form as ServiceFields };

import { useForm } from '@inertiajs/react';
import { MapPin, Search as SearchIcon } from 'lucide-react';
import { Input } from './form/input';
import { Select } from './form/select';
import SubmitButton from './form/submit-button';

export default function Search() {
  const form = useForm({});

  return (
    <form className="flex h-14 min-w-160 items-center rounded-full bg-slate-200 px-2">
      <Select
        name="category_id"
        placeholder="Select service"
        form={form}
        options={[]}
        classNames={{}}
        className="h-11.5! rounded-r-none"
        icon={SearchIcon}
      />

      <Input
        name="location"
        form={form}
        placeholder="Location"
        className="h-11.5 rounded-none rounded-r-full"
        classNames={{
          container: 'rounded-none rounded-r-full h-11.5',
          prefixIcon: 'items-center',
        }}
        icons={{
          prefixIcon: MapPin,
        }}
      />

      <SubmitButton form={form} label="Search" className="ml-2 h-12" />
    </form>
  );
}

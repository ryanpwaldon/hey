import type { ChangeEvent, ComponentProps } from 'react';

import { Combobox as BaseCombobox } from '@headlessui/react';
import { forwardRef, useState } from 'react';

import cn from '../cn';
import { Input } from './Input';

interface ComboboxProps extends ComponentProps<typeof Input> {
  items: string[];
  value?: string;
}

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  ({ items, ...props }, ref) => {
    const [selectedItem, setSelectedItem] = useState('');
    const [query, setQuery] = useState<string>(props.value ?? '');
    const mergedItems = query ? [query, ...items] : items;

    return (
      <div className="relative w-full">
        <BaseCombobox nullable onChange={setSelectedItem} value={selectedItem}>
          <BaseCombobox.Input
            as={Input}
            {...props}
            id={undefined}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              props.onChange && props.onChange(e);
              setQuery(e.target.value);
            }}
            ref={ref}
          />
          {mergedItems.length > 0 && (
            <BaseCombobox.Options className="absolute z-[5] mt-1 w-full rounded-xl border bg-white shadow-sm focus:outline-none dark:border-gray-700 dark:bg-gray-900">
              {mergedItems.map((item) => (
                <BaseCombobox.Option
                  className={({ active }) =>
                    cn(
                      { 'dropdown-active': active },
                      'm-2 block cursor-pointer rounded-lg px-2 py-1.5 text-sm'
                    )
                  }
                  key={item}
                  value={item}
                >
                  {item}
                </BaseCombobox.Option>
              ))}
            </BaseCombobox.Options>
          )}
        </BaseCombobox>
      </div>
    );
  }
);

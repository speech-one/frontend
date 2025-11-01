import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Switch } from '../content';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../content/Form';
import { Icon } from '../foundation';
import { HStack, VStack } from '../layout';

interface FormSwitchFieldProps<TFieldValues extends FieldValues> {
  name:         FieldPath<TFieldValues>;
  label:        string;
  required?:    boolean;
  control:      Control<TFieldValues>;
  size?:        'sm' | 'md' | 'lg';
  disabled?:    boolean;
  description?: string;
  hideLabel?:   boolean;
  className?:   string;
}

export function FormSwitchField<TFieldValues extends FieldValues>(props: FormSwitchFieldProps<TFieldValues>) {
  const {
    name,
    label,
    required = false,
    control,
    size = 'md',
    disabled = false,
    description,
    hideLabel = false,
    className,
  } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className || 'space-y-1 rounded-md w-full'}>
          {hideLabel
            ? (
              <FormControl>
                <Switch
                  checked={field.value ?? false}
                  onChange={field.onChange}
                  disabled={disabled}
                  size={size}
                  id={field.name}
                />
              </FormControl>
            )
            : (
              <>
                <VStack fullWidth spacing={8}>
                  <HStack fullWidth justify="between" align="center">
                    <FormLabel className="cursor-pointer" htmlFor={field.name}>
                      {label}
                      {required &&
                        <Icon name="asterisk" size={12} className="text-red-solid" />
                      }
                    </FormLabel>

                    <FormControl>
                      <Switch
                        checked={field.value ?? false}
                        onChange={field.onChange}
                        disabled={disabled}
                        size={size}
                        id={field.name}
                      />
                    </FormControl>
                  </HStack>

                  {description && (
                    <p className="text-grayscale-400 text-label text-sm">
                      {description}
                    </p>
                  )}
                </VStack>

                <FormMessage />
              </>
            )}
        </FormItem>
      )}
    />
  );
}


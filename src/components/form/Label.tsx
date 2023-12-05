import { FormLabel } from '@radix-ui/react-form'
import { LabelHTMLAttributes, forwardRef } from 'react'
import { Flex } from '@radix-ui/themes'
import { cn } from '@/utils/cn'

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <Flex align="baseline" display="flex" justify="between">
        <FormLabel
          ref={ref}
          className={cn(
            'text-sm text-zinc-600 flex items-center justify-between',
            className,
          )}
          {...props}
        />
      </Flex>
    )
  },
)

Label.displayName = 'Label'

export { Label }

import { FormControl } from '@radix-ui/react-form'
import { InputHTMLAttributes, forwardRef } from 'react'
import { Input } from '../ui/Input'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const InputField = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { value, name, ...rest } = props

  return (
    <FormControl asChild>
      <Input ref={ref} value={value} name={name} {...rest} />
    </FormControl>
  )
})

InputField.displayName = 'InputField'

export { InputField }

import {getInputFieldClassNames} from '@common/ui/forms/input-field/get-input-field-class-names';
import React, {Fragment, ReactNode, useId} from 'react';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {ButtonBase} from '@common/ui/buttons/button-base';
import {ColorPickerDialog} from '@common/ui/color-picker/color-picker-dialog';
import {HexColorInput} from 'react-colorful';

interface ColorInputProps {
  value: string;
  onChange: (newValue: string) => void;
  label: ReactNode;
}
export function ColorInput({value, onChange, label}: ColorInputProps) {
  const style = getInputFieldClassNames({
    size: 'md',
    startAppend: <Fragment />,
  });
  const id = useId();

  return (
    <div>
      <label className={style.label} htmlFor={id}>
        {label}
      </label>
      <div className="flex">
        <DialogTrigger
          type="popover"
          value={value}
          onValueChange={onChange}
          onClose={onChange}
        >
          <ButtonBase
            className="h-42 w-42 flex-shrink-0 rounded-input border bg-black"
            style={{backgroundColor: value}}
          />
          <ColorPickerDialog showInput={false} />
        </DialogTrigger>
        <HexColorInput
          id={id}
          autoComplete="off"
          role="textbox"
          autoCorrect="off"
          spellCheck="false"
          required
          prefixed
          className={style.input}
          color={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

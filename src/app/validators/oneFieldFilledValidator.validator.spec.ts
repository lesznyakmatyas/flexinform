import { FormGroup, FormControl } from '@angular/forms';
import { oneFieldFilledValidator } from './oneFieldFilledValidator.validator';

describe('oneFieldFilledValidator', () => {
  it('should return null if only the first field is filled', () => {
    const form = new FormGroup(
      {
        field1: new FormControl('value'),
        field2: new FormControl(null),
      },
      { validators: oneFieldFilledValidator('field1', 'field2') }
    );

    expect(form.errors).toBeNull();
  });

  it('should return null if only the second field is filled', () => {
    const form = new FormGroup(
      {
        field1: new FormControl(null),
        field2: new FormControl('value'),
      },
      { validators: oneFieldFilledValidator('field1', 'field2') }
    );

    expect(form.errors).toBeNull();
  });

  it('should return { bothFieldsFilled: true } if both fields are filled', () => {
    const form = new FormGroup(
      {
        field1: new FormControl('value1'),
        field2: new FormControl('value2'),
      },
      { validators: oneFieldFilledValidator('field1', 'field2') }
    );

    expect(form.errors).toEqual({ bothFieldsFilled: true });
  });

  it('should return { noneFieldsFilled: true } if both fields are empty', () => {
    const form = new FormGroup(
      {
        field1: new FormControl(null),
        field2: new FormControl(null),
      },
      { validators: oneFieldFilledValidator('field1', 'field2') }
    );

    expect(form.errors).toEqual({ noneFieldsFilled: true });
  });
});

import secureFilesSvg from '@common/auth/ui/account-settings/access-token-panel/secure-files.svg';
import {useTrans} from '@common/i18n/use-trans';
import {Button} from '@common/ui/buttons/button';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {SvgImage} from '@common/ui/images/svg-image/svg-image';
import {Trans} from '@common/i18n/trans';
import {
  CheckLinkPasswordPayload,
  useCheckLinkPassword,
} from '@app/short-links/requests/use-check-link-password';
import {Link} from '@app/dashboard/links/link';
import {LinkGroup} from '@app/dashboard/link-groups/link-group';
import {Biolink} from '@app/dashboard/biolink/biolink';
import {useForm} from 'react-hook-form';
import {Form} from '@common/ui/forms/form';

interface PasswordPageProps {
  linkeable: Link | LinkGroup | Biolink;
  onPasswordValid: () => void;
}
export function PasswordPage({linkeable, onPasswordValid}: PasswordPageProps) {
  const {trans} = useTrans();
  const fieldLabel = trans({message: 'Password'});
  const form = useForm<CheckLinkPasswordPayload>();
  const checkPassword = useCheckLinkPassword(linkeable, form);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-alt">
      <div className="m-14 flex max-w-[560px] flex-col items-center gap-40 rounded border bg p-24 md:flex-row md:gap-14">
        <div className="h-132 w-[165px]">
          <SvgImage src={secureFilesSvg} />
        </div>
        <Form
          form={form}
          onSubmit={values => {
            checkPassword.mutate(values, {onSuccess: onPasswordValid});
          }}
        >
          <span className="text-sm">
            {linkeable.model_type === 'biolink' ? (
              <Trans message="The biolink you are trying to access is password protected." />
            ) : (
              <Trans message="The link you are trying to access is password protected." />
            )}
          </span>
          <FormTextField
            name="password"
            autoFocus
            placeholder={fieldLabel}
            aria-label={fieldLabel}
            className="mb-20 mt-10"
            type="password"
            required
          />
          <div className="text-right">
            <Button
              variant="flat"
              color="primary"
              type="submit"
              className="w-full md:w-auto"
              disabled={checkPassword.isPending}
            >
              <Trans message="Enter" />
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

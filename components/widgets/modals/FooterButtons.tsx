import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction } from 'react';
import IconLoading from '~icons/line-md/loading-twotone-loop';

export default function FooterButton({
  setIsPreview,
  isPreview,
  isFetching,
  formId
}: {
  setIsPreview: Dispatch<SetStateAction<boolean>>;
  isPreview: boolean;
  isFetching: boolean;
  formId: string;
}) {
  return (
    <>
      <Button
        variant={'outline'}
        onClick={() => setIsPreview(!isPreview)}
        className="<sm:flex-1 sm:hidden"
        type="button"
      >
        {isPreview && '關閉'}預覽
      </Button>
      {!isPreview && (
        <Button className="<sm:flex-1" disabled={isFetching} form={formId} type="submit">
          {isFetching ? (
            <>
              <IconLoading className="mr-3 h-4 w-4" />
              請稍候
            </>
          ) : (
            '儲存'
          )}
        </Button>
      )}
    </>
  );
}

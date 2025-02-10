import React, {Fragment, Suspense} from 'react';
import {PageMetaTags} from '@common/http/page-meta-tags';
import {PageStatus} from '@common/http/page-status';
import {CustomPage} from '@common/admin/custom-pages/custom-page';
import {FormProvider, useForm} from 'react-hook-form';
import {FileUploadProvider} from '@common/uploads/uploader/file-upload-provider';
import {ArticleEditorTitle} from '@common/article-editor/article-editor-title';
import {ArticleEditorStickyHeader} from '@common/article-editor/article-editor-sticky-header';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {CreateCustomPagePayload} from '@common/admin/custom-pages/requests/use-create-custom-page';
import {FullPageLoader} from '@common/ui/progress/full-page-loader';
import {useLinkPage} from '@app/dashboard/link-pages/requests/use-link-page';
import {useUpdateLinkPage} from '@app/dashboard/link-pages/requests/use-update-link-page';

const ArticleBodyEditor = React.lazy(
  () => import('@common/article-editor/article-body-editor'),
);

export function EditLinkPage() {
  const query = useLinkPage();

  return query.data ? (
    <Fragment>
      <PageMetaTags query={query} />
      <PageContent page={query.data.page} />
    </Fragment>
  ) : (
    <div className="relative w-full h-full">
      <PageStatus query={query} />
    </div>
  );
}

interface PageContentProps {
  page: CustomPage;
}
function PageContent({page}: PageContentProps) {
  const navigate = useNavigate();
  const updatePage = useUpdateLinkPage();
  const form = useForm<CreateCustomPagePayload>({
    defaultValues: {
      title: page.title,
      slug: page.slug,
      body: page.body,
    },
  });

  const handleSave = (editorContent: string) => {
    updatePage.mutate(
      {
        ...form.getValues(),
        body: editorContent,
      },
      {
        onSuccess: () => navigate('../..', {relative: 'path'}),
      },
    );
  };

  return (
    <Suspense fallback={<FullPageLoader />}>
      <ArticleBodyEditor initialContent={page.body}>
        {(content, editor) => (
          <FileUploadProvider>
            <FormProvider {...form}>
              <ArticleEditorStickyHeader
                editor={editor}
                backLink="../.."
                isLoading={updatePage.isPending}
                onSave={handleSave}
                allowSlugEditing={false}
              />
              <div className="mx-20">
                <div className="prose dark:prose-invert mx-auto flex-auto">
                  <ArticleEditorTitle />
                  {content}
                </div>
              </div>
            </FormProvider>
          </FileUploadProvider>
        )}
      </ArticleBodyEditor>
    </Suspense>
  );
}

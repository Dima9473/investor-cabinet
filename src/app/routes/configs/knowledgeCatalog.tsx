import { KNOWLEDGE_CATALOG } from 'shared/lib/const/routes/shortPaths';
import { KnowledgeCatalog } from 'pages/KnowledgeCatalog/ui/KnowledgeCatalog';

// import { KnowledgeCatalog } from 'pages/KnowledgeCatalog/ui/KnowledgeCatalog';
import { Routes } from '../../model/types/routes';

export const knowledgeCatalogConfig: Routes = {
  path: KNOWLEDGE_CATALOG,
  children: [
    {
      children: [
        {
          //   path: KNOWLEDGE_CATALOG,
          index: true,
          element: <KnowledgeCatalog />,
        },
      ],
    },
  ],
};

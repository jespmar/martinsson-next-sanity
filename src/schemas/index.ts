import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import page from './page'
import post from './post'

export const schemaTypes = [post, blockContent, page]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, blockContent, page],
}
